import React, {useContext} from 'react';
import { MessageData } from '../../types/messageData';

import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';

interface MessageProps {
  messageData: MessageData;
}

const MessageItem: React.FC<MessageProps> = ({ messageData }) => {

  const { currUser } = useContext(UserContext) as UserContextType;

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

  if (currUser === null) {
    return <></>
  }

  return (
    <div className={`message px-4 py-1 flex ${messageData.fromUserId === currUser._id ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        message-content p-2 rounded-lg whitespace-pre-wrap
        ${messageData.fromUserId === currUser._id ? 'bg-secondary text-white' : 'bg-gray-300 text-black'}
        min-w-32`}>
        <div className='message-content'>
          <p>{messageData.message}</p>
        </div>
        <p className='flex justify-end text-xs'>
          {timeDisplay(new Date(messageData.sentAt))}
        </p>
      </div>
    </div>
  );
};

export default MessageItem;