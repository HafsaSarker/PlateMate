import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { User } from '../../types/user';
import { message_api_path } from '../../api/message';
import { chat_partner_api_path } from '../../api/chat-partners';
import { Cog8ToothIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';


import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';
import { ChatContext } from '../../context/ChatContext';
import { ChatContextType } from '../../types/chatContextType';
import ChatListItem from './ChatListItem';

const ChatList:React.FC = () => {
  const { currUser } = useContext(UserContext) as UserContextType;
  const {chatList, setChatList} = useContext(ChatContext) as ChatContextType;
  const {generateRoomId, getUserProfile} = useContext(ChatContext) as ChatContextType;

  const [searchInput, setSearchInput] = useState('');
  const getMostRecentMessage = async (roomId:string) => {
    try {
      const response = await axios.get(`${message_api_path}/${roomId}?limit=1`);
      const messageArray = await response.data;
      const messageData = messageArray[0];
      return messageData ? messageData : null;
    } catch (error) {
      console.error("Failed to fetch most recent message:", error);
      return null;
    }
  }

  const getPastPartnersId = async (userId:string) => {
    // fetch request to get past partners id
    try {
      const response = await axios.get(`${chat_partner_api_path}/${userId}`);
      const partnerIds = response.data[0].users;
      return partnerIds;
    } catch (error) {
      console.error("Failed to fetch partner IDs:", error);
    }
  }

  const getPastPartners = async (userId:string) => {
    setChatList([]);
    const partnerIds = await getPastPartnersId(userId);
    const newChatList = [];

    // for each old chat partner, get their profile and most recent message and add to the list
    for (let partnerId of partnerIds) {
        const roomId = generateRoomId(userId, partnerId);
        const [partnerProfile, messageData] = await Promise.all([
          getUserProfile(partnerId),
          getMostRecentMessage(roomId)
        ]);
        if (partnerProfile) { // Only add to the list if the profile is not null
          newChatList.push({ user: partnerProfile, room: roomId,
              lastMessage: messageData.message, lastMessageTime: new Date(messageData.sentAt).getTime() });
        }
    }
    // sort the list by most recent message
    newChatList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

    setChatList(newChatList);
  }

  const truncateMessage = (message:string, maxLength = 35) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  }

  if (currUser === null) {
    return <></>
  }

  useEffect(() => {
    getPastPartners(currUser._id);
  }, []);

  return (
    <section className='left-section w-[30%] border-x-2 border-gray-300 flex flex-col h-full'>
      <div className='h-full pt-5 flex flex-col'>
        <div className='flex py-2 px-6 items-center justify-between'>
          <div className='flex items-center gap-5'>
            <img className="rounded-full" src='https://via.placeholder.com/55' alt='user-pfp' />
            <h1 className='text-2xl font-bold'>Chats</h1>
          </div>
          <Cog8ToothIcon className="h-9" />
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