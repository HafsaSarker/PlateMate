import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { User } from "../../types/user";

interface ChatListItemProps {
  user: User;
  lastMessage: string;
  lastMessageTime: number;
}

const ChatListItem: React.FC<ChatListItemProps> = ({ user, lastMessage, lastMessageTime }) => {

  const { currPartner, setCurrPartner } = useContext(ChatContext)!;

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

  
  return (
    <div className={`flex p-4 cursor-pointer hover:bg-background-dark ${user._id === currPartner?._id ? 'bg-background-dark' : ''}`} key={user._id}
      onClick={() => setCurrPartner(user)}>
      <img src={"https://via.placeholder.com/50"} alt="profile" className='rounded-full'/>
      <div className='px-4'>
        <div className='font-bold'>{user.profile.firstName + ' ' + user.profile.lastName }</div>
        <p className='text-xs'>{truncateMessage(lastMessage)} •
        {displayTime(lastMessageTime)}</p>
      </div>
    </div>
  );
}

export default ChatListItem;