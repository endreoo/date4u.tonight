import { Profile } from './profile';
import { Venue } from '../data/venues';

export interface DateInvitation {
  profile: Profile;
  sender: Profile;
  venue: Venue;
  dateType: string;
  timeSlot: string;
  date: string;
}