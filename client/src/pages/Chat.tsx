import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import ChatBox from '../components/Chat/ChatBox';
import ChatList from '../components/Chat/ChatList';

import { User } from '../types/user'
import { MessageData } from '../types/messageData';

import { message_api_path } from '../api/message';
import { user_api_path } from '../api/user';

const socket: Socket = io('http://localhost:8080');

const Chat: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);

  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [username, setUsername] = useState<string>('');

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
    const userExist = localStorage.getItem('user');
    if (userExist) {
      const user = JSON.parse(userExist);
      setCurrentUserData(user);
      setUsername(user.profile.firstName + ' ' + user.profile.lastName);
      console.log(user);
    }
    // else redirect to login
  }, []);

  useEffect(() => {
    if (currentUserData && currPartnerId) {
      const newRoom = generateRoomId(currentUserData._id, currPartnerId);
      if (newRoom !== room) {
        setRoom(newRoom);
      }
    }
  }, [currentUserData, currPartnerId]); // update the room when currentUserData or chatPartnerId changes

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
      console.log('user exists')
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
    if (messageInput === '' || !currentUserData || !currPartnerId) return;
    const messageData: MessageData = {
      fromUserId: currentUserData._id,
      toUserId: currPartnerId,
      room,
      message: messageInput,
      sentAt: new Date(),
    };
    console.log(messageData)
    socket.emit('send_message', messageData);
    setMessagesList((messagesList) => [...messagesList, messageData]);
    setMessageInput('');
    updatePartnerList(messageData);
  };

  // ensures currentUser exists
  if (currentUserData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex w-screen h-full overflow-hidden'>
      <section className='left-section w-1/3 border-r-2 border-gray-300'>
        <div className='user-heading flex bg-gray-500 p-4 items-center'>
          <img className="rounded-full" src='https://via.placeholder.com/55' alt='user-pfp' />
          <h3 className='pl-4 font-bold'>{username}</h3>
        </div>
        <ChatList
          partnerList={partnerList}
          setPartnerList={setPartnerList}
          userId={currentUserData._id}
          generateRoomId={generateRoomId}
          setChatPartnerId={setCurrPartnerId}
          setChatPartnerUsername={setCurrPartnerUsername}
          getUserProfile={getUserProfile}
        />
      </section>

      <ChatBox
        messagesList={messagesList}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
        currentUserData={currentUserData}
        chatPartnerUsername={currPartnerUsername}
        room={room}
      />
    </div>
  );
}

export default Chat;
