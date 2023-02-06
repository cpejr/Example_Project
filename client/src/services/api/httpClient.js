import axios from 'axios';
import useAuthStore from '../../store/auth';

const BASE_URL = `${import.meta.env.VITE_APP_URL}/api`;

const httpClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

httpClient.interceptors.request.use(
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

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    const isForbiddenError =
      error?.response?.data?.httpCode === 403 &&
      error?.response?.data?.name === 'Forbidden';

    // Se não for forbidden ou se a requisição já foi reenviada
    if (!isForbiddenError || prevRequest?.sent) return Promise.reject(error);

    const { refresh } = useAuthStore.getState();
    const newAccessToken = await refresh();

    prevRequest.sent = true;
    prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return httpClient(prevRequest);
  }
);

export default httpClient;
