import { create } from 'zustand';
import { User, PaymentMethod, Location } from '../types';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  setHomeAddress: (location: Location) => void;
  setWorkAddress: (location: Location) => void;
  updateProfile: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  addPaymentMethod: (method) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            paymentMethods: [...state.user.paymentMethods, method],
          }
        : null,
    })),
  removePaymentMethod: (id) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            paymentMethods: state.user.paymentMethods.filter((m) => m.id !== id),
          }
        : null,
    })),
  setDefaultPaymentMethod: (id) =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            paymentMethods: state.user.paymentMethods.map((m) => ({
              ...m,
              default: m.id === id,
            })),
          }
        : null,
    })),
  setHomeAddress: (location) =>
    set((state) => ({
      user: state.user ? { ...state.user, homeAddress: location } : null,
    })),
  setWorkAddress: (location) =>
    set((state) => ({
      user: state.user ? { ...state.user, workAddress: location } : null,
    })),
  updateProfile: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));