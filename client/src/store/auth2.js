import { create } from 'zustand';
import jwtDecode from 'jwt-decode';

const useAuthStore2 = create((set) => ({
  auth: {},
  setAuth: (accessToken) => {
    const { userId, roles } = jwtDecode(accessToken);

    set(({ oldAuth }) => ({
      auth: {
        ...oldAuth,
        accessToken,
        userId,
        roles,
      },
    }));
  },
  clearAuth: () => set({ auth: {} }),
}));

export default useAuthStore2;
