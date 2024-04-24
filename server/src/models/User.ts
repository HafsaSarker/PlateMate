import { Schema, Document, model } from "mongoose";

interface IUserProfile {
  firstName: string;
  lastName: string;
  profileImg?: string;
  coverImg?: string;
  about?: string;
  nationality?: string;
  sex?: string;
  height_ft?: number;
  height_in?: number;
  age?: number;
  smoke?: boolean;
  drink?: boolean;
  restaurantLocation: string;
  foodCategories: string[];
  restaurantAttributes?: string[];
  pricePoint?: string[];
}

interface IUserAuthentication {
  password: string;
  salt?: string;
  sessionToken?: string;
}

export interface IUser extends Document {
  email: string;
  authentication: IUserAuthentication;
  profile: IUserProfile;
}

const UserSchema = new Schema<IUser>(
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
      height_ft: Number,
      height_in: Number,
      age: {
        type: Number,
        min: 18,
      },
      smoke: Boolean,
      drink: Boolean,
      restaurantLocation: {
        type: String,
        required: true,
      },
      foodCategories: {
        type: [String],
        required: true,
      },
      restaurantAttributes: [String], // ["wifi_free", "parking_lot"]
      pricePoint: [String], // [1, 2, 3] == price point $,$$,$$$
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("User", UserSchema);
