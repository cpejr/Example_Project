import axios from 'axios';
import useAuthStore2 from '../../../store/auth2';

// Necessário para impedir cycling de importações
const BASE_URL = `${import.meta.env.VITE_APP_URL}/api`;
const sessionApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function login({ email, password, rememberMe }) {
  const { setAuth } = useAuthStore2.getState();
  const { data } = await sessionApi.post('/login', {
    email,
    password,
    rememberMe,
  });

  setAuth(data.accessToken);

  return data;
}

export async function logout() {
  const { clearAuth } = useAuthStore2.getState();
  await sessionApi.post('/logout');

  clearAuth();
}

export async function refresh() {
  const { setAuth } = useAuthStore2.getState();
  const { data } = await sessionApi.post('/refresh');

  setAuth(data.accessToken);

  return data;
}
