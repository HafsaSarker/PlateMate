import { createContext, useState, useContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

import { User } from '../types/user';
import { MessageData } from '../types/messageData';
import { UserContextType } from '../types/userContextType';
import { UserContext } from './UserContext';

import { message_api_path } from '../api/message';
import { user_api_path } from '../api/user';
import { ChatContextType } from '../types/chatContextType';

export const ChatContext = createContext<ChatContextType | null>(null);
const backend_url = import.meta.env.VITE_BACKEND_URL;
const socket: Socket = io(backend_url);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const [currPartner, setCurrPartner] = useState<User | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [messageInput, setMessageInput] = useState<string>('');
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);
  const [room, setRoom] = useState<string>('');
  const [chatList, setChatList] = useState<{user: User, room:string, lastMessage: string , lastMessageTime: number }[]>([]);

  const generateRoomId = (userId1:string, userId2:string) => {
    const ids = [userId1, userId2].sort();
    const roomId = ids.join('-');
    return roomId;
  }

  const fetchMessages = async (roomId: string) => {
    try {
      const response = await fetch(`${message_api_path}/${roomId}`);
      const data = await response.json();
      const messagesWithDates = data.map((message: MessageData) => ({
        ...message,
        sentAt: new Date(message.sentAt),
      })).reverse();
      setMessagesList(messagesWithDates); // Update state with fetched messages
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const getUserProfile = async (userId:string) => {
    try {
      const response = await fetch(`${user_api_path}/${userId}`, {
        credentials: 'include', // This is equivalent to withCredentials: true in axios
      });
      const userData = await response.json(); // This gets the JSON body from the response
      return userData;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      return null;
    }
  }
  const updateChatList = async (messageData: MessageData) => {
    // Check if the message receiver is not in the current partner list
    if (!chatList.some(partner => partner.user._id === messageData.toUserId)) {
      try {
        // Fetch user profile data of the message receiver
        const partnerProfile = await getUserProfile(messageData.toUserId);
        if (partnerProfile) {
          // Create new partner data
          const newPartnerData = {
            user: partnerProfile,
            room: messageData.room,
            lastMessage: messageData.message,
            lastMessageTime: Date.now(),
          };
          // Update the partner list by adding the new partner
          setChatList(oldList => [newPartnerData, ...oldList]);
        }
      } catch (error) {
        console.error("Error updating partner list:", error);
      }
    } else {
      // If the user already exists in the partner list, update their last message and time
      setChatList(chatList.map(partner => {
        if (partner.user._id === currPartner?._id) {
          return {
            ...partner, // Copy all existing partner properties
            lastMessage: messageInput, // Set the new last message
            lastMessageTime: Date.now(), // Set the new last message time, assuming you want the current time
          };
        } else {
          return partner; // Return the unchanged partner object
        }
      }).sort((a, b) => b.lastMessageTime - a.lastMessageTime));
    }
  };

  const sendMessage = async (): Promise<void> => {
    if (messageInput === '' || !currUser || !currPartner) return;

    let imageUrl = null;
    if (imageFile) {
      console.log('Uploading image')
      imageUrl = await uploadImage(imageFile);
      console.log(imageUrl)
    }
    const messageData: MessageData = {
      fromUserId: currUser._id,
      toUserId: currPartner._id,
      room,
      message: messageInput,
      imageUrl: imageUrl,
      sentAt: new Date(),
    };
    socket.emit('send_message', messageData);
    setMessagesList((messagesList) => [...messagesList, messageData]);
    setMessageInput('');
    console.log(messagesList)
    updateChatList(messageData);
  };

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${backend_url}/api/s3`, {
      method: 'POST',
      body: formData, // Send formData instead of raw file
    });
    const data = await response.json();
    console.log('data:', data);
    return data.imageUrl;
  }

  useEffect(() => {
    if (room) {
      fetchMessages(room);
      socket.emit('join_room', room);

      const receiveMessage = (messageData: MessageData) => {
        console.log('got new message!')
        setMessagesList(prevMessages => [...prevMessages, {
          ...messageData,
          sentAt: new Date(messageData.sentAt)
        }]);
      };

      socket.on('receive_message', receiveMessage);

      return () => {
        socket.off('receive_message', receiveMessage);
      };
    }
  }, [room]); // Fetch messages and set up socket listeners whenever the room changes

  useEffect(() => {
    if (currUser && currPartner) {
      const newRoom = generateRoomId(currUser._id, currPartner._id);
      if (newRoom !== room) {
        setRoom(newRoom);
      }
    }
  }, [currUser, currPartner]); // update the room when currentUserData or chatPartnerId changes


  return (
    <ChatContext.Provider value={{
      currPartner,
      setCurrPartner,
      imageFile,
      setImageFile,
      messageInput,
      setMessageInput,
      messagesList,
      setMessagesList,
      room,
      setRoom,
      chatList,
      setChatList,
      generateRoomId,
      fetchMessages,
      getUserProfile,
      updateChatList,
      sendMessage,
      uploadImage,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
