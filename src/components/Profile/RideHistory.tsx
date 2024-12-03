import React from 'react';
import { format } from 'date-fns';
import { MapPin, Navigation, Star } from 'lucide-react';
import { useRideHistoryStore } from '../../store/rideHistoryStore';

export function RideHistory() {
  const rides = useRideHistoryStore((state) => state.rides);

  return (
    <div className="space-y-4">
      {rides.map((ride) => (
        <div key={ride.id} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-sm font-medium">
                {format(new Date(ride.date), 'MMM d, yyyy')}
              </span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-sm text-gray-600">{ride.type}</span>
            </div>
            <span className="font-medium">${ride.price.toFixed(2)}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{ride.pickup.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Navigation className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{ride.destination.address}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm">{ride.driverName}</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm ml-1">{ride.driverRating}</span>
              </div>
            </div>
            <span className="text-sm text-gray-500">
              {ride.duration} min • {ride.distance.toFixed(1)} km
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}