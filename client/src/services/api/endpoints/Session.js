import axios from 'axios';
import useAuthStore from '../../../store/auth';

// Necessário para impedir cycling de importações
const BASE_URL = `${import.meta.env.VITE_APP_URL}/api`;
const sessionApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function login({ email, password, rememberMe }) {
  const { setAuth } = useAuthStore.getState();
  const { data } = await sessionApi.post('/login', {
    email,
    password,
    rememberMe,
  });

  setAuth(data.accessToken);
  localStorage.setItem('isLoggedIn', 'true');

  return data;
}

export async function logout() {
  const { clearAuth } = useAuthStore.getState();
  await sessionApi.post('/logout');

  clearAuth();
  localStorage.removeItem('isLoggedIn');
}

export async function refresh() {
  const { setAuth } = useAuthStore.getState();
  const { data } = await sessionApi.get('/refresh');

  setAuth(data.accessToken);

  return data;
}
