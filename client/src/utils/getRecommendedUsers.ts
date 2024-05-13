import axios from 'axios';
import { User } from '../types/user';
import { user_api_path } from '../api/user';

export async function getRecommendedUsers(
  uids: string[],
): Promise<User[] | null> {
  const users: User[] = [];

  try {
    for (const uid of uids) {
      const res = await axios.get(`${user_api_path}/${uid}`, {
        withCredentials: true,
      });

      const user: User = res.data; // Assuming your API response is the user data

      users.push(user);
    }

    return users;
  } catch (error) {
    console.error('Error fetching recommended users:', error);
    return null;
  }
}
