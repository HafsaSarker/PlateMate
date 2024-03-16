import React, { useEffect, useRef } from 'react';
import { ChatBoxProps } from '../../types/chatBoxProps';

const ChatBox: React.FC<ChatBoxProps> = ({ messagesList, messageInput, setMessageInput, sendMessage, currentUserData, chatPartnerUsername, room }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (chatPartnerUsername === null) {
    return (
      <section className='flex items-center justify-center w-2/3 font-bold text-xl'>
        <div>Select a chat to start</div>
      </section>
    );
  }

  const timeDisplay = (time: Date) => {
    const currDate = new Date();
    const datesAreDifferent = time.getFullYear() !== currDate.getFullYear() ||
                              time.getMonth() !== currDate.getMonth() ||
                              time.getDate() !== currDate.getDate();
    if (datesAreDifferent) {
      return time.toLocaleDateString('en-US');
    }

    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  return (
    <section className='flex flex-col right-section chatbox w-2/3 '>
      <div className='chat-heading flex bg-primary p-4 items-center'>
        <img className="rounded-full" src='https://via.placeholder.com/50' alt='user-pfp' />
        <h3 className='pl-3'>{chatPartnerUsername}</h3>
      </div>
      <div className='message-list max-h-full flex-grow overflow-auto'>
        {messagesList.map((messageData, index) => (
          <div key={index} className={`message px-4 py-1 flex ${messageData.fromUserId === currentUserData._id ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              message-content p-2 rounded-lg
              ${messageData.fromUserId === currentUserData._id ? 'bg-secondary text-white' : 'bg-gray-300 text-black'}
              min-w-32`}>
              <div className='message-content'>
                <p>{messageData.message}</p>
              </div>
              <p className='flex justify-end text-xs'>
                {timeDisplay(messageData.sentAt)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='flex bg-background-hover p-4 gap-2'>
        <input
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
          className='w-full rounded-md p-2'
          placeholder="Type a message"
        />
        <button className='px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition duration-150' onClick={sendMessage}>Send</button>
      </div>
    </section>
  );
}

export default ChatBox;