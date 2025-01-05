export interface Venue {
  id: string;
  name: string;
  type: 'coffee' | 'dinner' | 'vip';
  location: string;
  image: string;
}

export const venues: Venue[] = [
  {
    id: '1',
    name: 'Art Cafe Westlands',
    type: 'coffee',
    location: 'Westlands',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '2',
    name: 'Connect Coffee Lounge',
    type: 'coffee',
    location: 'Kilimani',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '3',
    name: 'Mediterraneo Restaurant',
    type: 'dinner',
    location: 'Westlands',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '4',
    name: 'Fogo Gaucho',
    type: 'dinner',
    location: 'Kilimani',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '5',
    name: 'Sky Lounge',
    type: 'vip',
    location: 'Upper Hill',
    image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: '6',
    name: 'XO Lounge',
    type: 'vip',
    location: 'Kilimani',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];