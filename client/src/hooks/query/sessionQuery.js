import { useMutation, useQuery } from '@tanstack/react-query';
import { login, logout, refresh } from '../../services/api/endpoints/Session';
import useAuthStore from '../../store/auth';

export function useLogin({
  onSuccess = () => {},
  onError = (err) => console.error(err),
}) {
  return useMutation({
    mutationFn: ({ email, password, rememberMe }) =>
      login({ email, password, rememberMe }),
    onError,
    onSuccess,
  });
}

export function useLogout({
  onSuccess = () => {},
  onError = (err) => console.error(err),
}) {
  return useMutation({
    mutationFn: logout,
    onError,
    onSuccess,
  });
}

export function useRefreshToken({
  onSuccess = () => {},
  onError = (err) => console.error(err),
}) {
  const { auth } = useAuthStore();

  return useQuery({
    queryKey: ['refresh'],
    queryFn: refresh,
    onError,
    onSuccess,
    enabled: !auth?.accessToken,
  });
}
