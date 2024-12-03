import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location } from '../types';

interface LocationState {
  pickup: Location | null;
  destination: Location | null;
  setPickup: (location: Location | null) => void;
  setDestination: (location: Location | null) => void;
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      pickup: null,
      destination: null,
      setPickup: (location) => set({ pickup: location }),
      setDestination: (location) => set({ destination: location }),
    }),
    {
      name: 'location-store',
    }
  )
);