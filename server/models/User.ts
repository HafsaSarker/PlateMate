import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
    },
    authentication: {
        password: {
            type: String,
            required: true,
            select: false,
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false,
        },
    },
    profile: {
        firstName: String,
        lastName: String,
        age: String,
        gender: String,
        location: String,
        foodPreferences: Array,
        dislikedFoods: Array,
        interests: Array,
        profilePicture: String,
        pricePreference: String, // "$", "$$", or "$$$"
    }
        
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);