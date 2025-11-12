import {getAllUsersFunc, getUserByIdFunc, updateUserFunc, deleteUserFunc} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({status, message, data});
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersFunc();
    res.render("users.ejs", {users, query: req.query});
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdFunc(req.params.id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    handleResponse(res, 200, "User retrieved successfully", user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const {name, email} = req.body;
  try {
    if (!name || !email) {
      req.session.errorMessage = "Name and email are required";
      return res.redirect("/users");
    }
    const user = await updateUserFunc(req.params.id, name, email);
    if (!user) {
      req.session.errorMessage = "User not found";
      return res.redirect("/users");
    }
    // Check if it's a form submission (redirect) or API call (JSON response)
    if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
      req.session.successMessage = "User updated successfully";
      res.redirect("/users");
    } else {
      handleResponse(res, 200, "User updated successfully", user);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUserFunc(req.params.id);
    if (!user) {
      req.session.errorMessage = "User not found";
      return res.redirect("/users");
    }
    // Check if it's a form submission (redirect) or API call (JSON response)
    if (req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
      req.session.successMessage = "User deleted successfully";
      res.redirect("/users");
    } else {
      handleResponse(res, 200, "User deleted successfully", user);
    }
  } catch (error) {
    next(error);
  }
};
