import { create } from 'zustand';
import { Ride } from '../types';

interface RideHistoryState {
  rides: Ride[];
  addRide: (ride: Ride) => void;
  updateRideStatus: (id: string, status: Ride['status']) => void;
  getRideById: (id: string) => Ride | undefined;
}

export const useRideHistoryStore = create<RideHistoryState>((set, get) => ({
  rides: [],
  addRide: (ride) => set((state) => ({ rides: [ride, ...state.rides] })),
  updateRideStatus: (id, status) =>
    set((state) => ({
      rides: state.rides.map((ride) =>
        ride.id === id ? { ...ride, status } : ride
      ),
    })),
  getRideById: (id) => get().rides.find((ride) => ride.id === id),
}));