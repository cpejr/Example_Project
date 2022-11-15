import 'dotenv/config';
import { GetBucketCorsCommand } from '@aws-sdk/client-s3';
import storageS3Client from '../storageS3Client.js';

const bucketParams = { Bucket: process.env.AWS_BUCKET_NAME };

const run = async () => {
  try {
    const data = await storageS3Client.send(
      new GetBucketCorsCommand(bucketParams)
    );
    console.log('Success', data.CORSRules);
    return data; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
};

run();
