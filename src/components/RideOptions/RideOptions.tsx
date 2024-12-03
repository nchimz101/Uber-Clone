import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocationStore } from '../../store/locationStore';
import { useRideStore } from '../../store/rideStore';
import { useRideHistoryStore } from '../../store/rideHistoryStore';
import { RideCard } from './RideCard';
import { calculateDistance, calculatePrice, estimateTime } from '../../utils/price';
import toast from 'react-hot-toast';
import { MapPin, Navigation, Clock } from 'lucide-react';

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
  const addRide = useRideHistoryStore((state) => state.addRide);
  const [isBooking, setIsBooking] = useState(false);

  if (!pickup || !destination) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-4"
      >
        <h3 className="text-xl font-semibold mb-4">Choose pickup & destination</h3>
        <div className="space-y-4 text-gray-500">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <p>Enter your pickup location</p>
          </div>
          <div className="flex items-center space-x-3">
            <Navigation className="h-5 w-5 text-gray-400" />
            <p>Enter your destination</p>
          </div>
        </div>
      </motion.div>
    );
  }

  const distance = calculateDistance(pickup, destination);

  const handleBooking = async () => {
    const selectedRide = rideOptions.find(opt => opt.id === selectedRideId);
    if (selectedRide) {
      setIsBooking(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const ride = {
          id: Math.random().toString(36).substr(2, 9),
          type: selectedRide.name,
          price: calculatePrice(distance, selectedRide.multiplier),
          duration: estimateTime(distance),
          distance,
          pickup,
          destination,
          status: 'ongoing',
          date: new Date().toISOString(),
          driverName: 'John Driver',
          driverRating: 4.8
        };
        
        addRide(ride);
        toast.success(`Your ${selectedRide.name} is on the way!`);
        setSelectedRide(null);
      } catch (error) {
        toast.error('Something went wrong. Please try again.');
      } finally {
        setIsBooking(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mt-4"
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Trip details</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <p className="text-sm">{pickup.address}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Navigation className="h-5 w-5 text-gray-400" />
            <p className="text-sm">{destination.address}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-400" />
            <p className="text-sm">{estimateTime(distance)} min • {distance.toFixed(1)} km</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Choose a ride</h3>
      <div className="space-y-4">
        <AnimatePresence>
          {rideOptions.map((option) => {
            const price = calculatePrice(distance, option.multiplier);
            const duration = estimateTime(distance);
            
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <RideCard
                  option={option}
                  price={price}
                  duration={duration}
                  isSelected={selectedRideId === option.id}
                  onSelect={() => setSelectedRide(option.id)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {selectedRideId && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`w-full mt-6 bg-black text-white py-3 px-4 rounded-lg transition-colors ${
            isBooking ? 'opacity-75 cursor-not-allowed' : 'hover:bg-gray-800'
          }`}
          onClick={handleBooking}
          disabled={isBooking}
        >
          {isBooking ? 'Booking...' : `Confirm ${rideOptions.find(opt => opt.id === selectedRideId)?.name}`}
        </motion.button>
      )}
    </motion.div>
  );
}