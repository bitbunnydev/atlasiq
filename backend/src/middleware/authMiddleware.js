import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // 1. Check if the "Authorization" header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // 2. Get the token from the header (remove "Bearer " string)
      token = req.headers.authorization.split(" ")[1];

      // 3. Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // 4. Find the user in DB and attach to req.user (exclude password)
      // THIS IS THE KEY STEP that makes req.user available in your controller!
      req.user = await User.findById(decoded.id).select("-password");

      next(); // SUCCESS: Move to the actual controller
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
