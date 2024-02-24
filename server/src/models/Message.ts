import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  fromUserId: string;
  toUserId: string;
  room: string;
  message: string;
  sentAt: Date;
}

const messageSchema: Schema = new Schema({
  fromUserId: { type: String, required: true },
  toUserId: { type: String, required: true },
  room: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model<IMessage>('Message', messageSchema);
