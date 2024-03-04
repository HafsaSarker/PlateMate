import React, { useEffect, useState } from 'react';

interface MessageData {
  fromUserId: string;
  toUserId: string;
  room: string;
  message: string;
  sentAt: Date;
}

interface UserData {
  email: string;
  profile: {
    username: string;
    profileImg: string;
  };
  pricePoint: string[];
  profileImg: string;
  _id:string;
}

interface ChatBoxProps {
  messagesList: MessageData[];
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => Promise<void>;
  currentUserData: UserData;
  chatPartnerUsername: string;
  room: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messagesList, messageInput, setMessageInput, sendMessage, currentUserData, chatPartnerUsername, room }) => {
  return (
    <section className='flex flex-col right-section chatbox w-2/3 '>
      <div className='chat-heading flex bg-gray-500 p-4 items-center'>
        <img className="rounded-full" src='https://via.placeholder.com/40' alt='user-pfp' />
        <h3 className='pl-3'>{chatPartnerUsername}</h3>
      </div>
      <p>room: {room} (this is temporary)</p>
      <div className='message-list max-h-full flex-grow overflow-auto'>
      {messagesList.map((messageData, index) => (
        <div key={index} className={`message px-4 py-1 flex ${messageData.fromUserId === currentUserData._id ? 'justify-end' : 'justify-start'}`}>
          <div className={`
            message-content p-2 rounded-lg
            ${messageData.fromUserId === currentUserData._id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}
            min-w-32`}>
            <div className='message-content'>
              <p>{messageData.message}</p>
            </div>
            <p className='flex justify-end text-xs'>
              {messageData.sentAt?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})}
            </p>
          </div>
        </div>
      ))}
      </div>

      <div className='flex bg-gray-200 p-4 gap-2'>
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
          className='w-full rounded-md p-2'
          placeholder="Type a message"
        />
        <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150' onClick={sendMessage}>Send</button>
      </div>
    </section>
  );
}

export default ChatBox;