import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      profileImg: String,
      coverImg: String,
      about: String,
      nationality: String,
      sex: String,
      height: String, // "5 ft 10 in"
      age: {
        type: Number,
        min: 18,
      },
      lifeStyle: [String], // ["Smoke", "Drink"]
      location: String,
      foodCategory: String,
      restaurantAttributes: [String], // ["wifi_free", "parking_lot"]
      pricePoint: [Number], // [1, 2, 3] == price point $,$$,$$$
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", UserSchema);
