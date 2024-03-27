import axios from 'axios';
import { preference_api_path } from '../api/preference';

export const initPreferences = async (uid: string) => {
  const res = await axios.post(preference_api_path, uid, {
    withCredentials: true,
  });
};
