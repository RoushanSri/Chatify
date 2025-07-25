import asyncHandler from "express-async-handler";
import Auths from "../models/auth.model.js";
import ResponseError from "../types/ResponseError.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const auth = await Auths.findOne({
    email,
  });
  if (!auth) throw new ResponseError("User does not exist", 401);

  const isPasswordValid = await bcrypt.compare(password, auth.password);
  if (!isPasswordValid) throw new ResponseError("Invalid credentials", 401);

  const user = await User.findOne({ auth: auth._id });
  if (!user) throw new ResponseError("User not found", 404);

  const token = jwt.sign(
    { authId: auth._id, userId: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
  });

  res.json({ success: true, message: "Login successful", data: token });
});

export const register = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username)
    throw new ResponseError("All fields are required", 400);

  const existingUser = await Auths.findOne({
    email,
  });

  if (existingUser) throw new ResponseError("User already exists", 409);

  const token = jwt.sign(
    { email, password, username },
    process.env.JWT_SECRET,
    {
      expiresIn: "5m",
    }
  );

  const verificationLink = `https://chatify-cahh.onrender.com/api/v1/auth/verify-email?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify your email",
    html: `<p>Click the link to verify:</p><a href="${verificationLink}">${verificationLink}</a>`,
  });

  res.status(200).json({ success: true, message: "Email sent successful" });
});

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new ResponseError("Token is required", 400);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    throw new ResponseError("Invalid token", 401);
  }
  const { email, password, username } = decoded;

  const newUser = await Auths.create({
    email,
    username,
    password,
  });

  const user = await User.create({
    auth: newUser._id,
    username: newUser.username,
  });

  if (!newUser || !user) {
    throw new ResponseError("User registration failed", 500);
  }

  const redirectUrl = `https://chatify-phi-seven.vercel.app/login`;
  res.redirect(redirectUrl);

  res.json({
    success: true,
    message: "Email verified and User registered successfully",
  });
});

export const logout = asyncHandler(async (req, res)=>{
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
  });
  res.json({ success: true, message: "Logout successful" });
})