import React, { useState } from 'react';
import { ProfileCard } from '../components/profiles/ProfileCard';
import { ProfileFilters } from '../components/profiles/ProfileFilters';
import { DateInvitationModal } from '../components/modals/DateInvitationModal';
import { Profile, DateTypeAvailability } from '../types/profile';
import { NotificationService } from '../services/NotificationService';
import { mockSender } from '../data/mockUser';
import { Venue } from '../data/venues';

// Temporary mock data
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 24,
    bio: 'Coffee enthusiast and art lover. Looking forward to meaningful conversations over a cup of coffee.',
    photos: ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    dateTypes: ['coffee', 'dinner'],
    availability: {
      days: ['Mon', 'Wed', 'Fri'],
      timeSlots: ['2 PM', '4 PM', '6 PM']
    },
    verified: true
  },
  {
    id: '2',
    name: 'Michelle',
    age: 28,
    bio: 'Professional model and foodie. Love exploring new restaurants and meeting interesting people.',
    photos: ['https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    dateTypes: ['dinner', 'vip'],
    availability: {
      days: ['Tue', 'Thu', 'Sat'],
      timeSlots: ['7 PM', '8 PM']
    },
    verified: true,
    isVIP: true
  },
  {
    id: '3',
    name: 'Jessica',
    age: 25,
    bio: 'Fitness enthusiast and travel blogger. Always up for new adventures and meeting genuine people.',
    photos: ['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    dateTypes: ['coffee', 'dinner'],
    availability: {
      days: ['Mon', 'Wed', 'Fri', 'Sat'],
      timeSlots: ['11 AM', '2 PM', '4 PM']
    },
    verified: true
  },
  {
    id: '4',
    name: 'Victoria',
    age: 27,
    bio: 'Executive assistant with a passion for fine dining and classical music. Looking for sophisticated company.',
    photos: ['https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    dateTypes: ['dinner', 'vip'],
    availability: {
      days: ['Tue', 'Thu', 'Sat'],
      timeSlots: ['7 PM', '8 PM', '9 PM']
    },
    verified: true,
    isVIP: true
  },
  {
    id: '5',
    name: 'Rachel',
    age: 23,
    bio: 'Art student and part-time model. Love deep conversations over coffee and exploring art galleries.',
    photos: ['https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'],
    dateTypes: ['coffee'],
    availability: {
      days: ['Wed', 'Thu', 'Fri', 'Sun'],
      timeSlots: ['10 AM', '2 PM', '5 PM']
    },
    verified: true
  }
];

export default function Profiles() {
  const [profiles] = useState<Profile[]>(mockProfiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [inviteModal, setInviteModal] = useState<{
    isOpen: boolean;
    profile?: Profile;
    dateType?: DateTypeAvailability;
  }>({ isOpen: false });

  const handleInvite = (profile: Profile, dateType: DateTypeAvailability) => {
    setInviteModal({ isOpen: true, profile, dateType });
  };

  const handleVenueSelect = async (venue: Venue, timeSlot: string) => {
    console.log('Selected venue:', venue, 'time:', timeSlot);
    
    try {
      if (!inviteModal.profile) {
        throw new Error('No profile selected for invitation');
      }

      const invitation = {
        profile: inviteModal.profile,
        sender: mockSender,
        venue,
        dateType: inviteModal.dateType || 'coffee',
        timeSlot,
        date: new Date().toLocaleDateString()
      };

      // Send notifications
      await Promise.all([
        NotificationService.sendWhatsAppNotification(invitation),
        NotificationService.sendEmailNotification(invitation)
      ]);

      console.log('Invitation sent successfully');
    } catch (error) {
      console.error('Failed to send invitation:', error);
    }

    setInviteModal({ isOpen: false });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search logic
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters({ ...filters, ...newFilters });
    // TODO: Implement filter logic
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Profiles</h1>
          <div className="text-sm text-gray-500">
            Showing {profiles.length} profiles
          </div>
        </div>

        <ProfileFilters
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onInvite={handleInvite}
            />
          ))}
        </div>
      </div>
      {inviteModal.isOpen && inviteModal.profile && inviteModal.dateType && (
        <DateInvitationModal
          profile={inviteModal.profile}
          dateType={inviteModal.dateType}
          onClose={() => setInviteModal({ isOpen: false })}
          onSubmit={handleVenueSelect}
        />
      )}
    </div>
  );
}