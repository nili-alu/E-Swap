// src/middleware/isBuyer.js
import jwt from "jsonwebtoken";
import { db } from "../models";

const User = db.User;

const isBuyer = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || user.role !== "buyer") {
      return res
        .status(403)
        .json({ message: "Forbidden: User is not a buyer" });
    }

    req.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isBuyer;
