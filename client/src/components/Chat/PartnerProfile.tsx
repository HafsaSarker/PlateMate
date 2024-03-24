import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { ChatContextType } from "../../types/chatContextType";

interface PartnerProfileProps {
  toggle: boolean;
}

const PartnerProfile: React.FC<PartnerProfileProps> = ({ toggle }) => {
  const {currPartner} = useContext(ChatContext) as ChatContextType;
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

      <p>From {currPartner.profile.nationality}</p>
      {foodList?.map((food, index) => (
        <div className="rounded-lg border-accent border px-1" key={index}>{food}</div>
      ))}
      <div className="w-full border-t-2 my-4 border-gray-300"></div>
      <p>{currPartner.profile.about}</p>
      <div className="w-full border-t-2 my-4 border-gray-300"></div>
      <input type="text" placeholder="Search "/>



    </div>
  );
}

export default PartnerProfile;

