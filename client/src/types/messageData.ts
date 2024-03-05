export interface MessageData {
  fromUserId: string;
  toUserId: string;
  room: string;
  message: string;
  sentAt: Date;
}