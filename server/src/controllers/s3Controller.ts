import { Request, Response } from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function uploadImage(req: Request, res: Response) {
  try {
    console.log('req.body:', req.body);
    console.log('req.file:', req.file);

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };
    const command = new PutObjectCommand(params);

    await s3.send(command);

    res.send({});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const s3Controller = {
  uploadImage,
};