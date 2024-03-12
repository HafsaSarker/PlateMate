import { User } from "./user";
import { MessageData } from "./messageData";

export interface ChatBoxProps {
  messagesList: MessageData[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => Promise<void>;
  currentUserData: User;
  chatPartnerUsername: string | null;
  room: string;
}