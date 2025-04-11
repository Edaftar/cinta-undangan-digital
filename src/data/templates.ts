
export interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  category: TemplateCategory;
  features: string[];
  popular?: boolean;
}

export type TemplateCategory = 'elegant' | 'minimalist' | 'rustic' | 'traditional' | 'modern' | 'islamic';

export const templates: Template[] = [
  {
    id: 'elegant-1',
    name: 'Elegant Rose',
    description: 'A beautiful and elegant template with floral elements and soft colors.',
    image: '/placeholder.svg',
    category: 'elegant',
    features: ['Photo gallery', 'RSVP form', 'Love story timeline', 'Digital envelope'],
    popular: true,
  },
  {
    id: 'minimalist-1',
    name: 'Minimalist White',
    description: 'Clean and simple design with minimalist aesthetics.',
    image: '/placeholder.svg',
    category: 'minimalist',
    features: ['Photo gallery', 'RSVP form', 'Guest comments', 'Countdown timer'],
  },
  {
    id: 'rustic-1',
    name: 'Rustic Garden',
    description: 'Warm and natural design with rustic elements and earthy colors.',
    image: '/placeholder.svg',
    category: 'rustic',
    features: ['Photo gallery', 'RSVP form', 'Love story timeline', 'Location map'],
    popular: true,
  },
  {
    id: 'traditional-1',
    name: 'Traditional Java',
    description: 'Traditional Indonesian wedding theme with Javanese cultural elements.',
    image: '/placeholder.svg',
    category: 'traditional',
    features: ['Photo gallery', 'RSVP form', 'Cultural ceremony details', 'Digital envelope'],
  },
  {
    id: 'modern-1',
    name: 'Modern Geometry',
    description: 'Contemporary design with geometric patterns and bold typography.',
    image: '/placeholder.svg',
    category: 'modern',
    features: ['Photo gallery', 'RSVP form', 'Guest comments', 'Countdown timer'],
    popular: true,
  },
  {
    id: 'islamic-1',
    name: 'Islamic Ornament',
    description: 'Elegant Islamic design with traditional patterns and calligraphy.',
    image: '/placeholder.svg',
    category: 'islamic',
    features: ['Photo gallery', 'RSVP form', 'Islamic quotes', 'Prayer times'],
  },
];

export const categories = [
  { id: 'all', name: 'All Templates' },
  { id: 'elegant', name: 'Elegant' },
  { id: 'minimalist', name: 'Minimalist' },
  { id: 'rustic', name: 'Rustic' },
  { id: 'traditional', name: 'Traditional' },
  { id: 'modern', name: 'Modern' },
  { id: 'islamic', name: 'Islamic' },
];
