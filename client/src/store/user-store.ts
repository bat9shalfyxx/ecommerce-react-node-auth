import { create } from 'zustand';

export const useAppStore = create((set) => ({
    user: {},
    isAuth: false,

    setUser: async () => {},
    setIsAuth: async () => {},
}));
