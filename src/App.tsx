import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { LocationSearch } from './components/LocationSearch';
import { RideOptions } from './components/RideOptions';
import { MapComponent } from './components/Map/MapComponent';
import { LoginForm } from './components/Auth/LoginForm';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { isAuthenticated, initializeUser } = useAuthStore();

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  if (!isAuthenticated) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <LoginForm />
        <Toaster position="top-center" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-16 flex relative">
        <MapComponent />
        <div className="absolute left-4 top-4 z-10">
          <LocationSearch />
          <RideOptions />
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
}