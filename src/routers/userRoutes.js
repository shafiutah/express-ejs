import express from "express";
import {getAllUsers, getUserById, updateUser, deleteUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/:id/update", updateUser);
router.post("/:id/delete", deleteUser);
// Keep REST API endpoints for programmatic access
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
