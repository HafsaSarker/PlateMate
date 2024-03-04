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

const Home = () => {
  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant | null>(
    null,
  );
  const [users, setUsers] = useState<User[] | null>(null);
  const { currUser } = useContext(UserContext) as UserContextType;

  // load similar users everytime clicked restaurant changes
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
    }
    fetchSimilarUsers();
  }, [clickedRestaurant]);

  return (
    <div className="h-full w-full flex items-center pb-11 justify-between overflow-hidden ">
      <div className="w-8/12 h-full pb-11 px-11 ">
        <RestaurantMap setClickedRestaurant={setClickedRestaurant} />
      </div>

      {clickedRestaurant && users ? (
        <section className="flex flex-col items-start h-full pt-11 justify-start w-[500px] max-w-[600px]">
          <SelectedRestaurant clickedRestaurant={clickedRestaurant} />

          <MatchedUsers users={users} />
        </section>
      ) : (
        <div className="flex flex-col items-center h-full py-11 px-11 justify-center w-fit">
          <h2 className="text-center">
            Click on a restaurant to view details, {currUser?.profile.firstName}
          </h2>
          <img src="interaction.png" width={50} />
        </div>
      )}
    </div>
  );
};

export default Home;
