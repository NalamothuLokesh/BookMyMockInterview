import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview",
      required: true,
      index: true
    },

    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    scheduledAt: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending"
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending"
    },

    meetingLink: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      maxlength: 500
    }
  },
  { timestamps: true }
);

// prevent interviewer double booking
bookingSchema.index({ interviewer: 1, scheduledAt: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);