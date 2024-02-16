import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8080');

interface MessageData {
  username: string;
  room: string;
  message: string;
  time: string;
}

const Chat: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>('');
  const [messagesList, setMessagesList] = useState<MessageData[]>([]);

  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('123');

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message', (messageData: MessageData) => {
      console.log('received message', messageData)
      setMessagesList((messagesList) => [...messagesList, messageData]);
      console.log(messagesList)
    });

    return () => {
      socket.off('receive_message');
    };
  }, [socket]);

  const sendMessage = async (): Promise<void> => {
    if (messageInput === '') return;
    const messageData: MessageData = {
      username,
      room,
      message: messageInput,
      time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    };
    socket.emit('send_message', messageData);
    setMessagesList((messagesList) => [...messagesList, messageData]);
    setMessageInput('');
  };

  return (
    <div className='flex w-screen h-full px-20 py-10'>
      <section className='left-section w-1/3 border-r-2 border-gray-300'>
        <div className='user-heading flex bg-gray-500 p-2 items-center'>
          <img className="rounded-full" src='https://via.placeholder.com/40' alt='user-pfp' />
        </div>
        <h1>Chats</h1>
        <div className='p-2'>
          <input className="w-full" placeholder='Search for a chat'/>
        </div>
      </section>
      <section className='right-section chatbox w-2/3 flex flex-col'>
        <div className='chat-heading flex bg-gray-500 p-2 items-center'>
          <img className="rounded-full" src='https://via.placeholder.com/40' alt='user-pfp' />
          <h3 className='pl-3'>User's Name</h3>
        </div>
        <p>room: {room} (this is temporary)</p>
        <div className='message-list flex-grow p-4'>
          {messagesList.map((messageData, index) => (
            <div key={index}>
              <p>{messageData.username}: {messageData.message}</p>
              <p>{messageData.time}</p>
            </div>
          ))}
        </div>

        <div className='flex bg-gray-200 px-4 py-2'>
          <input value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />

          <input
            value={messageInput}
            placeholder="Type a message"
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
            className='w-full rounded-md'
          />
          <button onClick={sendMessage}>Send</button>
        </div>

      </section>
    </div>
  );
}

export default Chat;
