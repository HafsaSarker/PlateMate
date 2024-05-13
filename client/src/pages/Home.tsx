import { useContext, useEffect, useState } from 'react';
import RestaurantMap from '../components/map/RestaurantMap';
import { Restaurant } from '../types/restaurant';
import SelectedRestaurant from '../components/map/SelectedRestaurant';
import MatchedUsers from '../components/home/MatchedUsers';
import { UserContext } from '../context/UserContext';
import { UserContextType } from '../types/userContextType';
import { User } from '../types/user';
import axios from 'axios';
import { user_api_path } from '../api/user';
import UserInfo from '../components/home/UserInfo';
import Filter from '../components/filter/Filter';
import { PreferenceContext } from '../context/PreferenceContext';
import { PreferenceContextType } from '../types/PreferenceContextType';
import { preference_api_path } from '../api/preference';
import { filterUsers } from '../utils/filterUsers';
import { FaAnglesDown } from 'react-icons/fa6';
import { IoInformationCircle } from 'react-icons/io5';
import { user_match_api_path } from '../api/match';
import { getRecommendedUsers } from '../utils/getRecommendedUsers';

const Home = () => {
  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant | null>(
    null,
  );

  const { currUser } = useContext(UserContext) as UserContextType;
  // user preferences to further filter matches
  const { preferences, setPreferences } = useContext(
    PreferenceContext,
  ) as PreferenceContextType;

  // users are non-ML matches
  const [users, setUsers] = useState<User[] | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showMatches, setShowMatches] = useState<boolean>(true);
  const [showRecommended, setShowRecommended] = useState<boolean>(true);
  // ML recommended users
  const [recommendedUsers, setRecommendedUsers] = useState<User[] | null>(null);

  useEffect(() => {
    // get user preferences
    async function getUserPrefs() {
      const userPrefs = await axios.get(
        `${preference_api_path}${currUser?._id}`,
        {
          withCredentials: true,
        },
      );

      setPreferences(userPrefs.data[0]);
    }
    getUserPrefs();
  }, []);

  // load similar users preferences change
  useEffect(() => {
    async function fetchUsers() {
      if (!preferences) {
        return;
      }

      try {
        // gets ML matched users
        let uids: string[] = [];
        let filteredRecomendedUsers: User[] = [];
        const res = await axios.get(user_match_api_path);
        if (res && res.data && currUser) {
          // Find the scale that includes the current user id
          const scales = Object.keys(res.data);
          const scaleWithCurrentUser = scales.find((scale) =>
            res.data[scale].includes(currUser._id),
          );

          if (scaleWithCurrentUser) {
            // uid of all ML recommended users
            uids = Object.values(res.data[scaleWithCurrentUser]);

            const allReccomendedUsers = await getRecommendedUsers(uids);

            // filter users based on preferences
            filteredRecomendedUsers = filterUsers(
              preferences,
              allReccomendedUsers,
            );

            setRecommendedUsers(filteredRecomendedUsers);
          }
        }

        // gets non-ML matched users
        const result = await axios.get(
          `${user_api_path}/matches/${currUser?._id}`,
          {
            withCredentials: true,
          },
        );

        // filter users based on preferences
        const filteredUsers = filterUsers(preferences, result.data);

        // exclude recommended users from non-ML matched users
        const uniqueUsers = filteredUsers.filter(
          (user) =>
            !filteredRecomendedUsers.some(
              (recommendedUser) => recommendedUser._id === user._id,
            ),
        );

        setUsers(uniqueUsers);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [preferences, currUser]);

  return (
    <div className="h-full w-full flex items-start justify-between overflow-hidden">
      <div className=" w-10/12 h-full pb-11 px-11 ">
        <RestaurantMap
          setClickedRestaurant={setClickedRestaurant}
          setShowFilters={setShowFilters}
          clickedRestaurant={clickedRestaurant}
        />
      </div>

      <div className="flex flex-col h-full w-8/12 overflow-y-auto overflow-x-hidden">
        {clickedRestaurant ? (
          <section className="flex flex-col items-start justify-start w-[500px] max-w-[600px] pt-6 pb-2">
            <SelectedRestaurant clickedRestaurant={clickedRestaurant} />
          </section>
        ) : (
          <section className="flex items-center justify-center w-[500px] max-w-[600px] pt-6 pb-2">
            <p className="text-sm flex items-center justify-center rounded-lg gap-1 bg-gray-100 hover:bg-gray-200 border py-1 px-2 cursor-pointer">
              <span className="text-xl text-orange-500">
                <IoInformationCircle />
              </span>
              No restaurants found, try a different search!
            </p>
          </section>
        )}

        {users && recommendedUsers && (
          <>
            <div className="flex flex-col w-[500px] max-w-[600px] h-full pt-5 pb-2 px-4">
              <div className="flex w-full items-center justify-center gap-1 pb-3 font-semibold text-gray-800">
                <h1>Recommended Users</h1>

                <span
                  className="p-1 rounded-md text-indigo-600 cursor-pointer"
                  onClick={() => setShowMatches((prev) => !prev)}
                >
                  <FaAnglesDown />
                </span>
              </div>

              {showMatches && (
                <section className="flex flex-col items-start w-full max-h-[250px]">
                  {/* PASS IN RECOMMENDED USERS HERE */}
                  <MatchedUsers
                    users={recommendedUsers}
                    setShowProfile={setShowProfile}
                    setUser={setUser}
                  />
                </section>
              )}

              <div className="flex w-full items-center justify-center gap-1 mt-5 pb-3 font-semibold text-gray-800">
                <h1>Users With Similar Preferences</h1>

                <span
                  className="p-1 rounded-md text-indigo-600 cursor-pointer"
                  onClick={() => setShowRecommended((prev) => !prev)}
                >
                  <FaAnglesDown />
                </span>
              </div>

              {showRecommended && (
                <section className="flex flex-col items-start w-full max-h-[250px]">
                  <MatchedUsers
                    users={users}
                    setShowProfile={setShowProfile}
                    setUser={setUser}
                  />
                </section>
              )}
            </div>
          </>
        )}

        {showFilters && <Filter setShowFilters={setShowFilters} />}

        {showProfile && (
          <div className="border block text-sm text-center">
            <UserInfo
              setShowProfile={setShowProfile}
              user={user}
              setUser={setUser}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
