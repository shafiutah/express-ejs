import {createUserFunc, deleteUserFunc, getAllUsersFunc, getUserByEmailFunc, getUserByIdFunc, updateUserFunc} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({status, message, data});
};

export const createUser = async (req, res, next) => {
  const {name, email, password} = req.body;
  try {
    const user = await createUserFunc(name, email, password);
    return handleResponse(res, 201, "User created successfully", user);
  } catch (error) {
    next(error);
    return handleResponse(res, 500, "Internal Server Error");
  }
};

export const updateUser = async (req, res, next) => {
  const {name, email} = req.body;
  try {
    const user = await updateUserFunc(req.params.id, name, email);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    return handleResponse(res, 200, "User updated successfully", user);
  } catch (error) {
    next(error);
    return handleResponse(res, 500, "Internal Server Error");
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUserFunc(req.params.id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    return handleResponse(res, 200, "User deleted successfully", user);
  } catch (error) {
    next(error);
    return handleResponse(res, 500, "Internal Server Error");
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersFunc();
    return handleResponse(res, 200, "Users retrieved successfully", users);
  } catch (error) {
    next(error);
    return handleResponse(res, 500, "Internal Server Error");
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdFunc(req.params.id);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    return handleResponse(res, 200, "User retrieved successfully", user);
  } catch (error) {
    next(error);
    return handleResponse(res, 500, "Internal Server Error");
  }
};
export const getUserByEmail = async (req, res, next) => {
  try {
    const user = await getUserByEmailFunc(req.params.email);
    if (!user) {
      return handleResponse(res, 404, "User not found");
    }
    return handleResponse(res, 200, "User retrieved successfully", user);
  } catch (error) {
    next(error);
    return handleResponse(res, 500, "Internal Server Error");
  }
};
