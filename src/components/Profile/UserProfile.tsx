import React from 'react';
import { User, CreditCard, MapPin, History } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { PaymentMethods } from './PaymentMethods';
import { SavedLocations } from './SavedLocations';
import { RideHistory } from './RideHistory';

export function UserProfile() {
  const user = useUserStore((state) => state.user);
  const updateProfile = useUserStore((state) => state.updateProfile);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-gray-400" />
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.phone && <p className="text-gray-600">{user.phone}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <CreditCard className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Payment Methods</h3>
            </div>
            <PaymentMethods />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Saved Places</h3>
            </div>
            <SavedLocations />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <History className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Recent Rides</h3>
            </div>
            <RideHistory />
          </div>
        </div>
      </div>
    </div>
  );
}