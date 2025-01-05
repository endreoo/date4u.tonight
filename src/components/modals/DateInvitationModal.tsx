import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Clock } from 'lucide-react';
import { Profile } from '../../types/profile';
import { Venue } from '../../data/venues';
import { venues } from '../../data/venues';
import { generateTimeSlots, getNextThreeDays } from '../../utils/dateUtils';
import { PaymentModal } from './PaymentModal';

interface DateInvitationModalProps {
  profile: Profile;
  dateType: 'coffee' | 'dinner' | 'vip';
  onClose: () => void;
  onSubmit: (venue: Venue, timeSlot: string) => void;
}

export function DateInvitationModal({ profile, dateType, onClose, onSubmit }: DateInvitationModalProps) {
  const availableVenues = venues.filter(venue => venue.type === dateType);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showPayment, setShowPayment] = useState(false);
  
  const timeSlots = generateTimeSlots(profile.availability.timeSlots);
  const availableDays = getNextThreeDays(profile.availability.days);

  const handleSubmit = () => {
    if (selectedVenue && selectedDate && selectedTime) {
      setShowPayment(true);
    }
  };

  const handlePaymentComplete = () => {
    if (selectedVenue && selectedDate && selectedTime) {
      onSubmit(selectedVenue, selectedTime);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Send {dateType.charAt(0).toUpperCase() + dateType.slice(1)} Date Invitation
          </h2>
          
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={profile.photos[0]}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
              <p className="text-gray-500">Available: {profile.availability.days.join(', ')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-medium text-gray-900">Select Venue</h4>
            <div className="grid grid-cols-2 gap-4">
              {availableVenues.map((venue) => (
                <button
                  key={venue.id}
                  onClick={() => setSelectedVenue(venue)}
                  className={`group relative rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 focus:outline-none ${
                    selectedVenue?.id === venue.id ? 'ring-2 ring-red-500' : ''
                  }`}
                >
                  <div className="aspect-[4/3]">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 p-4 flex flex-col justify-end">
                    <h3 className="text-white font-medium">{venue.name}</h3>
                    <p className="text-white/80 text-sm">{venue.location}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <h4 className="font-medium text-gray-900">Select Date</h4>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {availableDays.map(({ date, label }) => (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedDate?.toDateString() === date.toDateString()
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <h4 className="font-medium text-gray-900">Available Time Slots</h4>
            </div>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedTime === time
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={!selectedVenue || !selectedDate || !selectedTime}
              className={`px-6 py-2 rounded-lg font-medium ${
                selectedVenue && selectedTime
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Send Invitation
            </button>
          </div>
        </div>
      </div>
      {showPayment && selectedVenue && (
        <PaymentModal
          dateType={dateType}
          venue={selectedVenue}
          timeSlot={selectedTime}
          onClose={() => setShowPayment(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}