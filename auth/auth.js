import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token
  console.log("Token received:", token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token
    req.user = await User.findById(decoded.id).select("-password"); // Attach user to req
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

export default auth;
