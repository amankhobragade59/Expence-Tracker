import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

export const verifyToken = (req, res, next) => {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(200).json({user:null, message: "No token, authorization denied" });
    }

    // 2️⃣ Verify token
    const decoded = jwt.verify(token, process.env.SECRET);
    // 3️⃣ Attach user info to request
    req.user = decoded;

    // 4️⃣ Continue to next middleware or route
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
