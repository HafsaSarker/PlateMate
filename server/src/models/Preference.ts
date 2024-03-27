import mongoose, { Schema, Document, model } from "mongoose";

export interface IUserPreference extends Document {
  uid: string;
  nationalities?: string[];
  male?: boolean;
  female?: boolean;
  other?: boolean;
  age_from?: number;
  age_to?: number;
  height_from_ft?: number;
  height_from_in?: number;
  height_to_ft?: number;
  height_to_in?: number;
  smoke?: boolean;
  drink?: boolean;
}

const PreferenceSchema = new Schema<IUserPreference>(
  {
    uid: mongoose.Types.ObjectId,
    nationalities: [String],
    male: Boolean,
    female: Boolean,
    other: Boolean,
    age_from: Number,
    age_to: Number,
    height_from_ft: Number,
    height_from_in: Number,
    height_to_ft: Number,
    height_to_in: Number,
    smoke: Boolean,
    drink: Boolean,
  },
  {
    timestamps: true,
  }
);

export const PreferenceModel = model<IUserPreference>(
  "Preference",
  PreferenceSchema
);
