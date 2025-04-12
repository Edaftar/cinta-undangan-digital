
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
    image: 'https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/elegant-rose-template.jpg',
    category: 'elegant',
    features: ['Photo gallery', 'RSVP form', 'Love story timeline', 'Digital envelope'],
    popular: true,
  },
  {
    id: 'minimalist-1',
    name: 'Minimalist White',
    description: 'Clean and simple design with minimalist aesthetics.',
    image: 'https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/minimalist-template.jpg',
    category: 'minimalist',
    features: ['Photo gallery', 'RSVP form', 'Guest comments', 'Countdown timer'],
  },
  {
    id: 'rustic-1',
    name: 'Rustic Garden',
    description: 'Warm and natural design with rustic elements and earthy colors.',
    image: 'https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/rustic-template.jpg',
    category: 'rustic',
    features: ['Photo gallery', 'RSVP form', 'Love story timeline', 'Location map'],
    popular: true,
  },
  {
    id: 'traditional-1',
    name: 'Traditional Java',
    description: 'Traditional Indonesian wedding theme with Javanese cultural elements.',
    image: 'https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/traditional-template.jpg',
    category: 'traditional',
    features: ['Photo gallery', 'RSVP form', 'Cultural ceremony details', 'Digital envelope'],
  },
  {
    id: 'modern-1',
    name: 'Modern Geometry',
    description: 'Contemporary design with geometric patterns and bold typography.',
    image: 'https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/modern-template.jpg',
    category: 'modern',
    features: ['Photo gallery', 'RSVP form', 'Guest comments', 'Countdown timer'],
    popular: true,
  },
  {
    id: 'islamic-1',
    name: 'Islamic Ornament',
    description: 'Elegant Islamic design with traditional patterns and calligraphy.',
    image: 'https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-template.jpg',
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
