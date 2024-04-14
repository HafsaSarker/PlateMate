import { FormData } from '../types/formData';
import getImageUrl from './getImageUrl';
import uploadImage from './uploadImage';
export async function destructFormData(data: FormData) {
  const {
    firstName,
    lastName,
    email,
    password,
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
  // save the image name
  profileImg= profileImg ? await uploadImage(profileImg) : '';

  const submitData = {
    email,
    authentication: {
      password,
    },
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
