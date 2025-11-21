import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("Signup Successfull");
  } catch (error) {
    next(error);
  }
};

export const continueWithGoogle = async (req, res, next) => {
  const { googleUserName, email, imageUrl, uid } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not exists
      const hashedPassword = await bcryptjs.hash(uid, 10);
      user = new User({
        username:
          googleUserName.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePic: imageUrl,
      });
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const { password, ...rest } = user._doc;

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ works in prod
        sameSite: "Strict", // or "None" if cross-site
      })
      .status(200)
      .json({
        message: "Login successful",
        user: rest, // ✅ always return same structure
      });

  } catch (error) {
    next(error);
  }
};
