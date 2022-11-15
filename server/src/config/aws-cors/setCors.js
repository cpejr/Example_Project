import 'dotenv/config';
// Import required AWS-SDK clients and commands for Node.js.
import { PutBucketCorsCommand } from '@aws-sdk/client-s3';
import storageS3Client from '../storageS3Client.js';

// Set parameters.
// Create initial parameters JSON for putBucketCors.
const thisConfig = {
  AllowedHeaders: ['Authorization', 'Content-Type'],
  AllowedMethods: ['POST', 'GET'],
  AllowedOrigins: ['*'],
  ExposeHeaders: [],
  MaxAgeSeconds: 3000,
};

// Create an array of configs then add the config object to it.
const corsRules = new Array(thisConfig);

// Create CORS parameters.
export const corsParams = {
  Bucket: process.env.AWS_BUCKET_NAME,
  CORSConfiguration: { CORSRules: corsRules },
};
export async function run() {
  try {
    const data = await storageS3Client.send(
      new PutBucketCorsCommand(corsParams)
    );
    console.log('Success', data);
    return data; // For unit tests.
  } catch (err) {
    console.log('Error', err);
  }
}
run();
