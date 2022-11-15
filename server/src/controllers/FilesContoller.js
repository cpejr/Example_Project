import { multerFileName } from '../config/multer.js';
import FileModel from '../models/FilesModel.js';

export const create = async (req, res, next) => {
  try {
    const {
      originalname: name,
      size,
      key,
      location: url = '',
    } = req[multerFileName];

    const formatedName = Buffer.from(name, 'latin1').toString('utf8');

    const file = await FileModel.create({ name: formatedName, size, key, url });
    return res.status(200).json(file);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const files = await FileModel.find({}).exec();
    return res.status(200).json(files);
  } catch (err) {
    next(err);
  }
};

export const deleteAll = async (req, res, next) => {
  try {
    const files = await FileModel.deleteAll();

    return res.status(200).json(files);
  } catch (err) {
    next(err);
  }
};

export const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const file = await FileModel.findById(id).exec();
    await file.remove();

    return res.status(200).json(file);
  } catch (err) {
    next(err);
  }
};
