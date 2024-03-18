import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { User } from '../../types/user';
import { message_api_path } from '../../api/message';
import { chat_partner_api_path } from '../../api/chat-partners';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';


import { UserContext } from '../../context/UserContext';
import { UserContextType } from '../../types/userContextType';
import { ChatContext } from '../../context/ChatContext';
import { ChatContextType } from '../../types/chatContextType';
import ChatListItem from './ChatListItem';

interface ChatListProps {
  chatList: {user: User, room:string, lastMessage: string, lastMessageTime: number }[];
  setChatList: React.Dispatch<React.SetStateAction<{user: User, room:string, lastMessage: string , lastMessageTime: number}[]>>;
  generateRoomId: (userId1:string, userId2:string) => string;
  getUserProfile: (userId:string) => Promise<User>;
}

const ChatList:React.FC<ChatListProps> = ({chatList, setChatList, generateRoomId, getUserProfile}) => {
  const { currUser } = useContext(UserContext) as UserContextType;

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
    <div className='h-full overflow-hidden'>
      <h1 className='py-2 px-6 text-2xl font-bold'>Chats</h1>
      <div className='py-3 px-6 gap-4 flex justify-center items-center bg-background-hover mx-4 my-2 rounded-full'>
        <MagnifyingGlassIcon className='h-5 w-5'/>
        <input
          className="w-full bg-transparent border-none focus:ring-0 p-0"
          placeholder='Search for a chat'
          onChange={(e) => setSearchInput(e.target.value)}/>
      </div>
      <div className='partner-list max-h-full overflow-auto'>
        {chatList.filter(chatData => (chatData.user.profile.firstName + " " + chatData.user.profile.lastName)
          .includes(searchInput)).map(({user, lastMessage, lastMessageTime}) => (
            <ChatListItem user={user} lastMessage={truncateMessage(lastMessage)} lastMessageTime={lastMessageTime} key={user._id}/>
        ))}
      </div>

    </div>

  );
}

export default ChatList;