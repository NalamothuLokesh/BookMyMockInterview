import express from "express";
import {
  getMyBookings,
  cancelBooking,
  rescheduleBooking,
  getInterviewerBookings
} from "../controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/my", protect, getMyBookings);
router.get("/interviewer", protect, getInterviewerBookings);

router.put("/:id/cancel", protect, cancelBooking);
router.put("/:id/reschedule", protect, rescheduleBooking);

export default router;