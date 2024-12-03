import React from 'react';
import { Home, Briefcase } from 'lucide-react';
import { useUserStore } from '../../store/userStore';

export function SavedLocations() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="space-y-3">
      <div className="p-3 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <Home className="w-5 h-5" />
          <div>
            <p className="font-medium">Home</p>
            <p className="text-sm text-gray-500">
              {user.homeAddress?.address || 'Add home address'}
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 border border-gray-200 rounded-lg">
        <div className="flex items-center space-x-3">
          <Briefcase className="w-5 h-5" />
          <div>
            <p className="font-medium">Work</p>
            <p className="text-sm text-gray-500">
              {user.workAddress?.address || 'Add work address'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}