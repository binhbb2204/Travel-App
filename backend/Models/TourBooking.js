import mongoose from "mongoose";

// Define the Booking Schema
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      // type: String,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tour',
      required: true
    },
    tourName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      match: [
        /^\d{10}$/,
        "Please provide a valid phone number", // E.164 international format validation
      ],
    },
    date: {
      type: Date,
      required: true,
    },
    adults: {
      type: Number,
      required: true,
      min: 1,
    },
    children: {
      type: Number,
      required: true,
      min: 0,
    },
    specialRequest: {
      type: String,
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    serviceCharge: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model("Tour_Booking", bookingSchema);
