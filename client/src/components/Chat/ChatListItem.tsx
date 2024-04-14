import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { User } from "../../types/user";
import { ChatContextType } from "../../types/chatContextType";
import { UserContextType } from "../../types/userContextType";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { message_api_path } from "../../api/message";
import getImageUrl from "../../utils/getImageUrl";


interface ChatListItemProps {
  user: User;
  lastMessage: string;
  lastMessageTime: number;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ user, lastMessage, lastMessageTime }) => {
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0)
  const { currPartner, setCurrPartner, generateRoomId } = useContext(ChatContext) as ChatContextType;
  const {currUser} = useContext(UserContext) as UserContextType;


  const getUnreadMessagesCount = async () => {
    if (!currUser) return;
    const roomId = generateRoomId(currUser._id, user._id);
    // fetch request to get unread messages count
    const response = await axios.get(`${message_api_path}/countUnread/${roomId}/${currUser._id}`)
    const unreadCount = response.data;
    setUnreadMessagesCount(unreadCount)

  }

  const [ userImage, setUserImage ] = useState('');


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

  const truncateMessage = (message:string, maxLength = 35) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  }


  useEffect(() => {
    getUnreadMessagesCount();
  }, [currPartner])

  const fetchUserImage = async () => {
    if (!user.profile.profileImg) {
      setUserImage('user.png');
    }
    const userImg = await getImageUrl(user.profile.profileImg);
    setUserImage(userImg);
    console.log(userImg)
  }

  useEffect(() => {
    fetchUserImage();
  }, []);

  return (
    <div className={`flex p-4 cursor-pointer items-center hover:bg-background-dark ${user._id === currPartner?._id ? 'bg-background-dark' : ''}`} key={user._id}
      onClick={() => setCurrPartner(user)}>
      <img className="w-12 h-12 rounded-full" src={userImage || "user.png"}/>
      <div className='px-4'>
        <div className='font-bold'>{user.profile.firstName + ' ' + user.profile.lastName }</div>
        <p className='text-xs'>{truncateMessage(lastMessage)} •
        {displayTime(lastMessageTime)}</p>
      </div>
      {
        unreadMessagesCount > 0 &&
        <div className="bg-red-400 flex justify-center rounded-full h-5 w-5 text-sm">{unreadMessagesCount}</div>
      }
    </div>
  );
}

export default ChatListItem;