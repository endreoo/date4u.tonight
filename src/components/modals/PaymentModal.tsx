import React from 'react';
import { X, CreditCard } from 'lucide-react';
import { DateTypeAvailability } from '../../types/profile';
import { Venue } from '../../data/venues';

const dateTypePrices = {
  coffee: 3000,
  dinner: 6000,
  vip: 30000
};

interface PaymentModalProps {
  dateType: DateTypeAvailability;
  venue: Venue;
  timeSlot: string;
  onClose: () => void;
  onPaymentComplete: () => void;
}

export function PaymentModal({ dateType, venue, timeSlot, onClose, onPaymentComplete }: PaymentModalProps) {
  const handlePayment = () => {
    // TODO: Implement actual payment processing
    onPaymentComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <CreditCard className="w-8 h-8 text-red-500" />
            <h2 className="text-2xl font-bold text-gray-900">Payment Required</h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Date Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date Type</span>
                <span className="font-medium">{dateType.charAt(0).toUpperCase() + dateType.slice(1)} Date</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Venue</span>
                <span className="font-medium">{venue.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{timeSlot}</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-red-500">KES {dateTypePrices[dateType].toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="4242 4242 4242 4242"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full py-2 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Pay KES {dateTypePrices[dateType].toLocaleString()}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Your payment is secure and encrypted. The amount will be held until the date is confirmed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}