import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';
import crypto from 'crypto';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const randomImageName = () => crypto.randomBytes(16).toString('hex');

async function generatePresignedUrl(imageName: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageName,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 600000 });
  return url;
}

async function uploadImage(req: Request, res: Response) {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: randomImageName(),
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);
    console.log(params.Key)
    await s3.send(command);

    const url = await generatePresignedUrl(params.Key);
    console.log('url:', url);
    res.send({ imageUrl: url });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const s3Controller = {
  uploadImage,
};