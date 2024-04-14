export interface MessageData {
  fromUserId: string;
  toUserId: string;
  room: string;
  message: string;
  imageUrl: string | null;
  sentAt: Date;
  readStatus: boolean;
}