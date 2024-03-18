import React, { useEffect, useRef, useContext } from 'react';
import { ChatBoxProps } from '../../types/chatBoxProps';
import MessageItem from './MessageItem';

import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';

const ChatBox: React.FC<ChatBoxProps> = ({ messagesList, messageInput, setMessageInput, sendMessage, currPartner}) => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const partnerUsername = currPartner ? currPartner.profile.firstName + " " + currPartner.profile.lastName : null;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  if (currPartner === null) {
    return (
      <section className='flex items-center justify-center w-2/3 font-bold text-xl bg-background'>
        <div>Select a chat to start</div>
      </section>
    );
  }

  if (currUser === null) {
    return <></>
  }

  return (
    <section className='flex flex-col right-section chatbox w-2/3 '>
      <div className='chat-heading flex bg-primary p-4 items-center'>
        <img className="rounded-full" src='https://via.placeholder.com/50' alt='user-pfp' />
        <h3 className='pl-3'>{partnerUsername}</h3>
      </div>
      <div className='message-list max-h-full flex-grow overflow-auto bg-background'>
        {messagesList.map((messageData, index) => (
          <MessageItem messageData={messageData} key={index} />
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