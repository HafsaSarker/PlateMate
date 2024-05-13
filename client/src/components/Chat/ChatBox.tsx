import React, { useEffect, useRef, useContext, useState } from 'react';
import { ChatBoxProps } from '../../types/chatBoxProps';
import MessageItem from './MessageItem';

import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';
import { ChatContext } from '../../context/ChatContext';
import { ChatContextType } from '../../types/chatContextType';

import { PhotoIcon, XCircleIcon, PaperAirplaneIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import SideBar from './SideBar';

const ChatBox: React.FC<ChatBoxProps> = () => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const { currPartner } = useContext(ChatContext) as ChatContextType;
  const { currPartnerImg } = useContext(ChatContext) as ChatContextType;
  const { imageFile, setImageFile } = useContext(ChatContext) as ChatContextType;
  const { messageInput, setMessageInput, messagesList } = useContext(ChatContext) as ChatContextType;

  const {sendMessage} = useContext(ChatContext) as ChatContextType;
  const [partnerProfileToggle, setPartnerProfileToggle] = useState(false);


  const partnerUsername = currPartner ? currPartner.profile.firstName + " " + currPartner.profile.lastName : null;

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  const handleFileReset = () => {
    setImageFile(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const onSendImage = () => {
    handleFileReset();
    sendMessage();
  }

  useEffect(() => {
    scrollToBottom();
  }, [messagesList]);

  if (currUser === null) {
    return <></>
  }

  if (currPartner === null) {
    return (
      <section className='flex items-center justify-center w-2/3 font-bold text-xl bg-background'>
        <div>Select a chat to start</div>
      </section>
    );
  }

  return (
    <div className='flex w-full'>
      <section className='flex flex-col right-section chatbox w-full'>
        <div className='chat-heading flex bg-primary p-3 items-center'>
          <div className='flex items-center'>
            <img className='w-10 h-10 rounded-full' src={currPartnerImg}/>

            <h3 className='pl-3'>{partnerUsername}</h3>
          </div>
          <button onClick={() => setPartnerProfileToggle(!partnerProfileToggle)} className='ml-auto'>
            <EllipsisHorizontalIcon className='w-12 h-12'/>
          </button>
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
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className='hidden'
              ref={fileInputRef}
            />
            {imageFile
              ? <button onClick={handleFileReset}><XCircleIcon className='h-10 w-10 text-red-500 hover:text-red-700' /></button>
              :
              <label htmlFor="image-upload" className="file-input-icon">
                <PhotoIcon className="h-8 w-8 text-accent hover:cursor-pointer hover:bg-background-darker" />
              </label>
            }

            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' ? onSendImage() : null}
              className='w-full rounded-md p-2'
              placeholder="Type a message"
            />
            <button className='px-4 py-2 bg-accent text-white rounded-md hover:bg-accent-hover transition duration-150' onClick={onSendImage}><PaperAirplaneIcon className='w-6 h-6' /></button>

          </section>

        </div>
      </section>
      <SideBar toggle={partnerProfileToggle} />
    </div>
  );
}

export default ChatBox;