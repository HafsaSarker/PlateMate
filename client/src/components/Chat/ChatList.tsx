import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { User } from '../../types/user';
import { message_api_path } from '../../api/message';

interface ChatListProps {
  partnerList: {user: User, room:string, lastMessage: string, lastMessageTime: number }[];
  setPartnerList: React.Dispatch<React.SetStateAction<{user: User, room:string, lastMessage: string , lastMessageTime: number}[]>>;
  userId: string;
  generateRoomId: (userId1:string, userId2:string) => string;
  setChatPartnerId: React.Dispatch<React.SetStateAction<string | null>>;
  setChatPartnerUsername: React.Dispatch<React.SetStateAction<string | null>>;
  getUserProfile: (userId:string) => Promise<User>;
}

const ChatList:React.FC<ChatListProps> = ({partnerList, setPartnerList, userId, generateRoomId, setChatPartnerId, setChatPartnerUsername, getUserProfile}) => {
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
      const response = await fetch(`http://localhost:8080/api/chat-partners/${userId}`);
      const data = await response.json();
      const partnerIds = data[0].users;
      console.log(partnerIds);
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
    setChatPartnerId(id);
    setChatPartnerUsername(username);
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
    <div>
      <div className='p-4'>
        <input
          className="w-full rounded-md"
          placeholder='Search for a chat'
          onChange={(e) => setSearchInput(e.target.value)}/>
      </div>
      {partnerList.filter(username => (username.user.profile.firstName + username.user.profile.lastName)
        .includes(searchInput)).map(({user, lastMessage, lastMessageTime}) => (
        <div className='flex p-4 cursor-pointer hover:bg-gray-400' key={user._id}
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

  );
}

export default ChatList;