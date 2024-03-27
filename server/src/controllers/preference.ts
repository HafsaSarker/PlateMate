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

export const preferenceController = {
  getUserPreference,
  createUserPreference,
  updateUserPreference,
};
