export interface MessageData {
  fromUserId: string;
  toUserId: string;
  room: string;
  message: string;
  imageName: string | null;
  sentAt: Date;
  readStatus: boolean;
  _id: string;
}