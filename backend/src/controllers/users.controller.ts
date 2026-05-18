import { registerUser, loginUser, getUserById } from "../services/user.services";
import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { generateToken } from "../utils/token";

export const googleCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    if (!user) {
      return res.redirect("http://localhost:3000/?error=auth_failed");
    }

    const token = generateToken(user._id.toString());

    res.cookie(process.env['COOKIE_NAME'] as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:3000/");
  } catch (err: any) {
    res.redirect("http://localhost:3000/?error=" + encodeURIComponent(err.message));
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { user, token } = await registerUser(req.body);

    // 1️⃣ Set cookie first
    res.cookie(process.env['COOKIE_NAME'] as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });


    // 2️⃣ Send response
    res.status(201).json({ message: "User registered", user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await loginUser(req.body);

    res.cookie(process.env['COOKIE_NAME'] as string, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });


    res.status(200).json({ message: "Login successful", user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const logout = async (_req: Request, res: Response) => {
  res.cookie(process.env['COOKIE_NAME'] as string, "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out" });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserById(req.userId as string);
    res.status(200).json({ user });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};