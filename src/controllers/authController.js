import bcrypt from "bcryptjs";
import {generateToken} from "../middlewares/tokenVerifier.js";
import {createUserFunc, getUserByEmailFunc} from "../models/userModel.js";

export const signup = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    const userExists = await getUserByEmailFunc(email);
    if (userExists) {
      return res.status(400).json({status: 400, message: "User already exists"});
    }
    const newUser = await createUserFunc({name, email, password});
    const token = generateToken(newUser);
    res.status(201).json({
      status: 201,
      message: "User created successfully",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await getUserByEmailFunc(email);
    if (!user) {
      return res.status(400).json({status: 400, message: "Invalid email or password"});
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({status: 401, message: "Invalid email or password"});
    }
    const token = generateToken(user);
    res.status(200).json({
      status: 200,
      message: "User signed in successfully",
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const dashboard = async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: `Welcome to the dashboard, ${req.user.email}`,
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};
