import axios from 'axios';
import useAuthStore from '../../store/auth';
import { refresh } from './endpoints/Session';

const BASE_URL = `${import.meta.env.VITE_APP_URL}/api`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const { auth } = useAuthStore.getState();
    if (!config.headers.Authorization && auth?.accessToken) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    const isForbiddenError =
      error?.response?.data?.httpCode === 403 &&
      error?.response?.data?.name === 'Forbidden';

    // Se não for forbidden ou se a requisição já foi reenviada
    if (!isForbiddenError || prevRequest?.sent) return Promise.reject(error);
    console.log('UEEEEEE');
    const newAccessToken = await refresh();

    prevRequest.sent = true;
    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return api(prevRequest);
  }
);

export default api;
