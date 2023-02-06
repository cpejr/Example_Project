import ROLES_LIST from '../config/rolesList.js';
import ForbiddenError from '../errors/ForbiddenError/ForbiddenError.js';

const verifyAdmin = () => {
  return (req, res, next) => {
    if (!req?.role) throw new ForbiddenError('Access denied');

    const isAllowed = req.role === ROLES_LIST.ADMIN;
    if (!isAllowed) throw new ForbiddenError('Access denied');

    next();
  };
};

export default verifyAdmin;
