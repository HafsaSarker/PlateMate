import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  fromUserId: string;
  toUserId: string;
  room: string;
  message: string;
  imageName: string | null;
  sentAt: Date;
  readStatus: boolean;
  _id: string;
}

const messageSchema: Schema = new Schema({
  fromUserId: { type: String, required: true },
  toUserId: { type: String, required: true },
  room: { type: String, required: true },
  message: { type: String, required: false },
  imageName: { type: String, default: null },
  sentAt: { type: Date, default: Date.now },
  readStatus: { type: Boolean, default: false },
  _id: { type: String, required: true },
});

export const Message = mongoose.model<IMessage>('Message', messageSchema);
