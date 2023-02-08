import { useMutation, useQuery } from '@tanstack/react-query';
import * as UserApi from '../../services/api/endpoints/User';

export function UseCreateUser({
  onSuccess = () => {},
  onError = (err) => console.error(err),
}) {
  return useMutation({
    mutationFn: (inputs) => UserApi.create(inputs),
    onSuccess,
    onError,
  });
}

export function useGetUsers({
  onSuccess = () => {},
  onError = (err) => console.error(err),
}) {
  return useQuery({
    queryKey: ['users'],
    queryFn: (filters = {}) => UserApi.get(filters),
    onSuccess,
    onError,
  });
}
