import React, { useEffect, useRef, useContext } from 'react';
import { ChatBoxProps } from '../../types/chatBoxProps';
import MessageItem from './MessageItem';

import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';
import { ChatContext } from '../../context/ChatContext';
import { ChatContextType } from '../../types/chatContextType';

import { PhotoIcon, XCircleIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ChatBox: React.FC<ChatBoxProps> = ({ messagesList, messageInput, setMessageInput, sendMessage}) => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const { currPartner } = useContext(ChatContext) as ChatContextType;
  const { imageFile, setImageFile } = useContext(ChatContext) as ChatContextType;

  const partnerUsername = currPartner ? currPartner.profile.firstName + " " + currPartner.profile.lastName : null;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleReset = () => {
    setImageFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
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


      <div className='flex flex-col bg-background-dark p-4'>
        <div>
          {imageFile && <img src={URL.createObjectURL(imageFile)} alt='sentImage' className='max-h-16 rounded-lg p-1' />}
        </div>
        <section className='input-section flex gap-2 items-center w-full'>
          <input
            type="file"
            id='image-upload'
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])} // Assuming setImageFile is the function to handle the selected file
            className='hidden'
            ref={fileInputRef}
          />
          {imageFile
            ? <button onClick={handleReset}><XCircleIcon className='h-10 w-10 text-red-500 hover:text-red-700' /></button>
            :
            <label htmlFor="image-upload" className="file-input-icon">
              <PhotoIcon className="h-8 w-8 text-accent hover:cursor-pointer hover:bg-background-darker" />
            </label>
          }

          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : null}
            className='w-full rounded-md p-2'
            placeholder="Type a message"
          />
          <button className='px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition duration-150' onClick={sendMessage}><PaperAirplaneIcon className='w-6 h-6' /></button>

        </section>

      </div>
    </section>
  );
}

export default ChatBox;