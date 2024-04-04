import { s3_api_path } from "../api/s3";

const getImageUrl = async (imageName: string) => {
  try {
    const response = await fetch(`${s3_api_path}/get_url/${imageName}`);
    const data = await response.json();
    console.log('data:', data)
    return data.url;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return '';
  }
}

export default getImageUrl;