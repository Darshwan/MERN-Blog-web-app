import dotenv from "dotenv";
import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
import { errorHandler } from "../utils/error.js";

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password || username === "" || password === "") {
    next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      next(errorHandler(404, "User Not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password"));
    }

    const token = jwt.sign({ id: validUser._id, isAdmin: validUser.isAdmin }, process.env.JWT_SECRET, {
      expiresIn: "24h", // Token expires in 24 hour
    });
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({
        success: true,
        message: "Login successful",
        token: token,
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};
