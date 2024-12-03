import React from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, Users } from 'lucide-react';
import { RideOption } from '../../types';

interface RideCardProps {
  option: RideOption;
  price: number;
  duration: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function RideCard({ option, price, duration, isSelected, onSelect }: RideCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
        isSelected 
          ? 'border-black bg-gray-50 shadow-md' 
          : 'border-gray-200 hover:border-black'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Car className="h-10 w-10" />
          {option.name === 'UberXL' && (
            <Users className="h-4 w-4 absolute -top-1 -right-1 text-gray-600" />
          )}
        </div>
        <div>
          <h4 className="font-medium">{option.name}</h4>
          <p className="text-sm text-gray-500">{option.description}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Clock className="h-4 w-4 text-gray-400" />
            <p className="text-xs text-gray-400">{duration} min</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className="font-semibold">${price.toFixed(2)}</span>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-green-600 mt-1"
          >
            Best choice
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}