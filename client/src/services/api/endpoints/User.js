import api from '../api';

export async function get(filters) {
  const { data } = await api.get('/users', { params: filters });

  return data;
}

export async function create(inputs) {
  const { data } = await api.post('/users', inputs);

  return data;
}
