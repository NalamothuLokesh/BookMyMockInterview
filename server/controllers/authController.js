import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { validateRegister, validateLogin } from "../validations/authValidation.js";
import crypto from "crypto";

// ================= REGISTER =================
export const register = async (req, res, next) => {
  try {
    const { isValid, errors } = validateRegister(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { name, email, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ email: "User already exists" });

    // create user
    const user = await User.create({ name, email, password, role });

    // send response
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken({ id: user._id })
    });

  } catch (error) {
    next(error);
  }
};



// ================= LOGIN =================
export const login = async (req, res, next) => {
  try {
    const { isValid, errors } = validateLogin(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken({ id: user._id })
    });

  } catch (error) {
    next(error);
  }
};



// ================= LOGOUT =================
export const logout = async (req, res) => {
  // JWT logout is handled client-side
  res.json({ message: "Logged out successfully" });
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    // generate token using model method
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // In real app → send email
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    res.json({
      message: "Reset link generated",
      resetUrl
    });

  } catch (error) {
    next(error);
  }
};



// ================= RESET PASSWORD =================
// import crypto from "crypto";

export const resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });

  } catch (error) {
    next(error);
  }
};