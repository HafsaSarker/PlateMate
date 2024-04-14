import { Request, Response } from "express";
import { PreferenceModel, IUserPreference } from "../models/Preference";

async function getUserPreference(req: Request, res: Response) {
  const { uid } = req.params;

  try {
    // get a user's preference by the uid
    const preference = await PreferenceModel.find({ uid: uid });

    if (!preference) {
      return res.status(404).json({ message: "Preference not found" });
    }

    res.status(200).json(preference);
  } catch (error) {
    res.status(500).json({ message: "Failed to get preference", error });
  }
}

async function createUserPreference(req: Request, res: Response) {
  const preferenceData: IUserPreference = req.body;

  try {
    const newPreference = await PreferenceModel.create(preferenceData);
    res.status(201).json(newPreference);
  } catch (error) {
    res.status(500).json({ message: "Failed to create preference", error });
  }
}

async function updateUserPreference(req: Request, res: Response) {
  const { uid } = req.params;
  const preferenceData: IUserPreference = req.body;

  try {
    const updatedPreference = await PreferenceModel.findOneAndUpdate(
      { uid },
      preferenceData,
      { new: true, runValidators: true }
    );

    if (!updatedPreference) {
      return res.status(404).json({ message: "Preference not found" });
    }

    res.status(200).json(updatedPreference);
  } catch (error) {
    res.status(500).json({ message: "Failed to update preference", error });
  }
}

async function resetUserPreference(req: Request, res: Response) {
  const { uid } = req.params;

  try {
    const userPreference = await PreferenceModel.findOne({
      uid: new Object(uid),
    });

    if (!userPreference) {
      return res.status(404).send("User preference not found.");
    }

    const resetPreferences = await PreferenceModel.findOneAndUpdate(
      { _id: userPreference._id },
      {
        $unset: {
          nationalities: "",
          age_from: "",
          age_to: "",
          drink: "",
          female: "",
          height_from_ft: "",
          height_from_in: "",
          height_to_ft: "",
          height_to_in: "",
          male: "",
          other: "",
          smoke: "",
        },
      },
      { new: true }
    );

    res.status(200).json(resetPreferences);
  } catch (error) {
    res.status(500).json({ message: "Failed to reset preference", error });
  }
}
export const preferenceController = {
  getUserPreference,
  createUserPreference,
  updateUserPreference,
  resetUserPreference,
};
