import { User } from './user';
import { MessageData } from '../types/messageData';

export interface ChatContextType {
  currPartner: User | null;
  setCurrPartner: React.Dispatch<React.SetStateAction<User | null>>;
  imageFile: File | null;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  messagesList: MessageData[];
  setMessagesList: React.Dispatch<React.SetStateAction<MessageData[]>>;
  room: string;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
  chatList: {user: User, room:string, lastMessage: string , lastMessageTime: number }[];
  setChatList: React.Dispatch<React.SetStateAction<{user: User, room:string, lastMessage: string , lastMessageTime: number }[]>>;
  generateRoomId: (userId1:string, userId2:string) => string;
  fetchMessages: (roomId: string) => Promise<void>;
  getUserProfile: (userId:string) => Promise<User>;
  sendMessage: () => Promise<void>;
  uploadImage: (file: File) => Promise<string>;
  currPartnerImg: string;
  handleDeleteMessage: (messageId: string) => void;
  updateChatList: (userId:string) => Promise<void>;
}
