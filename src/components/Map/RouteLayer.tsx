import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_CONFIG } from '../../config/mapbox';
import { Location } from '../../types';

interface RouteLayerProps {
  map: mapboxgl.Map | null;
  pickup: Location | null;
  destination: Location | null;
}

export function RouteLayer({ map, pickup, destination }: RouteLayerProps) {
  useEffect(() => {
    if (!map || !pickup || !destination) return;

    const getRoute = async () => {
      const start = [pickup.coordinates.lng, pickup.coordinates.lat];
      const end = [destination.coordinates.lng, destination.coordinates.lat];
      
      try {
        const query = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${MAPBOX_CONFIG.accessToken}`
        );
        const json = await query.json();
        const data = json.routes[0];
        
        const route = {
          type: 'Feature',
          properties: {},
          geometry: data.geometry
        };

        if (map.getSource('route')) {
          (map.getSource('route') as mapboxgl.GeoJSONSource).setData(route as any);
        } else {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: route
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#000',
              'line-width': 4,
              'line-opacity': 0.75
            }
          });
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    getRoute();

    return () => {
      if (map.getLayer('route')) {
        map.removeLayer('route');
      }
      if (map.getSource('route')) {
        map.removeSource('route');
      }
    };
  }, [map, pickup, destination]);

  return null;
}