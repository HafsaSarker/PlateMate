import { useEffect, useState } from "react";
import getImageUrl from "../../utils/getImageUrl";

interface ProfileImageProps {
  imageName: string | null | undefined;
}

const ProfileImage: React.FC<ProfileImageProps> = ({imageName}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!imageName) return;
    const fetchImageUrl = async () => {
      const url = await getImageUrl(imageName);
      setImageUrl(url);
    };

    fetchImageUrl();
  }, [imageName]);
  return (
    <>
    {
      imageName ? <img
        src={imageUrl}
        alt='profile'
        className="w-full h-full rounded-full object-cover"
      /> : <img
        src={"https://via.placeholder.com/50"}
        alt='profile'
        className="w-full h-full rounded-full object-cover"
      />
    }
    </>
  );
}

export default ProfileImage;