import { Request, Response } from "express";
import { userAction } from "../utils/UserActions";

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userAction.getUsers();

    return res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await userAction.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "user does not exist" });
    }

    return res.status(200).json(user);
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

async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const updatedUser = await userAction.updateUserById(id, req.body);

    if (!updatedUser) {
      return res.status(404).json({ error: "user does not exist" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getUserMatches(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const user = await userAction.getUserById(id);

    if (!user) {
      return res.status(404).json({ error: "user does not exist" });
    }

    const matches = await userAction.findMatches(user);

    return res.status(200).json(matches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const userController = {
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserMatches,
};
