import { S3Client } from '@aws-sdk/client-s3';

const storageS3Client = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACESS_KEY,
  },
});

export default storageS3Client;
