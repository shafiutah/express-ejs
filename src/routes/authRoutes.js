import express from "express";
import {signup, signin, dashboard} from "../controllers/authController.js";
import {verifyToken} from "../middlewares/tokenVerifier.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/dashboard", verifyToken, dashboard);

export default router;
