import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8080');

interface MessageData {
  username: string;
  room: string;
  message: string;
  time: Date;
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

    // return () => {
    //   socket.off('receive_message');
    // };
  }, [socket]);

  const sendMessage = async (): Promise<void> => {
    if (messageInput === '') return;
    const messageData: MessageData = {
      username,
      room,
      message: messageInput,
      time: new Date(),
    };
    socket.emit('send_message', messageData);
    setMessagesList((messagesList) => [...messagesList, messageData]);
    setMessageInput('');
  };

  return (
    <div>
      <p>room: {room}</p>
      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <input
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>
      {messagesList.map((messageData, index) => (
        <p key={index}>{messageData.username}: {messageData.message}</p>
      ))}
    </div>
  );
}

export default Chat;
