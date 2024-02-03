import mongoose from "mongoose";

const matchesSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        users: [mongoose.Types.ObjectId, mongoose.Types.ObjectId],
        matchScore: Number,
        matchedOn: Date,
        status: String,
      }
);

export const MatchesModel = mongoose.model("Matches", matchesSchema);