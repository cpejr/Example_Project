import { Outlet } from 'react-router-dom';
import { useRefreshToken } from '../../../hooks/query/sessionQuery';

function PersistLogin() {
  const { isLoading } = useRefreshToken();

  return isLoading ? <p>Loading...</p> : <Outlet />;
}

export default PersistLogin;
