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
import { VscSettings } from 'react-icons/vsc';
import Filter from '../components/filter/Filter';
import { PreferenceContext } from '../context/PreferenceContext';
import { PreferenceContextType } from '../types/PreferenceContextType';
import { preference_api_path } from '../api/preference';

const Home = () => {
  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant | null>(
    null,
  );

  const { currUser } = useContext(UserContext) as UserContextType;
  // user preferences to further filter matches
  const { preferences, setPreferences } = useContext(
    PreferenceContext,
  ) as PreferenceContextType;

  const [users, setUsers] = useState<User[] | null>(null);
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

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

  // load similar users everytime clicked restaurant and preferences change
  useEffect(() => {
    async function fetchSimilarUsers() {
      try {
        const res = await axios.get(user_api_path, {
          withCredentials: true,
        });

        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
      console.log(preferences);
    }
    fetchSimilarUsers();
  }, [clickedRestaurant, preferences]);

  return (
    <div className="h-full w-full flex items-center pb-11 justify-between overflow-hidden ">
      <div className="w-8/12 h-full pb-11 px-11 ">
        <RestaurantMap setClickedRestaurant={setClickedRestaurant} />
      </div>

      {clickedRestaurant && users ? (
        <section className="flex flex-col items-start h-full pt-11 justify-start w-[500px] max-w-[600px]">
          <SelectedRestaurant clickedRestaurant={clickedRestaurant} />

          <div className="flex w-full items-center justify-center gap-1 mt-5 pb-3 font-semibold text-gray-800">
            <h1>Users With Similar Preferences</h1>
            <span
              className="p-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 cursor-pointer"
              onClick={() => setShowFilters(true)}
            >
              <VscSettings />
            </span>
          </div>

          {showFilters && <Filter setShowFilters={setShowFilters} />}

          <MatchedUsers
            users={users}
            setShowProfile={setShowProfile}
            setUser={setUser}
          />
        </section>
      ) : (
        <div className="flex flex-col items-center h-full py-11 px-11 justify-center w-fit">
          <h2 className="text-center">
            Click on a restaurant to view details, {currUser?.profile.firstName}
          </h2>
          <img src="interaction.png" width={50} />
        </div>
      )}

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
  );
};

export default Home;
