import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initializeUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Simulate API call
        const mockUser = {
          id: '1',
          email,
          name: 'John Doe',
          phone: '+1 234 567 8900',
          paymentMethods: [
            {
              id: '1',
              type: 'card' as const,
              last4: '4242',
              expiryDate: '12/24',
              default: true,
            },
          ],
        };
        set({ user: mockUser, isAuthenticated: true });
        localStorage.setItem('user', JSON.stringify(mockUser));
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
        localStorage.removeItem('user');
      },
      initializeUser: () => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          set({ user: JSON.parse(savedUser), isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
);