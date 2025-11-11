import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({status: 401, message: "Access Denied. No token provided."});
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({status: 401, message: "Invalid token."});
  }
};

export const generateToken = (user) => {
  return jwt.sign({id: user.id, email: user.email, role: user.role}, JWT_SECRET, {expiresIn: "1h"});
};
