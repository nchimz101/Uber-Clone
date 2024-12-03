import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RideState {
  selectedRideId: string | null;
  setSelectedRide: (id: string | null) => void;
}

export const useRideStore = create<RideState>()(
  persist(
    (set) => ({
      selectedRideId: null,
      setSelectedRide: (id) => set({ selectedRideId: id }),
    }),
    {
      name: 'ride-store',
    }
  )
);