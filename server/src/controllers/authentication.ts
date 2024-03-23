import { Request, Response } from "express";
import { userAction } from "../utils/UserActions";
import { hashPassword, random } from "../utils/authentication";

async function register(
  req: Request,
  res: Response
): Promise<Response<any, Record<string, any>>> {
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
      height_ft,
      height_in,
      age,
      smoke,
      drink,
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
    const registerUser = await userAction.createUser({
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
        height_ft,
        height_in,
        age,
        smoke,
        drink,
        restaurantAttributes,
        pricePoint,
      },
    });

    // get user object without auth field
    const user = await userAction.getUserById(registerUser._id);

    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await userAction.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    //check if password is valid
    const expectedHash = hashPassword(user.authentication.salt, password);

    // compare hashed passwords
    if (user.authentication.password != expectedHash) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate and set session token
    const salt = random();
    user.authentication.sessionToken = hashPassword(salt, user._id.toString());
    await user.save();

    // 15 days in milliseconds
    const expirationDuration = 15 * 24 * 60 * 60 * 1000;

    // create session cookie
    res.cookie("AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      maxAge: expirationDuration,
    });

    // get user object without auth field
    const returnUser = await userAction.getUserById(user._id);

    return res.status(201).json(returnUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function logout(req: Request, res: Response) {
  try {
    // Clear 'AUTH' cookie
    res.clearCookie("AUTH", {
      domain: "localhost",
      path: "/",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const authController = {
  register,
  login,
  logout,
};
