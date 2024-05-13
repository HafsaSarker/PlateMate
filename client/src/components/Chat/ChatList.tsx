import React, { useEffect, useState, useContext } from 'react';
import { Cog8ToothIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';


import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';
import { ChatContext } from '../../context/ChatContext';
import { ChatContextType } from '../../types/chatContextType';
import ChatListItem from './ChatListItem';

const ChatList:React.FC = () => {
  const { currUser, userImageUrl } = useContext(UserContext) as UserContextType;
  const {chatList, currPartner, messagesList} = useContext(ChatContext) as ChatContextType;

  const [searchInput, setSearchInput] = useState('');

  const { updateChatList } = useContext(ChatContext) as ChatContextType;

  const truncateMessage = (message:string, maxLength = 35) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  }

  if (currUser === null) {
    return <></>
  }

  useEffect(() => {
    updateChatList(currUser._id);
  }, [currPartner, messagesList]);

  return (
    <section className='left-section w-[30%] min-w-[300px] border-x-2 border-gray-300 flex flex-col h-full'>
      <div className='h-full pt-5 flex flex-col'>
        <div className='flex py-2 px-6 items-center justify-between'>
          <div className='flex items-center gap-5'>
            <img className="rounded-full w-[60px] h-[60px]" src={userImageUrl} alt='user-pfp' />
            <h1 className='text-2xl font-bold'>Chats</h1>
          </div>

        </div>

        <div className='py-3 px-6 gap-4 flex justify-center items-center bg-background-dark mx-4 my-2 rounded-full'>
          <MagnifyingGlassIcon className='h-5 w-5'/>
          <input
            className="w-full bg-transparent border-none focus:ring-0 p-0"
            placeholder='Search for a chat'
            onChange={(e) => setSearchInput(e.target.value)}/>
        </div>
        <div className='flex flex-col partner-list overflow-auto'>
          {chatList.filter(chatData => (chatData.user.profile.firstName + " " + chatData.user.profile.lastName)
            .includes(searchInput)).map(({user, lastMessage, lastMessageTime}) => (
              <ChatListItem user={user} lastMessage={truncateMessage(lastMessage)} lastMessageTime={lastMessageTime} key={user._id}/>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ChatList;