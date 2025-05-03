
import React from "react";
import { format } from "date-fns";
import { idID } from "date-fns/locale";
import MusicPlayer from "@/components/MusicPlayer";

interface ClassicGoldTemplateProps {
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

const ClassicGoldTemplate = ({ data }: ClassicGoldTemplateProps) => {
  const mainDate = new Date(data.main_date);
  const goldColor = "#D4AF37";
  
  return (
    <div className="font-serif" style={{ backgroundColor: "#FDF9F3" }}>
      {/* Hero Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center p-4 relative"
        style={{
          background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/placeholder.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center text-white z-10 max-w-3xl mx-auto p-8" style={{ border: `2px solid ${goldColor}` }}>
          <h3 className="text-xl md:text-2xl mb-4" style={{ color: goldColor }}>
            The Wedding of
          </h3>
          <h1 className="text-4xl md:text-6xl font-bold mb-8" style={{ color: goldColor }}>
            {data.bride_name} & {data.groom_name}
          </h1>
          <div className="mb-6 w-32 h-1 mx-auto" style={{ backgroundColor: goldColor }}></div>
          <p className="text-xl">
            {format(mainDate, "EEEE, dd MMMM yyyy", { locale: idID })}
          </p>
        </div>
      </section>

      {/* Couple */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl text-center font-bold mb-16" style={{ color: goldColor }}>
            The Bride & Groom
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="text-center">
              <div
                className="w-64 h-64 overflow-hidden mx-auto mb-6 p-2"
                style={{ border: `2px solid ${goldColor}` }}
              >
                <img
                  src={data.groom_photo || "/placeholder.svg"}
                  alt={data.groom_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{data.groom_name}</h3>
              {data.groom_father && data.groom_mother && (
                <p className="text-gray-600">
                  Son of Mr. {data.groom_father} & Mrs. {data.groom_mother}
                </p>
              )}
            </div>
            
            <div className="text-center">
              <div
                className="w-64 h-64 overflow-hidden mx-auto mb-6 p-2"
                style={{ border: `2px solid ${goldColor}` }}
              >
                <img
                  src={data.bride_photo || "/placeholder.svg"}
                  alt={data.bride_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{data.bride_name}</h3>
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
        className="py-20 text-center"
        style={{
          backgroundColor: "#33261D",
          color: "white",
        }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: goldColor }}>
            Wedding Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Wedding Ceremony */}
            <div className="p-6" style={{ border: `1px solid ${goldColor}` }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: goldColor }}>
                Wedding Ceremony
              </h3>
              <p className="text-lg mb-2">
                {format(mainDate, "EEEE, dd MMMM yyyy", { locale: idID })}
              </p>
              <p className="mb-4">{format(mainDate, "HH:mm")} WIB</p>
              <p>{data.location}</p>
              {data.location_address && <p className="mt-2">{data.location_address}</p>}
            </div>
            
            {/* Akad Nikah */}
            {data.akad_date && (
              <div className="p-6" style={{ border: `1px solid ${goldColor}` }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: goldColor }}>
                  Akad Nikah
                </h3>
                <p className="text-lg mb-2">
                  {format(new Date(data.akad_date), "EEEE, dd MMMM yyyy", { locale: idID })}
                </p>
                <p className="mb-4">{format(new Date(data.akad_date), "HH:mm")} WIB</p>
                <p>{data.location}</p>
              </div>
            )}
            
            {/* Reception */}
            {data.reception_date && (
              <div className="p-6" style={{ border: `1px solid ${goldColor}` }}>
                <h3 className="text-2xl font-bold mb-4" style={{ color: goldColor }}>
                  Reception
                </h3>
                <p className="text-lg mb-2">
                  {format(new Date(data.reception_date), "EEEE, dd MMMM yyyy", { locale: idID })}
                </p>
                <p className="mb-4">{format(new Date(data.reception_date), "HH:mm")} WIB</p>
                <p>{data.location}</p>
              </div>
            )}
          </div>
          
          {data.location_map_url && (
            <a
              href={data.location_map_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-12 px-8 py-3 text-sm uppercase tracking-wider font-semibold"
              style={{
                backgroundColor: goldColor,
                color: "#33261D",
              }}
            >
              Open Map Location
            </a>
          )}
        </div>
      </section>
      
      {/* Love Story */}
      {data.love_story && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-12" style={{ color: goldColor }}>
              Our Love Story
            </h2>
            <div className="prose prose-lg mx-auto">
              <p>{data.love_story}</p>
            </div>
          </div>
        </section>
      )}
      
      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20" style={{ backgroundColor: "#F5F0E5" }}>
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl text-center font-bold mb-12" style={{ color: goldColor }}>
              Our Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.gallery.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square overflow-hidden p-1"
                  style={{ border: `1px solid ${goldColor}` }}
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
      <footer
        className="py-12 text-center text-white"
        style={{ backgroundColor: "#33261D" }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6" style={{ color: goldColor }}>
            Thank You
          </h2>
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

export default ClassicGoldTemplate;
