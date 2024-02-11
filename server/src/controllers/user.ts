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

async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const deletedUser = await userAction.deleteUserById(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "user does not exist" });
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const userController = {
  getAllUsers,
  deleteUser,
};
