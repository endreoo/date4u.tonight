export type DateTypeAvailability = 'coffee' | 'dinner' | 'vip';

export interface Availability {
  days: string[];
  timeSlots: string[];
}

export interface Profile {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  bio: string;
  photos: string[];
  video?: string;
  dateTypes: DateTypeAvailability[];
  availability: Availability;
  verified: boolean;
  isVIP?: boolean;
}