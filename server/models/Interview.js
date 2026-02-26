import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    description: {
      type: String,
      maxlength: 1000
    },

    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    duration: {
      type: Number,
      required: true,
      enum: [30, 45, 60, 90]
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    domain: {
      type: String,
      enum: [
        "DSA",
        "Frontend",
        "Backend",
        "Fullstack",
        "System Design",
        "HR",
        "DevOps",
        "Cyber Security"
      ],
      default: "DSA"
    },

    availableSlots: [
      {
        type: Date
      }
    ],

    ratingAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    totalReviews: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Interview", interviewSchema);