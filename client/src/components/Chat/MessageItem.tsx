import React, {useContext, useEffect, useState} from 'react';
import { MessageData } from '../../types/messageData';

import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';
import { s3_api_path } from '../../api/s3';
import getImageUrl from '../../utils/getImageUrl';
import { CiTrash } from "react-icons/ci";
import axios from 'axios';
import { message_api_path } from '../../api/message';
import { ChatContext } from '../../context/ChatContext';
import { ChatContextType } from '../../types/chatContextType';

interface MessageProps {
  messageData: MessageData;
}

const MessageItem: React.FC<MessageProps> = ({ messageData }) => {

  const { currUser } = useContext(UserContext) as UserContextType;
  const { handleDeleteMessage } = useContext(ChatContext) as ChatContextType;
  const [imageUrl, setImageUrl] = useState('' as string);


  useEffect(() => {
    const fetchData = async () => {
      if (messageData.imageName) {
        const imageUrl = await getImageUrl(messageData.imageName);
        setImageUrl(imageUrl);
      }
    };

    fetchData();
  }, [messageData.imageName]);

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


  const deleteMessage = async () => {
    console.log('delete message');
    const response = axios.delete(`${message_api_path}/${messageData._id}`)
    handleDeleteMessage(messageData._id);
  }

  if (currUser === null) {
    return <></>
  }

  return (
    <div className={`message group px-4 py-1 flex ${messageData.fromUserId === currUser._id ? 'justify-end' : 'justify-start'}`}>
      {messageData.fromUserId === currUser._id &&
      <button className="hidden group-hover:block pr-2" onClick={deleteMessage}><CiTrash className='h-4 w-4'/></button>}
      <div className={`group max-w-full
        message-content p-2 rounded-lg whitespace-pre-wrap min-w-32
        ${messageData.fromUserId === currUser._id ? 'bg-secondary text-white' : 'bg-gray-300 text-black'}`}>
        <div className='max-w-[500px] break-words'>
          <p>{messageData.message}</p>
        </div>
        {messageData.imageName && <img src={imageUrl} alt='sentImage' className='max-w-[500px] max-h-[500px]' />}
        <p className='flex justify-end text-xs'>
          {timeDisplay(new Date(messageData.sentAt))}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;