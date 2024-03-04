import React, { useEffect, useState } from 'react';

interface ChatListProps {
  userId: string;
}

const ChatList:React.FC<ChatListProps> = ({userId}) => {
  const [partnerIds, setPartnerIds] = useState([]);


  async function getPastPartnersId(userId:string) {
    // fetch request to get past partners
    try {
      const response = await fetch(`http://localhost:8080/api/chat-partners/${userId}`);
      const data = await response.json();
      const partnerIds = data[0].users;
      console.log(partnerIds);
      setPartnerIds(partnerIds);
    } catch (error) {
      console.error("Failed to fetch partner IDs:", error);
    }
  }


  useEffect(() => {
    getPastPartnersId(userId);
  }, []);

  return (
    <div>
      {partnerIds.map((partnerId) => (
        <div className='flex p-4'>
          <img src="https://via.placeholder.com/50" alt="profile" className='rounded-full'/>
          <div className='px-4'>
            <div key={partnerId} className='font-bold'>User {partnerId}</div>
            <p className='text-xs'>Most recent message...</p>
          </div>

        </div>
      ))}

    </div>
  );
}

export default ChatList;