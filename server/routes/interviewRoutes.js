import express from "express";
import {
  getInterviews,
  createInterview,
  deleteInterview,
  bookInterview,
  cancelBooking,
  getMyInterviews,
  updateBookingStatus,
  getInterviewById
} from "../controllers/interviewController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public
router.get("/", getInterviews);

// Interviewer
router.post("/", protect, authorize(["interviewer"]), createInterview);
router.delete("/:id", protect, authorize(["interviewer"]), deleteInterview);
router.get("/my-interviews", protect, authorize(["interviewer"]), getMyInterviews);
router.put("/booking/:id", protect, authorize(["interviewer"]), updateBookingStatus);

// Interviewee
router.get("/:id", protect, getInterviewById);
router.post("/book", protect, authorize(["interviewee"]), bookInterview);
router.put("/cancel/:id", protect, authorize(["interviewee"]), cancelBooking);

export default router;