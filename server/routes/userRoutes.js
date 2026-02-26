import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  getMyBookings,
  getAllUsers
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/* ===============================
   USER ROUTES
=================================*/

// Get logged in user's profile
router.get("/me", protect, getMyProfile);

// Update profile
router.put("/me", protect, updateMyProfile);

// Get logged in user's bookings
router.get("/my-bookings", protect, getMyBookings);

// Admin route - get all users
router.get("/", protect, authorize(["admin"]), getAllUsers);

export default router;