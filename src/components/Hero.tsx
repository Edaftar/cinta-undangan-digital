
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-wedding-light-blush to-wedding-ivory py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-wedding-text leading-tight">
              Buat Undangan Pernikahan Digital yang Indah
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Platform undangan pernikahan digital yang memudahkan Anda membuat undangan yang elegan dan personal dalam waktu singkat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white px-8 py-6 text-lg flex items-center"
                asChild
              >
                <Link to="/templates">
                  Buat Undangan <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-wedding-rosegold text-wedding-rosegold hover:bg-wedding-light-blush px-8 py-6 text-lg"
                asChild
              >
                <Link to="/templates">
                  Lihat Template
                </Link>
              </Button>
            </div>
            <div className="pt-6">
              <p className="text-sm text-gray-500 font-medium">Fitur Unggulan:</p>
              <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-wedding-rosegold mr-2"></div>
                  <p className="text-sm text-gray-600">RSVP Digital</p>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-wedding-rosegold mr-2"></div>
                  <p className="text-sm text-gray-600">Gallery Foto</p>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-wedding-rosegold mr-2"></div>
                  <p className="text-sm text-gray-600">Cerita Cinta</p>
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-wedding-rosegold mr-2"></div>
                  <p className="text-sm text-gray-600">Amplop Digital</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center animate-fade-in">
            <div className="relative w-full max-w-md">
              <div className="bg-white rounded-2xl shadow-xl p-4 transform rotate-3 animate-float">
                <div className="aspect-[9/16] bg-wedding-champagne rounded-lg flex items-center justify-center">
                  <p className="text-xl font-dancing text-wedding-rosegold">Preview Undangan</p>
                </div>
              </div>
              <div className="absolute top-4 -left-4 -z-10 bg-wedding-blush rounded-2xl shadow-lg p-4 transform -rotate-6">
                <div className="aspect-[9/16] bg-wedding-light-blush rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
