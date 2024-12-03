import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useLocationStore } from '../../store/locationStore';
import { MAPBOX_CONFIG } from '../../config/mapbox';
import { RouteLayer } from './RouteLayer';

mapboxgl.accessToken = MAPBOX_CONFIG.accessToken;

export function MapComponent() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const { pickup, destination } = useLocationStore();

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX_CONFIG.style,
      center: MAPBOX_CONFIG.defaultCenter,
      zoom: MAPBOX_CONFIG.defaultZoom,
    });

    return () => {
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (pickup) {
      const pickupMarker = new mapboxgl.Marker({ color: '#00ff00' })
        .setLngLat([pickup.coordinates.lng, pickup.coordinates.lat])
        .addTo(map.current);
      markersRef.current.push(pickupMarker);
    }

    if (destination) {
      const destinationMarker = new mapboxgl.Marker({ color: '#ff0000' })
        .setLngLat([destination.coordinates.lng, destination.coordinates.lat])
        .addTo(map.current);
      markersRef.current.push(destinationMarker);
    }

    if (pickup && destination) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend([pickup.coordinates.lng, pickup.coordinates.lat])
        .extend([destination.coordinates.lng, destination.coordinates.lat]);

      map.current.fitBounds(bounds, { padding: 100 });
    }
  }, [pickup, destination]);

  return (
    <>
      <div ref={mapContainer} className="w-full h-full" />
      <RouteLayer map={map.current} pickup={pickup} destination={destination} />
    </>
  );
}