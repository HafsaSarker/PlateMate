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

const backend_url = import.meta.env.VITE_BACKEND_URL;
const socket: Socket = io(backend_url);

const Chat: React.FC = () => {
  const { currUser } = useContext(UserContext) as UserContextType;

  const [messageInput, setMessageInput] = useState<string>('');
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);

  const [currPartnerId, setCurrPartnerId] = useState<string | null>(null);
  const [currPartnerUsername, setCurrPartnerUsername] = useState<string | null>(null);

  const [room, setRoom] = useState<string>('');

  const [partnerList, setPartnerList] = useState<{user: User, room:string,
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

  // if from home page, get chat partner id from state
  useEffect(() => {
    if(location.state?.userId && location.state?.username) {
      setCurrPartnerId(location.state.userId);
      setCurrPartnerUsername(location.state.username);
    }
  }, [location.state]);


  useEffect(() => {
    if (currUser && currPartnerId) {
      const newRoom = generateRoomId(currUser._id, currPartnerId);
      if (newRoom !== room) {
        setRoom(newRoom);
      }
    }
  }, [currUser, currPartnerId]); // update the room when currentUserData or chatPartnerId changes

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

  const updatePartnerList = async (messageData: MessageData) => {
    // Check if the message receiver is not in the current partner list
    if (!partnerList.some(partner => partner.user._id === messageData.toUserId)) {
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
          setPartnerList(oldList => [newPartnerData, ...oldList]);
        }
      } catch (error) {
        console.error("Error updating partner list:", error);
      }
    } else {
      // If the user already exists in the partner list, update their last message and time
      setPartnerList(partnerList.map(partner => {
        if (partner.user._id === currPartnerId) {
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
    if (messageInput === '' || !currUser || !currPartnerId) return;
    const messageData: MessageData = {
      fromUserId: currUser._id,
      toUserId: currPartnerId,
      room,
      message: messageInput,
      sentAt: new Date(),
    };
    socket.emit('send_message', messageData);
    setMessagesList((messagesList) => [...messagesList, messageData]);
    setMessageInput('');
    updatePartnerList(messageData);
  };

  // ensures currentUser exists
  if (currUser === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex w-screen h-full overflow-hidden'>
      <section className='left-section w-1/3 border-r-2 border-gray-300 flex flex-col h-full'>
        <div className='user-heading flex bg-primary p-4 items-center'>
          <img className="rounded-full" src='https://via.placeholder.com/50' alt='user-pfp' />
          <h3 className='pl-4 font-bold'></h3>
        </div>
        <ChatList
          partnerList={partnerList}
          setPartnerList={setPartnerList}
          userId={currUser._id}
          generateRoomId={generateRoomId}
          currPartnerId={currPartnerId}
          setCurrPartnerId={setCurrPartnerId}
          setCurrPartnerUsername={setCurrPartnerUsername}
          getUserProfile={getUserProfile}
        />
      </section>

      <ChatBox
        messagesList={messagesList}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
        currentUserData={currUser}
        chatPartnerUsername={currPartnerUsername}
        room={room}
      />
    </div>
  );
}

export default Chat;
