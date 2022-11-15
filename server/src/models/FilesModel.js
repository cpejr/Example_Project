import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import fs from 'node:fs';
import path from 'node:path';
import { promisify } from 'node:util';
import storageS3Client from '../config/storageS3Client.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FileSchema = new mongoose.Schema(
  {
    roomName: String,
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
  },
  { timestamps: true }
);

FileSchema.pre('save', function () {
  if (!this.url) {
    this.url = `${process.env.URL}/files/${this.key}`;
  }
});

FileSchema.pre('remove', async function () {
  const storageType = process.env.STORAGE_TYPE;
  if (storageType === 's3') {
    const bucketParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: this.key };
    return storageS3Client.send(new DeleteObjectCommand(bucketParams));
  }

  const promisifiedUnlink = promisify(fs.unlink);
  const pathToFile = path.resolve(__dirname, `../../temp/uploads/${this.key}`);
  return promisifiedUnlink(pathToFile);
});

FileSchema.statics.deleteAll = async function (filter) {
  const files = await this.find(filter).exec();

  files.forEach(async ({ key }) => {
    const storageType = process.env.STORAGE_TYPE;
    if (storageType === 's3') {
      const bucketParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: key };
      await storageS3Client.send(new DeleteObjectCommand(bucketParams));
    } else {
      const promisifiedUnlink = promisify(fs.unlink);
      const pathToFile = path.resolve(__dirname, `../../temp/uploads/${key}`);
      await promisifiedUnlink(pathToFile);
    }
  });

  await this.deleteMany(filter).exec();
  return files;
};

const FileModel = mongoose.model('files', FileSchema);

export default FileModel;
