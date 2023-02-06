import UserModel from '../models/UsersModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import { createUserValidator } from '../validators/UsersValidator.js';

export const create = asyncHandler(async (req, res, next) => {
  const { confirmPassword, ...newUser } = createUserValidator.parse(req);

  await UserModel.create(newUser);

  res.status(201).json({ success: `New user ${newUser} created!` });
});
