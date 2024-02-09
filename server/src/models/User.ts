import { Schema, Document, model } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
interface UserProfile {
  firstName: string;
  lastName: string;
  profileImg?: string;
  coverImg?: string;
  about?: string;
  nationality?: string;
  sex?: string;
  height?: string;
  age?: number;
  lifeStyle?: string[];
  restaurantLocation: string;
  foodCategory: string;
  restaurantAttributes?: string[];
  pricePoint?: number[];
}

interface UserAuthentication {
  password: string;
  salt?: string;
  sessionToken?: string;
}

interface User extends Document {
  email: string;
  authentication: UserAuthentication;
  profile: UserProfile;
}

const UserSchema = new Schema<User>(
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
      restaurantLocation: {
        type: String,
        required: true,
      },
      foodCategory: {
        type: String,
        required: true,
      },
      restaurantAttributes: [String], // ["wifi_free", "parking_lot"]
      pricePoint: [Number], // [1, 2, 3] == price point $,$$,$$$
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<User>("User", UserSchema);
