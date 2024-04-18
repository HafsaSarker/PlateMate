import { FormData } from '../types/formData';
import uploadImage from './uploadImage';

export async function updateUserForm(data: FormData) {
  const {
    firstName,
    lastName,
    email,
    coverImg,
    about,
    nationality,
    sex,
    height_ft,
    height_in,
    age,
    smoke,
    drink,
    restaurantLocation,
    foodCategory,
    restaurantAttributes,
    pricePoint,
  } = data;

  let { profileImg } = data;

  profileImg = profileImg ? await uploadImage(profileImg) : '';

  const submitData = {
    email,
    profile: {
      firstName,
      lastName,
      profileImg,
      coverImg,
      about,
      nationality,
      sex,
      height_ft,
      height_in,
      age,
      smoke,
      drink,
      restaurantLocation,
      foodCategory,
      restaurantAttributes,
      pricePoint,
    },
  };

  return submitData;
}
