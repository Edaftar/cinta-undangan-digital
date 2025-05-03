
import React from "react";
import { format } from "date-fns";
import { idID } from "date-fns/locale";
import { Heart, MapPin, Calendar, Clock } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";

interface ModernFloralTemplateProps {
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

const ModernFloralTemplate = ({ data }: ModernFloralTemplateProps) => {
  const mainDate = new Date(data.main_date);
  
  return (
    <div className="font-sans" style={{ backgroundColor: "#FFFBF7" }}>
      {/* Hero Section */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center p-4 relative"
        style={{
          background: "linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/placeholder.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center max-w-3xl mx-auto p-8 border border-pink-200 rounded-lg bg-white bg-opacity-80">
          <p className="text-lg mb-4 text-pink-400">We are getting married</p>
          <h1 className="text-4xl md:text-6xl font-light mb-6 text-gray-800">
            {data.bride_name} & {data.groom_name}
          </h1>
          <div className="mb-6 flex items-center justify-center">
            <div className="w-12 h-px bg-pink-300"></div>
            <Heart className="mx-2 text-pink-400" size={24} />
            <div className="w-12 h-px bg-pink-300"></div>
          </div>
          <p className="text-xl text-gray-700">
            {format(mainDate, "EEEE, dd MMMM yyyy", { locale: idID })}
          </p>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center font-light mb-16 text-gray-800">
            The Happy Couple
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-6 border-4 border-pink-100">
                <img 
                  src={data.groom_photo || "/placeholder.svg"} 
                  alt={data.groom_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-light mb-2 text-gray-800">{data.groom_name}</h3>
              {data.groom_father && data.groom_mother && (
                <p className="text-gray-600">
                  Son of Mr. {data.groom_father} & Mrs. {data.groom_mother}
                </p>
              )}
            </div>
            
            <div className="text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-6 border-4 border-pink-100">
                <img 
                  src={data.bride_photo || "/placeholder.svg"} 
                  alt={data.bride_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-light mb-2 text-gray-800">{data.bride_name}</h3>
              {data.bride_father && data.bride_mother && (
                <p className="text-gray-600">
                  Daughter of Mr. {data.bride_father} & Mrs. {data.bride_mother}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Event Details */}
      <section 
        className="py-16"
        style={{ backgroundColor: "#FDF5F7" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center font-light mb-16 text-gray-800">
            Wedding Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Date */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Calendar className="w-10 h-10 mx-auto mb-4 text-pink-400" />
              <h3 className="text-xl font-medium mb-4 text-gray-800">Date</h3>
              <p className="text-gray-700">
                {format(mainDate, "EEEE", { locale: idID })}
              </p>
              <p className="text-gray-700">
                {format(mainDate, "dd MMMM yyyy", { locale: idID })}
              </p>
            </div>
            
            {/* Time */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Clock className="w-10 h-10 mx-auto mb-4 text-pink-400" />
              <h3 className="text-xl font-medium mb-4 text-gray-800">Time</h3>
              <p className="text-gray-700">{format(mainDate, "HH:mm")} WIB</p>
              
              {data.akad_date && (
                <div className="mt-4 pt-4 border-t border-pink-100">
                  <h4 className="text-lg font-medium mb-1 text-gray-700">Akad Nikah</h4>
                  <p className="text-gray-700">{format(new Date(data.akad_date), "HH:mm")} WIB</p>
                </div>
              )}
              
              {data.reception_date && (
                <div className="mt-4 pt-4 border-t border-pink-100">
                  <h4 className="text-lg font-medium mb-1 text-gray-700">Reception</h4>
                  <p className="text-gray-700">{format(new Date(data.reception_date), "HH:mm")} WIB</p>
                </div>
              )}
            </div>
            
            {/* Location */}
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <MapPin className="w-10 h-10 mx-auto mb-4 text-pink-400" />
              <h3 className="text-xl font-medium mb-4 text-gray-800">Location</h3>
              <p className="text-gray-700">{data.location}</p>
              {data.location_address && (
                <p className="mt-2 text-gray-600">{data.location_address}</p>
              )}
              
              {data.location_map_url && (
                <a 
                  href={data.location_map_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-2 bg-pink-100 text-pink-600 rounded-full hover:bg-pink-200 transition-colors text-sm"
                >
                  View Map
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Love Story */}
      {data.love_story && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl text-center font-light mb-12 text-gray-800">
              Our Love Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700">
              <p>{data.love_story}</p>
            </div>
          </div>
        </section>
      )}
      
      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-16" style={{ backgroundColor: "#FDF5F7" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl text-center font-light mb-12 text-gray-800">
              Our Moments
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-sm">
                  <img 
                    src={image} 
                    alt="Wedding Gallery"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="py-12 bg-white text-center">
        <div className="container mx-auto px-4">
          <Heart className="mx-auto mb-4 text-pink-400" size={32} />
          <h2 className="text-2xl font-light mb-4 text-gray-800">Thank You</h2>
          <p className="text-lg text-gray-700">
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

export default ModernFloralTemplate;
