import { create } from 'zustand';
import jwtDecode from 'jwt-decode';
import authClient from '../services/api/authClient';

const useAuthStore = create((set) => ({
  auth: null,
  refresh: async () => {
    const { accessToken } = (await authClient.get('/refresh')).data;
    const { userId, roles } = jwtDecode(accessToken);

    set((state) => ({
      auth: {
        ...state.auth,
        accessToken,
        userId,
        roles,
      },
    }));

    return accessToken;
  },
  login: async ({ email, password, rememberMe }) => {
    const { accessToken } = (
      await authClient.post('/login', {
        email,
        password,
        rememberMe,
      })
    ).data;
    const { userId, roles } = jwtDecode(accessToken);

    set({ auth: { accessToken, userId, roles } });
  },
  logout: async (afterLogout = () => {}) => {
    await authClient.post('/logout');

    afterLogout();

    set({ auth: {} });
  },
}));

export default useAuthStore;
