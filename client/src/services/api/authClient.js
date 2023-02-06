import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_APP_URL}/api`;

const authClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export default authClient;
