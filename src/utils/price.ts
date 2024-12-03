import { Location } from '../types';

export function calculateDistance(pickup: Location, destination: Location): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(destination.coordinates.lat - pickup.coordinates.lat);
  const dLon = toRad(destination.coordinates.lng - pickup.coordinates.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(pickup.coordinates.lat)) * Math.cos(toRad(destination.coordinates.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function calculatePrice(distance: number, multiplier: number): number {
  const basePrice = 2.5; // Base fare
  const perKmRate = 1.5; // Rate per kilometer
  const price = (basePrice + (distance * perKmRate)) * multiplier;
  return Math.round(price * 100) / 100;
}

export function estimateTime(distance: number): number {
  const averageSpeed = 30; // km/h
  return Math.round(distance / averageSpeed * 60); // Returns minutes
}