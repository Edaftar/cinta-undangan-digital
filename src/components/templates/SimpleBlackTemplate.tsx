
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { MapPin, Calendar } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";
import InteractiveMap from "@/components/InteractiveMap";

interface SimpleBlackTemplateProps {
  data: {
    bride_name: string;
    groom_name: string;
    bride_photo?: string;
    groom_photo?: string;
    bride_father?: string;
    bride_mother?: string;
    groom_father?: string;
    groom_mother?: string;
    main_date: string;
    akad_date?: string;
    reception_date?: string;
    location: string;
    location_address?: string;
    location_map_url?: string;
    love_story?: string;
    gallery?: string[];
    music_url?: string;
  };
}

const SimpleBlackTemplate = ({ data }: SimpleBlackTemplateProps) => {
  const mainDate = new Date(data.main_date);
  
  return (
    <div className="relative font-serif">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-black text-white p-4 relative">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="text-center relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl mb-4">The Wedding of</h1>
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            {data.bride_name} & {data.groom_name}
          </h2>
          <p className="text-xl md:text-2xl">
            {format(mainDate, "EEEE, dd MMMM yyyy", { locale: id })}
          </p>
        </div>
      </section>

      {/* Couple Photos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={data.groom_photo || "/placeholder.svg"} 
                  alt={data.groom_name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold">{data.groom_name}</h3>
              {data.groom_father && data.groom_mother && (
                <p className="text-gray-600">
                  Putra dari {data.groom_father} & {data.groom_mother}
                </p>
              )}
            </div>

            <div className="text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-4">
                <img 
                  src={data.bride_photo || "/placeholder.svg"} 
                  alt={data.bride_name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold">{data.bride_name}</h3>
              {data.bride_father && data.bride_mother && (
                <p className="text-gray-600">
                  Putri dari {data.bride_father} & {data.bride_mother}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Date and Location */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">Save the Date</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-black text-white p-8 rounded-lg">
              <Calendar className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Date & Time</h3>
              <p className="text-xl">
                {format(mainDate, "EEEE, dd MMMM yyyy", { locale: id })}
              </p>
              <p className="text-xl">{format(mainDate, "HH:mm")} WIB</p>
              
              {data.akad_date && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-xl font-bold mb-2">Akad Nikah</h4>
                  <p>{format(new Date(data.akad_date), "HH:mm 'WIB'")}</p>
                </div>
              )}
              
              {data.reception_date && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <h4 className="text-xl font-bold mb-2">Resepsi</h4>
                  <p>{format(new Date(data.reception_date), "HH:mm 'WIB'")}</p>
                </div>
              )}
            </div>
            
            <div className="bg-black text-white p-8 rounded-lg">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-4">Location</h3>
              <p className="text-xl">{data.location}</p>
              {data.location_address && (
                <p className="mt-2">{data.location_address}</p>
              )}
              
              {data.location_map_url && (
                <a 
                  href={data.location_map_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Open Map
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Location */}
      {data.location_map_url && data.location_address && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Location</h2>
            <InteractiveMap 
              locationAddress={data.location_address} 
              locationMapUrl={data.location_map_url} 
              className="max-w-4xl mx-auto"
            />
          </div>
        </section>
      )}
      
      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.gallery.map((image, index) => (
                <div 
                  key={index}
                  className="aspect-square overflow-hidden"
                >
                  <img 
                    src={image} 
                    alt="Wedding Gallery"
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Love Story */}
      {data.love_story && (
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-4xl font-bold mb-12 text-center">Our Love Story</h2>
            <div className="prose prose-lg mx-auto">
              <p>{data.love_story}</p>
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="py-12 bg-black text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Thank You</h2>
          <p className="text-xl">
            {data.bride_name} & {data.groom_name}
          </p>
        </div>
      </footer>
      
      {/* Music Player */}
      {data.music_url && (
        <MusicPlayer
          musicUrl={data.music_url}
          autoplay={true}
          initialMuted={false}
        />
      )}
    </div>
  );
};

export default SimpleBlackTemplate;
