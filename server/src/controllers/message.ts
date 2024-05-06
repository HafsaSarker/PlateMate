import { Request, Response } from 'express';
import { Message } from '../models/Message';

async function getMessages(req: Request, res: Response): Promise<void> {
  const roomId = req.params.roomId;
  const limitString = typeof req.query.limit === 'string' ? req.query.limit : undefined;
  const searchString = typeof req.query.search === 'string' ? req.query.search : '';
  console.log(searchString)
  const limit = parseInt(limitString) || 0;
  try {
    const messages = await Message.find({ room: roomId, message: { $regex: searchString, $options: 'i' }})
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


async function markMessagesAsRead(req: Request, res: Response): Promise<void> {
  const senderId = req.params.senderId;
  const roomId = req.params.roomId;
  console.log('markMessagesAsRead', senderId, roomId)
  try {
    await Message.updateMany(
      {
        fromUserId: senderId,
        room: roomId,
      },
      {$set: {readStatus: true}}
    );
  } catch (error) {
    throw error;
  }
  res.sendStatus(204)
}

async function countUnreadMessages(req: Request, res: Response): Promise<void> {
  const roomId = req.params.roomId;
  const receiverId = req.params.receiverId;

  try {
    const unreadCount = await Message.countDocuments({room:roomId, toUserId:receiverId, readStatus: false})
    res.json(unreadCount);
  } catch (error) {
    throw error;
  }
}

async function deleteMessage(req: Request, res: Response): Promise<void> {
  const messageId = req.params.messageId;
  try {
    await Message.findByIdAndDelete(messageId);
    res.sendStatus(204);
  }
  catch (error) {
    throw error;
  }
}


export const messageController = {
  getMessages,
  getChatPartners,
  markMessagesAsRead,
  countUnreadMessages,
  deleteMessage
};