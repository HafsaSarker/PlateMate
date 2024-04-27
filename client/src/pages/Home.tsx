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
  const [recommendedUsers, setRecommendedUsers] = useState<User | null>(null);

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
    // gets non-ML matched users
    async function fetchSimilarUsers() {
      if (!preferences) {
        return;
      }

      try {
        const res = await axios.get(
          `${user_api_path}/matches/${currUser?._id}`,
          {
            withCredentials: true,
          },
        );

        // filter users based on preferences
        const filteredUsers = filterUsers(preferences, res.data);

        setUsers(filteredUsers);
      } catch (error) {
        console.error(error);
      }
    }

    // gets ML matched users here
    async function fetchRecommendedUsers() {
      console.log('function still in progress');
      // get someUsers
      // filer someUsers based on preferences
      // setRecommendedUsers(someUsers)
    }

    fetchSimilarUsers();
  }, [preferences, currUser]);

  return (
    <div className="h-full w-full flex items-start justify-between overflow-hidden">
      <div className=" w-10/12 h-full pb-11 px-11 ">
        <RestaurantMap
          setClickedRestaurant={setClickedRestaurant}
          setShowFilters={setShowFilters}
        />
      </div>

      <div className="flex flex-col h-full w-8/12 overflow-y-auto overflow-x-hidden">
        {clickedRestaurant && (
          <section className="flex flex-col items-start justify-start w-[500px] max-w-[600px] pt-6 pb-2">
            <SelectedRestaurant clickedRestaurant={clickedRestaurant} />
          </section>
        )}

        {users && (
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
                <section className="flex flex-col items-start w-full max-h-[300px]">
                  {/* PASS IN RECOMMENDED USERS HERE */}
                  <MatchedUsers
                    users={users}
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
                <section className="flex flex-col items-start w-full max-h-[300px]">
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
