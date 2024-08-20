import express from "express";

import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password, isFarmer } = req.body;
  const userExists = await User.findOne({ email });
  try {
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ name, email, password, isFarmer });
    if (user) {
      const savedUser = await user.save();
      return res
        .status(201)
        .json({ message: "User created successfully", savedUser });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.matchPasswords(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isFarmer: user.isFarmer,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const {_id} = req.body
    console.log(_id);
    
    const user = await User.findById(_id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
