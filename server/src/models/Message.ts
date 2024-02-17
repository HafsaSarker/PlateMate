import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
      // fromUserId: mongoose.Types.ObjectId,
      // toUserId: mongoose.Types.ObjectId,
      fromUserId: String,
      toUserId: String,
      message: String,
      sentAt: String,
    }
);

export const Message = mongoose.model("Message", messageSchema);