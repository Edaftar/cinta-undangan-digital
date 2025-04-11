
import { Check, Calendar, Image, MessageCircle, CreditCard, Palette, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Detail Acara',
    description: 'Informasi lengkap tanggal, waktu, dan lokasi untuk acara akad dan resepsi.',
  },
  {
    icon: Image,
    title: 'Galeri Foto',
    description: 'Bagikan foto prewedding dan momen special lainnya dalam galeri yang cantik.',
  },
  {
    icon: MessageCircle,
    title: 'RSVP & Ucapan',
    description: 'Fitur RSVP digital dan kolom ucapan untuk tamu undangan Anda.',
  },
  {
    icon: CreditCard,
    title: 'Amplop Digital',
    description: 'Terima hadiah pernikahan melalui transfer bank atau e-wallet dengan mudah.',
  },
  {
    icon: Palette,
    title: 'Personalisasi',
    description: 'Sesuaikan warna, font, dan elemen lainnya sesuai keinginan.',
  },
  {
    icon: Smartphone,
    title: 'Responsive',
    description: 'Tampilan yang sempurna di semua perangkat, dari desktop hingga smartphone.',
  },
];

const Features = () => {
  return (
    <section className="py-16 bg-wedding-bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Fitur Unggulan</h2>
          <p className="text-gray-600">
            Undangan pernikahan digital Cinta dilengkapi dengan berbagai fitur untuk membuat undangan Anda lebih berkesan.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-wedding-purple bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon size={24} className="text-wedding-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
