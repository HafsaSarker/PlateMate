import { s3_api_path } from '../api/s3';
import { FormData } from '../types/formData';
import getImageUrl from './getImageUrl';
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

  const profileImgName = profileImg ? await uploadImage(profileImg) : '';
  profileImg = await getImageUrl(profileImgName);


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
  console.log('submitData:', submitData);
  return submitData;
}
