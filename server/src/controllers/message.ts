import { Request, Response } from 'express';
import { Message } from '../models/Message';

async function getMessages(req: Request, res: Response): Promise<void> {
  const roomId = req.params.roomId;
  const limitString = typeof req.query.limit === 'string' ? req.query.limit : undefined;
  const limit = parseInt(limitString) || 0;
  try {

    const messages = await Message.find({ room: roomId })
                                  .sort({ sentAt: -1 })
                                  .limit(limit);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function getChatPartners(req: Request, res: Response): Promise<void> {
  console.log('getChatPartners');
  const userId = req.params.userId;
  try {
    const results = await Message.aggregate([
      {
        $match: {
          $or: [{ fromUserId: userId }, { toUserId: userId }],
        },
      },
      {
        $group: {
          _id: null,
          fromUsers: { $addToSet: "$fromUserId" },
          toUsers: { $addToSet: "$toUserId" },
        },
      },
      {
        $project: {
          _id: 0,
          uniqueUsers: { $setUnion: ["$fromUsers", "$toUsers"] },
        },
      },
      {
        $unwind: "$uniqueUsers",
      },
      {
        $match: {
          uniqueUsers: { $ne: userId }, // Exclude the user's own ID from the result
        },
      },
      {
        $group: {
          _id: null,
          users: { $addToSet: "$uniqueUsers" },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
          users: 1, // Include the users array in the result
        },
      },
    ]);

    console.log('results', results);
    res.json(results);
  } catch (error) {
    console.error("Error fetching messaged users:", error);
    throw error;
  }
}

export const messageController = {
  getMessages,
  getChatPartners,
};