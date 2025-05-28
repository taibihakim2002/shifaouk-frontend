import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user }), // فقط نحفظ user

        }
    )
);

export default useAuthStore;
