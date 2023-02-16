import ForbiddenError from '../errors/ForbiddenError/ForbiddenError.js';

const verifyAdmin = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) throw new ForbiddenError('Access denied');

    const isAllowed = req.roles.some((role) => allowedRoles.includes(role));
    if (!isAllowed) throw new ForbiddenError('Access denied');

    next();
  };
};

export default verifyAdmin;
