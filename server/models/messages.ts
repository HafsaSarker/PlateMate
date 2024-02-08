import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
    {
      _id: mongoose.Types.ObjectId,
      matchId: mongoose.Types.ObjectId, // Reference to the Matches collection
      fromUserId: mongoose.Types.ObjectId,
      toUserId: mongoose.Types.ObjectId,
      message: String,
      sentAt: Date,
      readAt: Date,
    }
);

export const MessagesModel = mongoose.model("Messages", messagesSchema);