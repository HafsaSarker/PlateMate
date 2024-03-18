import { MessageData } from "./messageData";
import { User } from "./user";

export interface ChatBoxProps {
  messagesList: MessageData[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => Promise<void>;
}