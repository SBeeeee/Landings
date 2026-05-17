import express from "express";
import { register, login, logout, getMe } from "../controllers/users.controller";
import { verifyUser } from "../middlewares/auth.middleware";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", verifyUser, logout);
router.get("/me", verifyUser, getMe);

export default router;