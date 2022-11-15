import axios from 'axios';

const api = axios.create({
  baseURL: 'https://poc-enviar-arquivos.onrender.com/',
});

export default api;
