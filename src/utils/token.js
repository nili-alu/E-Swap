// src/utils/token.js
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
  const secretKey = process.env.JWT_SECRET;

  // Create a token with user data
  const token = jwt.sign(
    {
      userId: user.id,
          email: user.email,
          role: user.role,
        
    },
    secretKey,
    {
      expiresIn: "1h", // token expires in 1 hour
    }
  );

  return token;
};

export default generateToken;
