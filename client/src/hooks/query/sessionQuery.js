import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/auth';

export function useLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  return useMutation({
    mutationFn: ({ email, password, rememberMe }) =>
      login({ email, password, rememberMe }),
    onError: (err) => console.error(err),
    onSuccess: () => navigate(from, { replace: true }),
  });
}

export function useLogout() {
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: (afterLogout) => logout(afterLogout),
    onError: (err) => console.error(err),
  });
}

export function useRefreshToken() {
  const { auth, refresh } = useAuthStore();

  return useQuery({
    queryKey: ['persist'],
    queryFn: refresh,
    onError: (err) => console.error(err),
    enabled: !auth?.accessToken,
  });
}
