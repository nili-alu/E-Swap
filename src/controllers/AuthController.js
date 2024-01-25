// src/controllers/AuthController.js
import bcrypt from "bcrypt";
import { db } from "../models";
import generateToken from "../utils/token";

const User = db.User;
// Sign-up method
export const signUp = async (req, res) => {
  const { name, email, phone, password, role } = req.body;
  try {
    // Hash the password before storing it in the database

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    // Create a new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    // Return the user details (or token) in the response
    return res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Login method
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const storedHashedPasswordTrimmed = user.password.trim();
    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      storedHashedPasswordTrimmed
    );

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    // Return the user details (or token) in the response
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
