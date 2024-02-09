import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(process.env.SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");
