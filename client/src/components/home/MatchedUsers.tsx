import { MatchedUsersProp } from '../../types/matchedUsersProp';
import { Link } from 'react-router-dom';
import { IoIosChatbubbles } from 'react-icons/io';
import { User } from '../../types/user';
import { useEffect, useState } from 'react';
import getImageUrl from '../../utils/getImageUrl';
import WarningToast from '../toast/WarningToast';

const MatchedUsers: React.FC<MatchedUsersProp> = ({
  users,
  setShowProfile,
  setUser,
}) => {
  const [userImageUrls, setUserImageUrls] = useState<Record<string, string>>(
    {},
  );
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    if (!users?.length) {
      setShowToast(true);
    }
  }, [users]);

  useEffect(() => {
    if (!users) return;
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        users.map(async (user) => {
          const url = await getImageUrl(user.profile.profileImg);
          return { userId: user._id, url };
        }),
      );

      const newImageUrls = urls.reduce(
        (acc, current) => {
          acc[current.userId] = current.url;
          return acc;
        },
        {} as Record<string, string>,
      );

      setUserImageUrls(newImageUrls);
    };

    fetchImageUrls();
  }, [users]);

  function onClickActions(user: User) {
    setUser(user);
    setShowProfile(true);
  }

  return (
    <div className="flex flex-col items-start w-full py-2 px-2 overflow-auto">
      {/* map over all users */}
      {users && users.length ? (
        <div className="flex flex-col w-full gap-3 hover:cursor-pointer">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => onClickActions(user)}
              className="flex items-center h-full w-full py-3 px-2 gap-3 rounded-lg bg-gray-100 hover:bg-gray-200 border justify-between"
            >
              <div className="flex items-center gap-2">
                {user.profile.profileImg ? (
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={userImageUrls[user._id]}
                  />
                ) : (
                  <img className="w-10" src="user.png" />
                )}

                <div className="flex flex-col">
                  <p className="text-sm">
                    {user.profile.firstName} {user.profile.lastName}
                  </p>

                  <p className="text-xs">{user.profile.age}</p>
                </div>
              </div>

              <Link
                to="/chat"
                state={{
                  user: user,
                }} // Passing user ID in state
                key={user._id}
              >
                <button className="px-3 text-xl hover:text-pink-600 text-pink-500">
                  <IoIosChatbubbles />
                </button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {showToast && (
            <WarningToast
              message="No users found. Please try adjusting your filters."
              setShowToast={setShowToast}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MatchedUsers;
