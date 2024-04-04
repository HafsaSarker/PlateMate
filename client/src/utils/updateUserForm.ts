import { s3_api_path } from '../api/s3';


async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('image', file);
  const response = await fetch(s3_api_path, {
    method: 'POST',
    body: formData, // Send formData instead of raw file
  });
  const data = await response.json();
  console.log('data:', data);
  console.log('data.imageName:', data.imageName);
  return data.imageName;
}

export async function updateUserForm(data: FormData) {
  const {
    firstName,
    lastName,
    email,
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

  const profileImgName = profileImg ? await uploadImage(profileImg) : '';

  const submitData = {
    email,
    profile: {
      firstName,
      lastName,
      profileImgName,
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
