import { s3_api_path } from "../api/s3";

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

export default uploadImage;