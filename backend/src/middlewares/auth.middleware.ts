import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export interface AuthRequest extends Request {
  userId?: string;
}


export const verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.[process.env['COOKIE_NAME'] as string];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (!process.env['JWT_SECRET']) throw new Error("JWT_SECRET not configured");

    const decoded = jwt.verify(token, process.env['JWT_SECRET']) as { id: string };

    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};