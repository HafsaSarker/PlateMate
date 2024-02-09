import { Request, Response } from "express";
import { userAction } from "./../utils/userActions";
import { hashPassword, random } from "../utils/authentication";

async function register(req: Request, res: Response) {
  try {
    const { email, authentication, profile } = req.body;
    const {
      firstName,
      lastName,
      restaurantLocation,
      foodCategory,
      profileImg,
      coverImg,
      about,
      nationality,
      sex,
      height,
      age,
      lifeStyle,
      restaurantAttributes,
      pricePoint,
    } = profile;

    const { password } = authentication;
    // validate
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !restaurantLocation ||
      !foodCategory
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    //check if user exists
    const userExists = await userAction.getUserByEmail(email);

    if (userExists) {
      return res
        .status(409)
        .json({ error: "User with this email already exists" });
    }

    // create user
    const salt = random();
    const user = await userAction.createUser({
      email,
      authentication: {
        salt,
        password: hashPassword(salt, password),
      },
      profile: {
        firstName,
        lastName,
        restaurantLocation,
        foodCategory,
        profileImg,
        coverImg,
        about,
        nationality,
        sex,
        height,
        age,
        lifeStyle,
        restaurantAttributes,
        pricePoint,
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export const authController = {
  register,
};
