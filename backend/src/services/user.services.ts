import bcrypt from "bcrypt";
import User from "../models/User.models";
import {generateToken} from "../utils/token"



interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface LoginInput {
  username: string;
  password: string;
}



/* =========================
   REGISTER
========================= */

export const registerUser = async ({
  username,
  email,
  password,
}: RegisterInput) => {
  // 1️⃣ Check existing username
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new Error("Username already taken");
  }

  // 2️⃣ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3️⃣ Create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    
  });

  // 4️⃣ Generate token
  const token = generateToken(user._id.toString());

  // 5️⃣ Convert to object (password already hidden)
  const safeUser = user.toObject();
  delete (safeUser as any).password;

  return {
    user: safeUser,
    token,
  };
};



export const loginUser = async ({
  username,
  password,
}: LoginInput) => {
  // 1️⃣ Fetch user INCLUDING password
  const user = await User.findOne({ username }).select("+password");

  if (!user) {
    throw new Error("Invalid username or password");
  }

  // If user has no password, they probably signed up with Google
  if (!user.password) {
    throw new Error("This account is linked to Google. Please sign in with Google.");
  }

  // 2️⃣ Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid username or password");
  }

  // 3️⃣ Generate token
  const token = generateToken(user._id.toString());

  // 4️⃣ Remove password manually
  const safeUser = user.toObject();
  delete (safeUser as any).password;

  return {
    user: safeUser,
    token,
  };
};


export const getUserById = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};