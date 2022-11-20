import axios from 'axios';

const api = axios.create({
  baseURL: 'https://poc-enviar-arquivos.onrender.com/',
  // baseURL: 'http://localhost:3333',
});

export default api;
