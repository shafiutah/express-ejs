import bcrypt from "bcryptjs";
import {createUserFunc, getUserByEmailFunc} from "../models/userModel.js";

const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({status, message, data});
};

export const signupUser = async (req, res, next) => {
  const {name, email, password} = req.body;
  try {
    const user = await getUserByEmailFunc(email);
    if (user) {
      return res.render("signup.ejs", {error: "User already exists"});
    }
    const newUser = await createUserFunc(name, email, password);
    // Set flash message and redirect to login
    req.session.successMessage = "User created successfully. Please login.";
    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  const {email, password} = req.body;
  try {
    const user = await getUserByEmailFunc(email);
    if (!user) {
      return res.render("login.ejs", {error: "Invalid email or password"});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.render("login.ejs", {error: "Invalid email or password"});
    }
    // Authenticate success: store user info in session
    req.session.user = {id: user.id, name: user.name, email: user.email};
    req.session.successMessage = "Login successful. Welcome!";
    // Redirect to home on successful login
    res.redirect("/");
  } catch (error) {
    next(error);
  }
};

export function logoutUser(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render("error", {message: "Logout failed"});
    }
    res.redirect("/login");
  });
}

export async function showSignup(req, res) {
  res.render("signup.ejs", {error: null});
}

export function showHome(req, res) {
  if (req.session.user) {
    res.render("home.ejs", {user: req.session.user});
  } else {
    res.render("home.ejs", {user: null});
  }
}

export async function showLogin(req, res) {
  res.render("login.ejs", {error: null});
}
