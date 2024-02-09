import mongoose from "mongoose";

export const connectDB = (url: string) => {
  mongoose.Promise = Promise;
  return mongoose
    .connect(url)
    .then(() => console.log("Connected to DB"))
    .catch(console.error);
};
