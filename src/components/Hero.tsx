import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProcessSteps } from './ProcessSteps';
import { DateTypesShowcase } from './DateTypesShowcase';

export default function Hero() {
  const [isWomenView, setIsWomenView] = useState(false);

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="mb-8 flex justify-center lg:justify-start">
                <div className="inline-flex rounded-lg border border-gray-200">
                  <button
                    className={`px-4 py-2 rounded-l-lg ${
                      !isWomenView ? 'bg-red-500 text-white' : 'text-gray-500'
                    }`}
                    onClick={() => setIsWomenView(false)}
                  >
                    For Men
                  </button>
                  <button
                    className={`px-4 py-2 rounded-r-lg ${
                      isWomenView ? 'bg-red-500 text-white' : 'text-gray-500'
                    }`}
                    onClick={() => setIsWomenView(true)}
                  >
                    For Women
                  </button>
                </div>
              </div>

              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Find Your Date</span>
                <span className="block text-red-500">Meet Today</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {isWomenView
                  ? "Join our exclusive platform, receive premium date invitations, and earn while meeting quality matches."
                  : "Simple process: Choose your matches, send date invitations, get confirmed in 5 minutes, and meet at premium venues today."}
              </p>
              
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-500 hover:bg-red-600 md:text-lg"
                >
                  {isWomenView ? "Join Now" : "Schedule a Date Today"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
              
              <ProcessSteps forWomen={isWomenView} />
            </div>
          </main>
          
          <div className="mt-12 w-full">
            <img
              className="w-full h-[500px] object-cover rounded-lg shadow-xl"
              src="https://images.pexels.com/photos/4937604/pexels-photo-4937604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Couple enjoying a date at a premium venue"
            />
          </div>
          
          <div className="mt-16 mb-24">
            <div className="max-w-3xl mx-auto">
              {!isWomenView ? (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">For Men: Premium Dating Experience</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Browse Verified Matches</h3>
                    <p className="text-gray-600">Access our curated selection of verified women. All profiles are thoroughly vetted to ensure authenticity and quality matches.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Choose Your Date Type</h3>
                    <p className="text-gray-600">Select from coffee dates, dinner dates, or exclusive VIP experiences at premium venues across Nairobi.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Confirmation</h3>
                    <p className="text-gray-600">Receive responses within 5 minutes. No long waiting times or endless messaging - meet the same day.</p>
                  </div>
                </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">For Women: Safe & Rewarding Dating</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Create Your Profile</h3>
                    <p className="text-gray-600">Complete your profile with recent photos and interests. Our team will verify your profile within 24 hours.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Premium Date Invitations</h3>
                    <p className="text-gray-600">Receive date invitations from verified members. All dates include transport allowance and take place at premium venues.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Safe & Rewarding</h3>
                    <p className="text-gray-600">Enjoy dates with verified members at premium locations. Receive your incentive immediately after the date.</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-red-800 mb-2">VIP Program</h3>
                    <p className="text-red-700">Unlock higher earnings and exclusive benefits by joining our VIP program. Available for selected members.</p>
                  </div>
                </div>
                </div>
              )}
            </div>
            
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                {isWomenView ? 'Date Types & Incentives' : 'Choose Your Date Experience'}
              </h2>
              <DateTypesShowcase forWomen={isWomenView} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}