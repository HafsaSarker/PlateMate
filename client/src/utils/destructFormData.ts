import { FormData } from '../types/formData';
export function destructFormData(data: FormData) {
  const {
    firstName,
    lastName,
    email,
    password,
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
  } = data;

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
