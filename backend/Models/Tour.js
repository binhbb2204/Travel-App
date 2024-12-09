import mongoose from "mongoose";

// Define the Tour Schema
const tourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  photos: [
    {
      type: String, // Array of image URLs or paths
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true, // Duration in days
  },
  maxGroupSize: {
    type: Number,
    required: true,
    min: 1,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  ],
  highlights: [
    {
      type: String,
      required: true,
    },
  ],
}, { timestamps: true });

// Export the model
export default mongoose.model("Tour", tourSchema);
