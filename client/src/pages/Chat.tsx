import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import ChatBox from '../components/Chat/ChatBox';
import ChatList from '../components/Chat/ChatList';

import { User } from '../types/user'
import { MessageData } from '../types/messageData';

const socket: Socket = io('http://localhost:8080');

const Chat: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);

  const [currentUserData, setCurrentUserData] = useState<User | null>(null);
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  const location = useLocation();
  const chatPartnerId: string = location.state?.userId;
  const chatPartnerUsername: string = location.state?.username;

  const generateRoomId = (userId1:string, userId2:string) => {
    const ids = [userId1, userId2].sort();
    const roomId = ids.join('-');
    return roomId;
  }

  const fetchMessages = async (roomId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/api/messages/${roomId}`);
      const data = await response.json();
      const messagesWithDates = data.map((message: MessageData) => ({
        ...message,
        sentAt: new Date(message.sentAt),
      }));
      setMessagesList(messagesWithDates); // Update state with fetched messages
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  useEffect(() => {
    const userExist = localStorage.getItem('user');
    if (userExist) {
      const user = JSON.parse(userExist);
      setCurrentUserData(user);
      setUsername(user.profile.firstName);
      console.log(user);
    }
    // else redirect to login
  }, []);

  useEffect(() => {
    if (!currentUserData || !chatPartnerId) return;

    const room = generateRoomId(currentUserData._id, chatPartnerId);
    console.log('room', room);
    setRoom(room);
    socket.emit('join_room', room);

    fetchMessages(room);

    socket.on('receive_message', (messageData: MessageData) => {
      // this makes sure the time is a date object
      const updatedMessageData = {
        ...messageData,
        sentAt: new Date(messageData.sentAt),
      };
      console.log('received message', messageData)
      setMessagesList((messagesList) => [...messagesList, updatedMessageData]);
      console.log(messagesList)
    });


    return () => {
      socket.off('receive_message');
    };

  }, [socket, currentUserData, chatPartnerId]);

  const sendMessage = async (): Promise<void> => {
    if (messageInput === '' || !currentUserData) return;
    const messageData: MessageData = {
      fromUserId: currentUserData._id,
      toUserId: chatPartnerId,
      room,
      message: messageInput,
      sentAt: new Date(),
    };
    console.log(messageData)
    socket.emit('send_message', messageData);
    setMessagesList((messagesList) => [...messagesList, messageData]);
    setMessageInput('');
  };

  // ensures currentUser exists
  if (currentUserData === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex w-screen h-full overflow-hidden'>
      <section className='left-section w-1/3 border-r-2 border-gray-300'>
        <div className='user-heading flex bg-gray-500 p-4 items-center'>
          <img className="rounded-full" src='https://via.placeholder.com/40' alt='user-pfp' />
          <h3 className='pl-4 font-bold'>{username}</h3>
        </div>
        <div className='p-4'>
          <input className="w-full rounded-md" placeholder='Search for a chat'/>
        </div>
        <ChatList userId={currentUserData._id}/>
      </section>

      <ChatBox
        messagesList={messagesList}
        messageInput={messageInput}
        setMessageInput={setMessageInput}
        sendMessage={sendMessage}
        currentUserData={currentUserData}
        chatPartnerUsername={chatPartnerUsername}
        room={room}
      />
    </div>
  );
}

export default Chat;
