import React, { useEffect, useState, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import ChatBox from '../components/Chat/ChatBox';
import ChatList from '../components/Chat/ChatList';

import { User } from '../types/user'
import { MessageData } from '../types/messageData';

import { message_api_path } from '../api/message';
import { user_api_path } from '../api/user';

import { UserContext } from '../context/UserContext';
import { UserContextType } from '../types/userContextType';

import { ChatContext } from '../context/ChatContext';
import { ChatContextType } from '../types/chatContextType';
import Sidebar from '../components/Chat/SideBar';

const backend_url = import.meta.env.VITE_BACKEND_URL;
const socket: Socket = io(backend_url);

const Chat: React.FC = () => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const { currPartner, setCurrPartner } = useContext(ChatContext) as ChatContextType;
  const {imageFile, setImageFile} = useContext(ChatContext) as ChatContextType;

  const [messageInput, setMessageInput] = useState<string>('');
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);

  const [room, setRoom] = useState<string>('');

  const [chatList, setChatList] = useState<{user: User, room:string,
    lastMessage: string , lastMessageTime: number }[]>([]);

  const location = useLocation();

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
    setImageFile(null);
    updateChatList(messageData);
  };

  async function uploadImage(file) {
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

  // if from home page, get chat partner id from state
  useEffect(() => {
    if(location.state?.user) {
      setCurrPartner(location.state.user);
    }
  }, [location.state]);


  useEffect(() => {
    if (currUser && currPartner) {
      const newRoom = generateRoomId(currUser._id, currPartner._id);
      if (newRoom !== room) {
        setRoom(newRoom);
      }
    }
  }, [currUser, currPartner]); // update the room when currentUserData or chatPartnerId changes

  useEffect(() => {
    if (room) {
      fetchMessages(room);
      socket.emit('join_room', room);

      const receiveMessage = (messageData: MessageData) => {
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

  // ensures currentUser exists
  if (currUser === null) {
    return <></>;
  }

  useEffect(() => {
    console.log(imageFile)
  }
  , [imageFile]);

  return (
    <div className='flex w-screen h-full overflow-hidden'>
      <Sidebar />

      <ChatList
        chatList={chatList}
        setChatList={setChatList}
        generateRoomId={generateRoomId}
        getUserProfile={getUserProfile}
      />

      <ChatBox
        messagesList={messagesList}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default Chat;
