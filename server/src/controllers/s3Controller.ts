import { Request, Response } from 'express';
import AWS from 'aws-sdk';

// Make sure AWS was configured somewhere previously, like in your main server file
const s3 = new AWS.S3();

// Function to generate a pre-signed URL
export const generatePresignedUrl = (req: Request, res:Response) => {
  const params = {
    Bucket: 'YOUR_BUCKET_NAME',
    Key: `uploads/${Date.now()}_${req.query.fileName}`,
    Expires: 60, // URL expiration time
    ContentType: 'image/jpeg', // Adjust based on actual content type or parameterize
  };

  s3.getSignedUrl('putObject', params, (err, url) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Could not generate a pre-signed URL');
    }
    res.json({ url });
  });
};
