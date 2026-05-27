import express from "express";
import { register, login, logout, getMe, googleCallback } from "../controllers/users.controller";
import { verifyUser } from "../middlewares/auth.middleware";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: `${process.env['FRONTEND_URL'] || "http://localhost:3000"}/login?error=auth_failed` }),
  googleCallback
);

// Protected routes
router.post("/logout", verifyUser, logout);
router.get("/me", verifyUser, getMe);

export default router;
