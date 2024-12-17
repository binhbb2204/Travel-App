import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'], // Gender options matching the frontend
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please provide a valid email address"], // Regex for email validation
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10}$/, 'Invalid phone number'], // Regex for 10-digit phone numbers
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    photo: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// userSchema.pre("save", async function(next) {
//   if (!this.isModified("password")) return next();

//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     return next(error);
//   }
// });

// // Method to check password validity
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// Static method to check if email exists
// userSchema.statics.isEmailTaken = async function(email) {
//   const user = await this.findOne({ email });
//   return !!user;
// };

export default mongoose.model("User", userSchema);