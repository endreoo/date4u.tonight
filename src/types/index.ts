export type UserRole = 'man' | 'woman' | 'vip-woman' | 'admin';

export interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  role: UserRole;
  verified: boolean;
  preferences: {
    ageRange: {
      min: number;
      max: number;
    };
    interests: string[];
  };
  photos: string[];
  bio?: string;
  approved?: boolean;
}

export interface DateType {
  id: string;
  name: 'coffee' | 'dinner' | 'vip';
  price: number;
  transportAllowance: number;
  vipEarnings?: number;
}

export interface Venue {
  id: string;
  name: string;
  type: 'coffee' | 'restaurant' | 'lounge';
  address: string;
  image: string;
  rating: number;
}

export interface DateInvitation {
  id: string;
  senderId: string;
  receiverId: string;
  dateType: DateType;
  venue: Venue;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  expiresAt: Date;
}