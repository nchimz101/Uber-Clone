import React, { useState } from 'react';
import { Menu, User, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { UserProfile } from './Profile/UserProfile';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { logout } = useAuthStore();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-black text-white p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-gray-800 p-2 rounded-full transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <span className="text-2xl font-bold">Uber</span>
          </div>
          <div className="flex items-center space-x-6">
            <button className="hover:bg-gray-800 px-4 py-2 rounded-full transition-colors">
              Ride
            </button>
            <button className="hover:bg-gray-800 px-4 py-2 rounded-full transition-colors">
              Drive
            </button>
            <button className="hover:bg-gray-800 px-4 py-2 rounded-full transition-colors">
              More
            </button>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="hover:bg-gray-800 p-2 rounded-full transition-colors"
            >
              <User className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg z-50 p-6">
            <div className="space-y-4">
              <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg">
                Home
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg">
                Your Trips
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg">
                Help
              </button>
              <button className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg">
                Settings
              </button>
              <button
                onClick={logout}
                className="w-full text-left py-2 px-4 hover:bg-gray-100 rounded-lg text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg w-full max-w-4xl">
              <button
                onClick={() => setShowProfile(false)}
                className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <UserProfile />
            </div>
          </div>
        </div>
      )}
    </>
  );
}