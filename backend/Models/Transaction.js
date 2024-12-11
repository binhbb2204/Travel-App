import mongoose from "mongoose";

// Define the Booking Schema
const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    experienceName: {
      type: String,
      required: true
    },
    type: {
        type: String,
        enum: ["Tour", "Accommodation"],
        required: true
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    cardNumber: {
      type: String,
      required: true
    },
    date: {
        type: Date,
        required: true,
      },
  },
  { timestamps: true }
);

// Export the model
export default mongoose.model("Transaction", transactionSchema);
