import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async ({name, email, phone, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");

  const passwordHash = await bcrypt.hash(password, 12);

  const user = new User({name, email, phone, passwordHash, role });
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return { token, user: { id: user._id,name:user.name, email: user.email, role: user.role } };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  if (!password) {
    throw new Erro("Missing Password")
  }
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return { token, user: {user } };
};


// This service could be expanded to include Token Blacklisting in Redis
export const logoutUser = async (token) => {
  if (!token) {
    throw new Error("No token provided");
  }
  return { message: "Logout successful" };
};

