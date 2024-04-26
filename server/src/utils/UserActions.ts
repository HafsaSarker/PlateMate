import { UserModel, IUser } from "../models/User";

async function getUsers(): Promise<IUser[] | null> {
  return UserModel.find();
}

async function getUserByEmail(email: string): Promise<IUser | null> {
  return UserModel.findOne({ email }).select(
    "+authentication.salt +authentication.password"
  );
}

async function getUserBySessionToken(
  sessionToken: string
): Promise<IUser | null> {
  return UserModel.findOne({ "authentication.sessionToken": sessionToken });
}

async function getUserById(id: string): Promise<IUser | null> {
  return UserModel.findById(id);
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
  return UserModel.findByIdAndUpdate(
    id,
    { $set: values },
    {
      new: true,
      runValidators: true,
    }
  );
}

// returns users with similar foodCategories, restuarantAttributes and pricePoint
async function findMatches(user: IUser): Promise<IUser[] | null> {
  try {
    const { foodCategories, restaurantAttributes, pricePoint } = user.profile;

    const matches = await UserModel.find({
      _id: { $ne: user._id }, // Exclude curr user's id
      "profile.foodCategories": { $in: foodCategories },
      "profile.restaurantAttributes": { $in: restaurantAttributes },
      "profile.pricePoint": { $in: pricePoint },
    });

    return matches;
  } catch (error) {
    console.error("Error finding matches:", error);
    return null;
  }
}
export const userAction = {
  getUsers,
  getUserByEmail,
  getUserBySessionToken,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  findMatches,
};
