import React from 'react';
import { Heart, Shield, Clock, DollarSign } from 'lucide-react';

interface ProcessStep {
  icon: React.ElementType;
  title: string;
  description: string;
}

const menSteps: ProcessStep[] = [
  {
    icon: Heart,
    title: "1. Browse Matches",
    description: "View curated profiles of verified members"
  },
  {
    icon: Shield,
    title: "2. Send Invitations",
    description: "Choose your preferred date type at handpicked venues"
  },
  {
    icon: Clock,
    title: "3. Meet Today",
    description: "Get quick confirmations and meet at premium locations"
  }
];

const womenSteps: ProcessStep[] = [
  {
    icon: Heart,
    title: "1. Create Profile",
    description: "Make an attractive verified profile"
  },
  {
    icon: Shield,
    title: "2. Receive Invitations",
    description: "Get premium date invitations from verified members"
  },
  {
    icon: Clock,
    title: "3. Quick Response",
    description: "Accept within 5 minutes to confirm"
  },
  {
    icon: DollarSign,
    title: "4. Meet & Earn",
    description: "Enjoy your date and receive your incentive"
  }
];

function Feature({ icon: Icon, title, description }: ProcessStep) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-red-500" />
      </div>
      <div className="ml-3">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{description}</p>
      </div>
    </div>
  );
}

export function ProcessSteps({ forWomen = false }) {
  const steps = forWomen ? womenSteps : menSteps;
  
  return (
    <div className={`mt-12 grid grid-cols-1 gap-8 ${forWomen ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
      {steps.map((step, index) => (
        <Feature key={index} {...step} />
      ))}
    </div>
  );
}