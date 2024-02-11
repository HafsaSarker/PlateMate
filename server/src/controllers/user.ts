import { Request, Response } from "express";
import { userAction } from "../utils/userActions";

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userAction.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const userController = {
  getAllUsers,
};
