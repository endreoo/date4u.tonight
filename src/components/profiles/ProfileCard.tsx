import React from 'react';
import { Calendar, Clock, Crown, Shield, Coffee, UtensilsCrossed } from 'lucide-react';
import { Profile, DateTypeAvailability } from '../../types/profile';

interface ProfileCardProps {
  profile: Profile;
  onInvite: (profile: Profile, dateType: DateTypeAvailability) => void;
}

export function ProfileCard({ profile, onInvite }: ProfileCardProps) {
  const DateTypeIcon = {
    coffee: Coffee,
    dinner: UtensilsCrossed,
    vip: Crown,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <div className="aspect-[3/4]">
          <img
            src={profile.photos[0]}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
        {profile.verified && (
          <div className="absolute top-2 right-2 bg-white p-1 rounded-full">
            <Shield className="w-5 h-5 text-green-500" />
          </div>
        )}
        {profile.isVIP && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 rounded-full flex items-center space-x-1">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-medium">VIP</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
            <p className="text-gray-500">{profile.age} years</p>
          </div>
          <div className="flex space-x-1">
            {(profile.isVIP ? ['vip'] : profile.dateTypes).map((type) => {
              const Icon = DateTypeIcon[type];
              return (
                <Icon
                  key={type}
                  className="w-5 h-5 text-gray-400"
                  title={`Available for ${type} dates`}
                />
              );
            })}
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{profile.bio}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{profile.availability.days.join(', ')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            <span>{profile.availability.timeSlots.join(', ')}</span>
          </div>
        </div>

        <div className="space-y-2">
          {(profile.isVIP ? ['vip'] : profile.dateTypes).map((dateType) => (
            <button
              key={dateType}
              onClick={() => onInvite(profile, dateType)}
              className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors"
              style={{
                backgroundColor: dateType === 'vip' ? '#EF4444' : '#F3F4F6',
                color: dateType === 'vip' ? 'white' : '#374151',
              }}
            >
              Send {dateType.charAt(0).toUpperCase() + dateType.slice(1)} Date Invitation
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}