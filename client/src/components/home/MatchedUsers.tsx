import { MatchedUsersProp } from '../../types/matchedUsersProp';
import { Link } from 'react-router-dom';

const MatchedUsers: React.FC<MatchedUsersProp> = ({ users }) => {
  return (
    <div className="flex flex-col items-start w-full mt-5 py-2 px-2 mx-4 overflow-auto">
      <h1 className="font-semibold text-center w-full pb-3 text-gray-800 tracking-wide">
        Users With Similar Preferences
      </h1>

      {/* map over all users */}
      <div className="flex flex-col w-full gap-3 pr-8">
        {users.map((user) => (
          <Link to="">
            <div className="flex items-center h-full w-full py-3 px-2 gap-3 rounded-lg bg-gray-100 hover:bg-gray-200">
              {user.profile.profileImg ? (
                <img className="w-10" src={user.profile.profileImg} />
              ) : (
                <img className="w-10" src="user.png" />
              )}

              <div className="flex flex-col">
                <p className="text-sm">
                  {user.profile.firstName} {user.profile.lastName}
                </p>

                <p className="text-xs">{user.profile.age}</p>
              </div>
              <Link
                to='/chat'
                state= {{ userId: user._id, username: user.profile.firstName + " " + user.profile.lastName }} // Passing user ID in state
                key={user._id}
              >
                <button className=''>Chat</button>
              </Link>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MatchedUsers;
