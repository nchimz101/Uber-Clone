import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useLocationStore } from '../store/locationStore';
import { MAPBOX_CONFIG } from '../config/mapbox';

export function LocationSearch() {
  const pickupGeocoder = useRef<any>(null);
  const destinationGeocoder = useRef<any>(null);
  const { setPickup, setDestination } = useLocationStore();

  useEffect(() => {
    pickupGeocoder.current = new MapboxGeocoder({
      accessToken: MAPBOX_CONFIG.accessToken,
      placeholder: 'Enter pickup location',
      marker: false,
    });

    destinationGeocoder.current = new MapboxGeocoder({
      accessToken: MAPBOX_CONFIG.accessToken,
      placeholder: 'Enter destination',
      marker: false,
    });

    pickupGeocoder.current.on('result', (e: any) => {
      setPickup({
        id: e.result.id,
        name: e.result.text,
        address: e.result.place_name,
        coordinates: {
          lat: e.result.center[1],
          lng: e.result.center[0],
        },
      });
    });

    destinationGeocoder.current.on('result', (e: any) => {
      setDestination({
        id: e.result.id,
        name: e.result.text,
        address: e.result.place_name,
        coordinates: {
          lat: e.result.center[1],
          lng: e.result.center[0],
        },
      });
    });

    const pickupElement = document.getElementById('pickup-geocoder');
    const destinationElement = document.getElementById('destination-geocoder');

    if (pickupElement && destinationElement) {
      pickupElement.appendChild(pickupGeocoder.current.onAdd());
      destinationElement.appendChild(destinationGeocoder.current.onAdd());
    }

    return () => {
      pickupGeocoder.current?.onRemove();
      destinationGeocoder.current?.onRemove();
    };
  }, [setPickup, setDestination]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6">Where to?</h2>
      <div className="space-y-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
          <div id="pickup-geocoder" className="geocoder" />
        </div>
        <div className="relative">
          <Navigation className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
          <div id="destination-geocoder" className="geocoder" />
        </div>
      </div>
    </div>
  );
}