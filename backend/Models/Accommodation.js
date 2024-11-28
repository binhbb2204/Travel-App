import mongoose from "mongoose";

// Define the Tour Schema
const accommodationSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true,
  },
  totalCapacity: {
    type: Number,
    required: true,
    min: 1,
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
  desc: {
    type: String,
    required: true,
    trim: true,
  },
  highlights: [
    {
      type: String,
      required: true,
    },
  ],
}, { timestamps: true });

// Export the model
export default mongoose.model("Accommodation", accommodationSchema);
