import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError/UnauthorizedError.js';

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const [scheme, token] = authHeader && authHeader.split(' ');

  if (!token) throw new UnauthorizedError('No token provided');
  if (!/^Bearer$/i.test(scheme))
    throw new UnauthorizedError('Token badformatted');

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  req.userId = decoded.userId;
  req.role = decoded.role;

  next();
};

export default verifyJWT;
