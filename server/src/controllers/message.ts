import { Request, Response } from 'express';
import { Message } from '../models/Message';

async function getMessages(req: Request, res: Response): Promise<void> {
  console.log('test')
  try {
    const roomId = req.params.roomId;
    const messages = await Message.find({ room: roomId }).sort({ sentAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const messageController = {
  getMessages,
};