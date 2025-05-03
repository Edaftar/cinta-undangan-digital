
import React from "react";
import { format } from "date-fns";
import { idID } from "date-fns/locale";
import { Leaf, MapPin, Calendar } from "lucide-react";
import MusicPlayer from "@/components/MusicPlayer";

interface MinimalistGreenTemplateProps {
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

const MinimalistGreenTemplate = ({ data }: MinimalistGreenTemplateProps) => {
  const mainDate = new Date(data.main_date);
  const primaryColor = "#2F4F4F"; // Dark green
  const accentColor = "#8FBC8F"; // Sage green
  
  return (
    <div className="font-sans" style={{ backgroundColor: "#F7F7F2" }}>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center p-4 relative">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            background: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 0h60v60H0z\" fill=\"none\"/><path d=\"M30 30l15 15M30 30l15-15M30 30l-15 15M30 30l-15-15\" stroke=\"%238FBC8F\" stroke-width=\"0.5\"/></svg>')"
          }}
        ></div>
        
        <div className="text-center relative z-10 max-w-3xl mx-auto p-10 border border-gray-200 bg-white bg-opacity-80">
          <Leaf className="mx-auto mb-6" style={{ color: accentColor }} size={36} />
          <h3 className="text-lg mb-3" style={{ color: accentColor }}>
            We invite you to celebrate our wedding
          </h3>
          <h1 className="text-4xl md:text-5xl font-light mb-6" style={{ color: primaryColor }}>
            {data.bride_name} & {data.groom_name}
          </h1>
          <div className="mb-6 w-16 h-px mx-auto" style={{ backgroundColor: accentColor }}></div>
          <p className="text-xl" style={{ color: primaryColor }}>
            {format(mainDate, "EEEE, dd MMMM yyyy", { locale: idID })}
          </p>
        </div>
      </section>

      {/* Couple */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-light mb-16" style={{ color: primaryColor }}>
            The Bride & Groom
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-6 border-4" style={{ borderColor: accentColor }}>
                <img
                  src={data.groom_photo || "/placeholder.svg"}
                  alt={data.groom_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-light mb-2" style={{ color: primaryColor }}>
                {data.groom_name}
              </h3>
              {data.groom_father && data.groom_mother && (
                <p className="text-gray-600">
                  Son of Mr. {data.groom_father} & Mrs. {data.groom_mother}
                </p>
              )}
            </div>
            
            <div className="text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-6 border-4" style={{ borderColor: accentColor }}>
                <img
                  src={data.bride_photo || "/placeholder.svg"}
                  alt={data.bride_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-light mb-2" style={{ color: primaryColor }}>
                {data.bride_name}
              </h3>
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
      <section className="py-20" style={{ backgroundColor: "#F7F7F2" }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center font-light mb-16" style={{ color: primaryColor }}>
            Wedding Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Date & Time */}
            <div className="bg-white p-8 rounded-md shadow-sm text-center">
              <Calendar style={{ color: accentColor }} className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-xl font-medium mb-4" style={{ color: primaryColor }}>
                When
              </h3>
              <p className="text-lg mb-1" style={{ color: primaryColor }}>
                {format(mainDate, "EEEE", { locale: idID })}
              </p>
              <p className="text-lg mb-4" style={{ color: primaryColor }}>
                {format(mainDate, "dd MMMM yyyy", { locale: idID })}
              </p>
              <p className="text-lg" style={{ color: primaryColor }}>
                {format(mainDate, "HH:mm")} WIB
              </p>
              
              {data.akad_date && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-medium mb-2" style={{ color: primaryColor }}>
                    Akad Nikah
                  </h4>
                  <p style={{ color: primaryColor }}>
                    {format(new Date(data.akad_date), "HH:mm")} WIB
                  </p>
                </div>
              )}
              
              {data.reception_date && (
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-medium mb-2" style={{ color: primaryColor }}>
                    Reception
                  </h4>
                  <p style={{ color: primaryColor }}>
                    {format(new Date(data.reception_date), "HH:mm")} WIB
                  </p>
                </div>
              )}
            </div>
            
            {/* Location */}
            <div className="bg-white p-8 rounded-md shadow-sm text-center">
              <MapPin style={{ color: accentColor }} className="w-12 h-12 mx-auto mb-6" />
              <h3 className="text-xl font-medium mb-4" style={{ color: primaryColor }}>
                Where
              </h3>
              <p className="text-lg mb-2" style={{ color: primaryColor }}>
                {data.location}
              </p>
              {data.location_address && (
                <p className="text-gray-600">
                  {data.location_address}
                </p>
              )}
              
              {data.location_map_url && (
                <a
                  href={data.location_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-8 px-8 py-3 rounded-md text-white"
                  style={{ backgroundColor: accentColor }}
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
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl text-center font-light mb-12" style={{ color: primaryColor }}>
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
        <section className="py-20" style={{ backgroundColor: "#F7F7F2" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl text-center font-light mb-12" style={{ color: primaryColor }}>
              Our Moments
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.gallery.map((image, index) => (
                <div 
                  key={index} 
                  className="aspect-square overflow-hidden rounded-md shadow-sm"
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
      
      {/* Footer */}
      <footer className="py-16 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-center">
            <div className="w-16 h-px bg-gray-300"></div>
            <Leaf className="mx-4" style={{ color: accentColor }} size={24} />
            <div className="w-16 h-px bg-gray-300"></div>
          </div>
          <h2 className="text-2xl font-light mb-4" style={{ color: primaryColor }}>
            Thank You
          </h2>
          <p className="text-lg" style={{ color: primaryColor }}>
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

export default MinimalistGreenTemplate;
