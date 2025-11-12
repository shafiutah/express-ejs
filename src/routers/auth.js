import express from "express";
import {showSignup, signupUser, showLogin, loginUser, logoutUser, showHome} from "../controllers/authController.js";
import inputValidator from "../middlewares/inputValidator.js";

const router = express.Router();

router.get("/", showHome);
router.get("/signup", showSignup);
router.post("/signup", inputValidator, signupUser);
router.get("/login", showLogin);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
