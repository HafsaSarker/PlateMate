import { UserModel, IUser } from "models/User";

async function getUsers(): Promise<IUser[] | null> {
  return UserModel.find();
}

async function getUserByEmail(email: string): Promise<IUser | null> {
  return UserModel.findOne({ email });
}

async function getUserBySessionToken(
  sessionToken: string
): Promise<IUser | null> {
  return UserModel.findOne({ "authentication.sessionToken": sessionToken });
}

async function getUserById(id: string): Promise<IUser | null> {
  return UserModel.findOne({ id });
}

async function createUser(values: Record<string, any>): Promise<IUser> {
  const user = new UserModel(values);
  const savedUser: IUser = await user.save();
  return savedUser.toObject();
}

async function deleteUserById(id: string): Promise<IUser | null> {
  return UserModel.findOneAndDelete({ _id: id });
}

async function updateUserById(
  id: string,
  values: Record<string, any>
): Promise<IUser | null> {
  // option "new" returns the updated doc
  return UserModel.findByIdAndUpdate(id, values, { new: true });
}

export const userAction = {
  getUsers,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
