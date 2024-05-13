import { createContext, useState, useContext, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { User } from '../types/user';
import { MessageData } from '../types/messageData';
import { UserContextType } from '../types/userContextType';
import { UserContext } from './UserContext';

import { message_api_path } from '../api/message';
import { user_api_path } from '../api/user';
import { ChatContextType } from '../types/chatContextType';
import uploadImage from '../utils/uploadImage';
import getImageUrl from '../utils/getImageUrl';


export const ChatContext = createContext<ChatContextType | null>(null);
const backend_url = import.meta.env.VITE_BACKEND_URL;
const socket: Socket = io(backend_url);

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const [currPartner, setCurrPartner] = useState<User | null>(null);
  const [currPartnerImg, setCurrPartnerImg] = useState<string>('');
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

  const handleDeleteMessage = async (messageId: string) => {
    setMessagesList(currentMessages => currentMessages.filter(message => message._id !== messageId));
  };

  const fetchMessages = async (roomId: string) => {
    try {
      const response = await fetch(`${message_api_path}/${roomId}`);
      const data = await response.json();
      const messagesWithDates = data.map((message: MessageData) => ({
        ...message,
        sentAt: new Date(message.sentAt),
      })).reverse();
      setMessagesList(messagesWithDates); // Update state with fetched messages
      console.log(messagesWithDates)
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

  const getMostRecentMessage = async (roomId:string) => {
    try {
      const response = await axios.get(`${message_api_path}/${roomId}?limit=1`);
      const messageArray = await response.data;
      const messageData = messageArray[0];
      return messageData ? messageData : null;
    } catch (error) {
      console.error("Failed to fetch most recent message:", error);
      return null;
    }
  }

  const getPartnerIds = async (userId:string) => {
    // fetch request to get past partners id
    try {
      const response = await axios.get(`${message_api_path}/partners/${userId}`);
      const partnerIds = response.data[0].users;
      return partnerIds;
    } catch (error) {
      console.error("Failed to fetch partner IDs:", error);
    }
  }

  const updateChatList = async (userId:string) => {
    const partnerIds = await getPartnerIds(userId);
    const newChatList = [];

    // for each old chat partner, get their profile and most recent message and add to the list
    for (let partnerId of partnerIds) {
        const roomId = generateRoomId(userId, partnerId);
        const [partnerProfile, messageData] = await Promise.all([
          getUserProfile(partnerId),
          getMostRecentMessage(roomId)
        ]);
        if (partnerProfile) { // Only add to the list if the profile is not null
          newChatList.push({ user: partnerProfile, room: roomId,
              lastMessage: messageData.message, lastMessageTime: new Date(messageData.sentAt).getTime() });
        }
    }
    // sort the list by most recent message
    newChatList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);
    setChatList(newChatList);
  }

  const sendMessage = async (): Promise<void> => {
    if ((messageInput === '' && imageFile === null) || !currUser || !currPartner) return;

    let imageName = null;
    if (imageFile) {
      console.log('Uploading image')
      imageName = await uploadImage(imageFile);
      console.log(imageName)
    }
    const messageData: MessageData = {
      fromUserId: currUser._id,
      toUserId: currPartner._id,
      room,
      message: messageInput,
      imageName: imageName,
      sentAt: new Date(),
      readStatus: false,
      _id: uuidv4(),
    };
    socket.emit('send_message', messageData);
    setMessagesList((messagesList) => [...messagesList, messageData]);
    setMessageInput('');
    console.log(messagesList)
    updateChatList(currUser._id);
  };

  useEffect(() => {
    const fetchPartnerImage = async () => {
      if (currPartner && currPartner.profile.profileImg) {
        const imageUrl = await getImageUrl(currPartner.profile.profileImg);
        setCurrPartnerImg(imageUrl);
      } else {
        setCurrPartnerImg('user.png');
      }
    }
    fetchPartnerImage();
    console.log('fetching partner image')
  }, [currPartner]); // Fetch past partners whenever the currentUserData changes

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
        if (currUser) {
          updateChatList(currUser._id);
        }
      };

      socket.on('receive_message', receiveMessage);

      return () => {
        socket.off('receive_message', receiveMessage);
        socket.emit('leave_room', room);
        console.log('leaving room', room)
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
      sendMessage,
      uploadImage,
      currPartnerImg,
      handleDeleteMessage,
      updateChatList,
      }}>
      {children}
    </ChatContext.Provider>
  );
};
