import logger from '../config/logger.js';
import { ZodError } from 'zod';
import {
  AppError,
  BadRequest,
  JwtExpiredError,
  JwtInvalidError,
  ConflictError,
  InternalServerError,
} from '../errors/BaseErrors.js';

const errorHandler = (err, req, res, next) => {
  let error;

  if (err instanceof AppError) {
    error = err;
  } else if (err instanceof ZodError) {
    const message = err.errors.map(({ message }) => message).join('; ');
    error = new BadRequest(`Request validation error(s): ${message}`);
  } else if (err.name === 'ValidationError') {
    const fields = Object.keys(err.errors);
    const message = fields.map((field) => err.errors[field].message).join('; ');
    error = new BadRequest(`DB validation error(s): ${message}`);
  } else if (err?.code === 11000) {
    error = new ConflictError('Email or CPF already exists');
  } else if (err?.name === 'JsonWebTokenError') {
    error = new JwtInvalidError();
  } else if (err?.name === 'TokenExpiredError') {
    error = new JwtExpiredError();
  } else {
    error = new InternalServerError(err?.message);
  }

  logger.error(
    'Error message from the centralized error-handling component',
    error
  );

  const isDevEnvironment =
    process.env.NODE_ENV === 'development'
      ? {
          stack: error.stack,
        }
      : {};
  res.status(error.httpCode).json({
    name: error.name,
    httpCode: error.httpCode,
    message: error.message,
    isOperational: error.isOperational,
    ...isDevEnvironment,
  });
};

export default errorHandler;
