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
    const { roomName } = req.query;

    const file = await FileModel.create({
      name: formatedName,
      size,
      key,
      url,
      roomName,
    });
    return res.status(200).json(file);
  } catch (err) {
    next(err);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const { roomName } = req.query;
    const filter = roomName ? { roomName } : {};
    const files = await FileModel.find(filter).exec();
    return res.status(200).json(files);
  } catch (err) {
    next(err);
  }
};

export const deleteAll = async (req, res, next) => {
  try {
    const { roomName } = req.query;
    const filter = roomName ? { roomName } : {};
    const files = await FileModel.deleteAll(filter);

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
