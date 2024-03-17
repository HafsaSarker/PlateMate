import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { message_api_path } from '../../api/message';
import { chat_partner_api_path } from '../../api/chat-partners';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

interface ChatListProps {
  partnerList: {user: User, room:string, lastMessage: string, lastMessageTime: number }[];
  setPartnerList: React.Dispatch<React.SetStateAction<{user: User, room:string, lastMessage: string , lastMessageTime: number}[]>>;
  userId: string;
  generateRoomId: (userId1:string, userId2:string) => string;
  currPartnerId: string | null;
  setCurrPartnerId: React.Dispatch<React.SetStateAction<string | null>>;
  setCurrPartnerUsername: React.Dispatch<React.SetStateAction<string | null>>;
  getUserProfile: (userId:string) => Promise<User>;
}

const ChatList:React.FC<ChatListProps> = ({partnerList, setPartnerList, userId, generateRoomId, currPartnerId, setCurrPartnerId, setCurrPartnerUsername, getUserProfile}) => {
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
    setPartnerList([]);
    const partnerIds = await getPastPartnersId(userId);
    const newPartnerList = [];

    // for each old chat partner, get their profile and most recent message and add to the list
    for (let partnerId of partnerIds) {
        const roomId = generateRoomId(userId, partnerId);
        const [partnerProfile, messageData] = await Promise.all([
          getUserProfile(partnerId),
          getMostRecentMessage(roomId)
        ]);
        if (partnerProfile) { // Only add to the list if the profile is not null
          newPartnerList.push({ user: partnerProfile, room: roomId,
              lastMessage: messageData.message, lastMessageTime: new Date(messageData.sentAt).getTime() });
        }
    }
    // sort the list by most recent message
    newPartnerList.sort((a, b) => b.lastMessageTime - a.lastMessageTime);

    setPartnerList(newPartnerList);
  }

  const truncateMessage = (message:string, maxLength = 35) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  }

  const updatePartner = (id:string, username:string) => {
    setCurrPartnerId(id);
    setCurrPartnerUsername(username);
  }

  const displayTime = (time:number) => {
    const currentTime = new Date().getTime();
    const difference = currentTime - time;
    const minutes = Math.floor(difference / (1000 * 60));
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years + 'y';
    } else if (months > 0) {
      return months + 'mo';
    } else if (weeks > 0) {
      return weeks + 'w';
    } else if (days > 0) {
      return days + 'd';
    } else if (hours > 0) {
      return hours + 'h';
    } else if (minutes > 0) {
      return minutes + 'min';
    } else {
      return '1min';
    }
  }



  useEffect(() => {
    getPastPartners(userId);
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
        {partnerList.filter(username => (username.user.profile.firstName + " " + username.user.profile.lastName)
          .includes(searchInput)).map(({user, lastMessage, lastMessageTime}) => (
          <div className={`flex p-4 cursor-pointer hover:bg-background-hover ${user._id === currPartnerId ? 'bg-background-hover' : ''}`} key={user._id}
            onClick={() => updatePartner(user._id, user.profile.firstName + ' ' + user.profile.lastName)}>
            <img src={"https://via.placeholder.com/50"} alt="profile" className='rounded-full'/>
            <div className='px-4'>
              <div className='font-bold'>{user.profile.firstName + ' ' + user.profile.lastName }</div>
              <p className='text-xs'>{truncateMessage(lastMessage)} •
              {displayTime(lastMessageTime)}</p>
            </div>
          </div>
        ))}
      </div>

    </div>

  );
}

export default ChatList;