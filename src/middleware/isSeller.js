// src/middleware/isSeller.js
import jwt from "jsonwebtoken";
import { db } from "../models";

const User = db.User;

const isSeller = async (req, res, next) => {
    const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);

    if (!user || user.role !== "seller") {
      return res.status(403).json({ message: "Forbidden: User is not a seller" });
    }

    req.user = user; // Attach the user object to the request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default isSeller;
