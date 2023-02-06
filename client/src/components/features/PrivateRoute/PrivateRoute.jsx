import { useLocation, Navigate, Outlet } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useAuthStore from '../../../store/auth';
import ROLES_LIST from '../../../utils/rolesList';

export default function PrivateRoute() {
  const { auth } = useAuthStore();
  const location = useLocation();

  const decoded = auth?.accessToken && jwtDecode(auth.accessToken);
  const role = decoded?.role || '';

  if (role === ROLES_LIST.ADMIN) return <Outlet />;
  if (auth?.accessToken)
    <Navigate to="/unauthorized" state={{ from: location }} replace />;

  return <Navigate to="/login" state={{ from: location }} replace />;
}
