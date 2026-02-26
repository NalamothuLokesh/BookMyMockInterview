import express from "express";
import { register, login, logout, forgotPassword, resetPassword } from "../controllers/authController.js"; // ← added forgotPassword
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// auth routes
router.post("/register", register);
router.post("/login", login);

// NEW ROUTE (does not affect old ones)
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
// router.post("/dashboard", dashboard);

// protected route
router.post("/logout", protect, logout);

export default router;