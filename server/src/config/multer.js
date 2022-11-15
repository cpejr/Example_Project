import path from 'node:path';
import crtypto from 'node:crypto';
import multer from 'multer';
import multerS3 from 'multer-s3';
import storageS3Client from './storageS3Client.js';
import __dirname from '../utils/dirname.js';

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.resolve(__dirname, '../../temp/uploads')),
    filename: (req, file, cb) => {
      const bytesNumber = 16;
      crtypto.randomBytes(bytesNumber, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, file.key);
      });
    },
  }),

  s3: multerS3({
    s3: storageS3Client,
    bucket: process.env.AWS_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      const bytesNumber = 16;
      crtypto.randomBytes(bytesNumber, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
};

const numToMegaBytes = (num) => num * 1024 * 1024;
const fileSizeMB = 3;
const multerFileName = 'file';

const multerConfig = {
  dest: path.resolve(__dirname, '../../temp/uploads'), // default
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: numToMegaBytes(fileSizeMB), // 3 MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'imege/pjpeg',
      'image/png',
      'image/gif',
      'text/plain',
      'application/pdf',
      'audio/midi',
      'audio/mpeg',
      'audio/webm',
      'audio/ogg',
      'audio/wav',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};

export { multerConfig, multerFileName };
