import Interview from "../models/Interview.js";
import Booking from "../models/Booking.js";

/* ===================================================
   GET ALL INTERVIEWS (Public)
=================================================== */
export const getInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find()
      .populate("interviewer", "name email")
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    next(error);
  }
};

/* ===================================================
   GET INTERVIEW BY ID
=================================================== */
export const getInterviewById = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id)
      .populate("interviewer", "name email avatar role");

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    res.json(interview);
  } catch (error) {
    next(error);
  }
};


/* ===================================================
   CREATE INTERVIEW (Interviewer Only)
=================================================== */
export const createInterview = async (req, res, next) => {
  try {
    const { title, description, duration, price } = req.body;

    const interview = await Interview.create({
      title,
      description,
      duration,
      price,
      interviewer: req.user.id
    });

    res.status(201).json(interview);
  } catch (error) {
    next(error);
  }
};

/* ===================================================
   DELETE INTERVIEW (Owner Only)
=================================================== */
export const deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    if (interview.interviewer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Booking.deleteMany({ interview: interview._id });
    await interview.deleteOne();

    res.json({ message: "Interview deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/* ===================================================
   BOOK INTERVIEW
=================================================== */
export const bookInterview = async (req, res, next) => {
  try {
    const { interviewId, scheduledAt } = req.body;

    const interview = await Interview.findById(interviewId);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // Prevent self booking
    if (interview.interviewer.toString() === req.user.id) {
      return res.status(400).json({
        message: "You cannot book your own interview"
      });
    }

    // 🔥 Prevent booking if slot already CONFIRMED
    const confirmedSlot = await Booking.findOne({
      interview: interviewId,
      scheduledAt,
      status: "confirmed"
    });

    if (confirmedSlot) {
      return res.status(400).json({
        message: "This time slot is already confirmed"
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      interview: interviewId,
      interviewer: interview.interviewer,
      scheduledAt,
      status: "pending"
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

/* ===================================================
   CANCEL BOOKING (Interviewee Only)
=================================================== */
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });
  } catch (error) {
    next(error);
  }
};

/* ===================================================
   GET MY INTERVIEWS (With bookings)
=================================================== */
export const getMyInterviews = async (req, res, next) => {
  try {
    const interviews = await Interview.find({
      interviewer: req.user.id
    });

    const result = await Promise.all(
      interviews.map(async (interview) => {
        const bookings = await Booking.find({
          interview: interview._id
        }).populate("user", "name email");

        return { ...interview.toObject(), bookings };
      })
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

/* ===================================================
   UPDATE BOOKING STATUS (Confirm / Reject)
=================================================== */
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id)
      .populate("interview");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.interview.interviewer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    next(error);
  }
};