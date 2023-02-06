import { create } from 'zustand';
import jwtDecode from 'jwt-decode';
import authClient from '../services/api/authClient';

const useAuthStore = create((set) => ({
  auth: null,
  refresh: async () => {
    const { accessToken } = (await authClient.get('/sessions/refresh')).data;
    const { userId, role } = jwtDecode(accessToken);

    set((state) => ({
      auth: {
        ...state.auth,
        accessToken,
        userId,
        role,
      },
    }));

    return accessToken;
  },
  login: async ({ email, password, rememberMe }) => {
    const { accessToken } = (
      await authClient.post('/sessions/login', {
        email,
        password,
        rememberMe,
      })
    ).data;
    const { userId, role } = jwtDecode(accessToken);

    set({ auth: { accessToken, userId, role } });
  },
  logout: async (afterLogout = () => {}) => {
    await authClient.post('/sessions/logout');

    afterLogout();

    set({ auth: {} });
  },
}));

export default useAuthStore;
