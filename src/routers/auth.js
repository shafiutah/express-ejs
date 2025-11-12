import express from "express";
import {showSignup, signupUser, showLogin, loginUser, logoutUser, showHome} from "../controllers/authController.js";
import validateUser from "../middlewares/inputValidate.js";

const router = express.Router();

router.get("/", showHome);
router.get("/signup", showSignup);
router.post("/signup", validateUser, signupUser);
router.get("/login", showLogin);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
