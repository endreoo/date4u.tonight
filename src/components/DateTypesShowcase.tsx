import React from 'react';

interface DateType {
  title: string;
  description: string;
  image: string;
  price?: string;
  incentive?: string;
}

const dateTypes: Record<'men' | 'women', DateType[]> = {
  men: [
    {
      title: 'Coffee Dates',
      description: 'Casual meetups at premium cafes. Perfect for first dates and quick connections.',
      price: 'KES 3,000',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Dinner Dates',
      description: 'Elegant dining experiences at top restaurants. Ideal for meaningful conversations.',
      price: 'KES 6,000',
      image: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'VIP Experience',
      description: 'Access to top-level women at luxury venues. Premium service and unforgettable moments.',
      price: 'KES 30,000',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ],
  women: [
    {
      title: 'Coffee Dates',
      description: 'Casual meetups at premium cafes with verified members.',
      incentive: 'KES 500 incentive',
      image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Dinner Dates',
      description: 'Elegant dining experiences with quality conversations.',
      incentive: 'KES 1,000 incentive',
      image: 'https://images.unsplash.com/photo-1615719413546-198b25453f85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'VIP Experience',
      description: 'Top-level dates with premium members. Higher earnings and exclusive benefits.',
      incentive: 'KES 10,000 incentive',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]
};

export function DateTypesShowcase({ forWomen = false }) {
  const types = forWomen ? dateTypes.women : dateTypes.men;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {types.map((type, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-48 overflow-hidden">
            <img
              src={type.image}
              alt={type.title}
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
            <p className="text-gray-600 mb-4">{type.description}</p>
            <div className="text-red-500 font-semibold">
              {forWomen ? type.incentive : type.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}