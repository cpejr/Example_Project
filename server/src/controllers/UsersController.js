import UserModel from '../models/UserModel.js';
import asyncHandler from '../utils/asyncHandler.js';
import createUserValidator from '../validators/UserValidator.js';

export const create = asyncHandler(async (req, res, next) => {
  console.log(req);
  
  const { confirmPassword, ...newUser } = createUserValidator(req);
  console.log({ confirmPassword, ...newUser });
  await UserModel.create(newUser);

  res.status(201).json({ success: `New user ${newUser} created!` });
});
