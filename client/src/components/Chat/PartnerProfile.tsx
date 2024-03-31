import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { ChatContextType } from "../../types/chatContextType";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import UserInfo from "../home/UserInfo";
import { User } from "../../types/user";

interface PartnerProfileProps {
  toggle: boolean;
}

const PartnerProfile: React.FC<PartnerProfileProps> = ({ toggle }) => {
  const {currPartner} = useContext(ChatContext) as ChatContextType;

  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  console.log(currPartner);
  const foodList = currPartner?.profile.foodCategory.split(",")
  if (!toggle || !currPartner) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-[40%] p-8 items-center border-l-2 border-gray-300 gap-2">
      <img src={currPartner.profile.profileImg} alt="profile img" className="bg-gray-500 rounded-full w-16 h-16 border-primary border-2 p-1"/>
      <div className="flex gap-1 items-center">
        <h2 className="font-bold text-xl">{currPartner.profile.firstName} {currPartner.profile.lastName}</h2>
        <p className="text-md">{currPartner.profile.age}</p>
      </div>

      <button onClick={() => setShowProfile(true)}
        className="bg-accent rounded-lg p-2 text-white">View Full Profile</button>
      <div className="w-full border-t-2 my-4 border-gray-300"></div>

      <div className='py-3 px-6 gap-4 flex justify-center items-center bg-background-dark mx-4 my-2 rounded-full'>
        <input
          className="w-full bg-transparent border-none focus:ring-0 p-0"
          placeholder='Search'
        />
        <button>
          <MagnifyingGlassIcon className='h-5 w-5 hover:h-6 hover:w-6'/>
        </button>
      </div>

      {showProfile && <UserInfo user={currPartner} setShowProfile={setShowProfile} setUser={setUser}/>}





    </div>
  );
}

export default PartnerProfile;

