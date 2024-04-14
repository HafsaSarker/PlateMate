import { GrLocation } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';
import { User } from '../../types/user';
import { UserInfoProps } from '../../types/userInfoProps';

const UserInfo: React.FC<UserInfoProps> = ({
  setShowProfile,
  user,
  setUser,
}) => {
  const {
    about,
    age,
    firstName,
    lastName,
    height_ft,
    height_in,
    nationality,
    profileImg,
  } = { ...user?.profile } || ({} as User);

  function onClickActions() {
    setUser(null);
    setShowProfile(false);
  }
  return (
    <div
      id="default-modal"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black bg-opacity-20"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* <!-- Modal content --> */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* <!-- Modal close btn --> */}
          <div className="w-full flex items-end pr-2 pt-2">
            <button
              type="button"
              className="text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-md h-8 ms-auto inline-flex justify-center items-center w-8"
              onClick={onClickActions}
            >
              <IoMdClose />
            </button>
          </div>

          {/* <!-- Modal header --> */}
          <div className="flex flex-col items-center justify-between p-4 md:p-5 border-b rounded-t">
            <img
              src={profileImg ? profileImg : 'user.png'}
              alt="profile image"
              width={100}
              className="rounded-full mb-3"
            />
            <h3 className="text-xl font-semibold text-gray-900 ">
              {firstName} {lastName}
              {age && `, ${age}`}
            </h3>

            <div className="flex items-center gap-1 text-gray-600">
              <span className="font-semibold text-lg">
                <GrLocation />
              </span>

              <p>{nationality ? nationality : 'N/A'}</p>
            </div>
          </div>

          {/* <!-- Modal body --> */}
          <div className="p-4 md:p-5 flex items-start justify-center gap-10 w-full ">
            <div className="flex flex-col items-start text-start">
              <span className="text-gray-500 text-xs px-2">About me</span>
              <p className="leading-relaxed text-gray-500 border min-w-[250px] max-w-[300px] min-h-[250px] rounded-lg px-2 py-1">
                {about
                  ? about
                  : 'This user has not provided any description of themselves yet.'}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 justify-center w-fit">
              <div>
                <span className="text-gray-500 text-xs px-2">Height</span>
                <div className="flex items-center px-1 gap-1">
                  <p className=" leading-relaxed text-gray-500 ">
                    {height_ft ? `${height_ft} ft` : 'N/A'}
                  </p>
                  <p className=" leading-relaxed text-gray-500 ">
                    {height_in ? `${height_in} in` : ''}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-gray-500 text-xs px-2">Life Style</span>

                <p className=" leading-relaxed text-gray-500 w-full px-2 py-1">
                  {user?.profile.smoke && (
                    <span className="bg-gray-100 text-indigo-600 text-xs py-1 px-2 rounded-full m-1">
                      Smoke
                    </span>
                  )}
                  {user?.profile.drink && (
                    <span className="bg-gray-100 text-indigo-600 text-xs py-1 px-2 rounded-full m-1">
                      Drink
                    </span>
                  )}
                  {!user?.profile.smoke && !user?.profile.drink && 'N/A'}
                </p>
              </div>
            </div>
          </div>

          {/* <!-- Modal footer --> */}
          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b ">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Chat
            </button>
            <button
              onClick={onClickActions}
              className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-indigo-600 focus:z-10 focus:ring-4 focus:ring-gray-100"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
