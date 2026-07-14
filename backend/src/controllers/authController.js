import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import {
  generateAccessToken,
  generateRefreshToken,
} from "../config/generateToken.js";

export const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await User.findOne({ email: normalizedEmail });
    const usernameExists = await User.findOne({
      username,
    });

    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email: normalizedEmail,
      passwordHash,
    });

    const savedUser = await newUser.save();
    const accessToken = generateAccessToken(savedUser._id);
    const refreshToken = generateRefreshToken(savedUser._id);
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials,User Doesnt exist" });
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials,Password is incorrect" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const refreshAccessToken = async(req,res)=>{
  try{
    const refresh  = req.body.refreshToken

    if(!refresh)return res.status(401).json({message:"Invalid Refresh Token"})
    const decoded = jwt.verify(refresh,process.env.JWT_REFRESH_SECRET)
  
    const newAccessToken = generateAccessToken(decoded.userId)
    res.status(200).json({
      newAccessToken
    })
  }catch(err){
    console.error(err);
    return res.status(401).json({
      message: "Invalid or expired refresh token",
    });
  }
 
  
}