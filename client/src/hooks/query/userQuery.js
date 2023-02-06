import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import httpClient from '../../services/api/httpClient';
import queryOptimisticUpdate from '../../utils/queryOptimisticUpdate';

export function UseCreateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: async (inputs) =>
      (await httpClient.post('/users', inputs)).data,
    ...queryOptimisticUpdate({ queryClient, key: ['users'] }),
    onSuccess: () =>
      navigate('/', { state: { from: location }, replace: true }),
  });
}

export function useGetUsers() {
  const navigate = useNavigate();
  const location = useLocation();

  return useQuery({
    queryKey: ['users'],
    queryFn: async (filters = {}) =>
      (await httpClient.get('/users', { params: filters })).data,
    onError: (err) => {
      console.error(err);
      navigate('/login', { state: { from: location }, replace: true });
    },
  });
}
