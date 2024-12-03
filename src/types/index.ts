export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface Ride {
  id: string;
  type: 'UberX' | 'UberXL' | 'UberBlack';
  price: number;
  duration: number;
  distance: number;
  pickup: Location;
  destination: Location;
  status: 'completed' | 'ongoing' | 'cancelled';
  date: string;
  driverName: string;
  driverRating: number;
}

export interface RideOption {
  id: string;
  name: string;
  description: string;
  multiplier: number;
  image: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  paymentMethods: PaymentMethod[];
  preferredPaymentMethod?: string;
  homeAddress?: Location;
  workAddress?: Location;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  expiryDate?: string;
  default: boolean;
}