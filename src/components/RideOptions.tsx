import React from 'react';
import { useLocationStore } from '../store/locationStore';
import { useRideStore } from '../store/rideStore';
import { RideCard } from './RideOptions/RideCard';
import { calculateDistance, calculatePrice, estimateTime } from '../utils/price';
import toast from 'react-hot-toast';

const rideOptions = [
  {
    id: '1',
    name: 'UberX',
    description: 'Affordable, everyday rides',
    multiplier: 1,
    image: 'https://i.imgur.com/k5TqzLE.png'
  },
  {
    id: '2',
    name: 'UberXL',
    description: 'Affordable rides for groups up to 6',
    multiplier: 1.5,
    image: 'https://i.imgur.com/k5TqzLE.png'
  },
  {
    id: '3',
    name: 'UberBlack',
    description: 'Premium rides in luxury cars',
    multiplier: 2.0,
    image: 'https://i.imgur.com/k5TqzLE.png'
  }
];

export function RideOptions() {
  const { pickup, destination } = useLocationStore();
  const { selectedRideId, setSelectedRide } = useRideStore();

  if (!pickup || !destination) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-4">
        <h3 className="text-xl font-semibold mb-4">Choose pickup & destination</h3>
        <p className="text-gray-500">Enter your pickup and destination locations to see available rides.</p>
      </div>
    );
  }

  const distance = calculateDistance(pickup, destination);

  const handleBooking = () => {
    const selectedRide = rideOptions.find(opt => opt.id === selectedRideId);
    if (selectedRide) {
      toast.success(`${selectedRide.name} booked successfully!`);
      setSelectedRide(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-4">
      <h3 className="text-xl font-semibold mb-4">Choose a ride</h3>
      <div className="space-y-4">
        {rideOptions.map((option) => {
          const price = calculatePrice(distance, option.multiplier);
          const duration = estimateTime(distance);
          
          return (
            <RideCard
              key={option.id}
              option={option}
              price={price}
              duration={duration}
              isSelected={selectedRideId === option.id}
              onSelect={() => setSelectedRide(option.id)}
            />
          );
        })}
      </div>
      {selectedRideId && (
        <button
          className="w-full mt-6 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          onClick={handleBooking}
        >
          Confirm {rideOptions.find(opt => opt.id === selectedRideId)?.name}
        </button>
      )}
    </div>
  );
}