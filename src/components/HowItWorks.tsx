
import { MousePointerClick, PencilRuler, Eye, Share2 } from 'lucide-react';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Pilih Template',
    description: 'Pilih template undangan yang sesuai dengan selera dan tema pernikahanmu.',
  },
  {
    icon: PencilRuler,
    title: 'Isi Informasi',
    description: 'Masukkan informasi pernikahan, foto, cerita cinta, dan detail acara.',
  },
  {
    icon: Eye,
    title: 'Preview & Edit',
    description: 'Lihat preview undangan dan lakukan perubahan seperlunya hingga sesuai.',
  },
  {
    icon: Share2,
    title: 'Bagikan',
    description: 'Dapatkan link unik dan bagikan kepada tamu undangan melalui media sosial atau pesan.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Cara Kerja</h2>
          <p className="text-gray-600">
            Buat undangan pernikahan digital kamu dengan 4 langkah mudah
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center"
            >
              <div className="relative mx-auto">
                <div className="w-16 h-16 bg-wedding-purple bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon size={28} className="text-wedding-purple" />
                </div>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-200 -z-10 transform -translate-y-1/2">
                    <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-wedding-purple"></div>
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
