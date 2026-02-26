import Booking from "../models/Booking.js";
import Interview from "../models/Interview.js";


// ================= MY BOOKINGS =================
export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("interview")
      .populate("interviewer", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};



// ================= CANCEL =================
export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled" });

  } catch (error) {
    next(error);
  }
};



// ================= RESCHEDULE =================
export const rescheduleBooking = async (req, res, next) => {
  try {
    const { newSlot } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    const interview = await Interview.findById(booking.interview);

    // check slot exists
    const valid = interview.availableSlots.some(
      s => new Date(s).toISOString() === new Date(newSlot).toISOString()
    );

    if (!valid)
      return res.status(400).json({ message: "Invalid slot" });

    booking.scheduledAt = newSlot;
    await booking.save();

    res.json(booking);

  } catch (error) {
    next(error);
  }
};



// ================= INTERVIEWER BOOKINGS =================
export const getInterviewerBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      interviewer: req.user._id
    })
      .populate("user", "name email")
      .populate("interview", "title duration")
      .sort({ scheduledAt: 1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};