
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarCheck, Clock, MapPin, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface WeddingData {
  brideFullName: string;
  brideName: string;
  brideBio?: string;
  brideParents: string;
  groomFullName: string;
  groomName: string;
  groomBio?: string;
  groomParents: string;
  akadDate: Date;
  akadLocation: string;
  akadAddress: string;
  receptionDate: Date;
  receptionLocation: string;
  receptionAddress: string;
  loveStory?: string;
  photos: { id: number; url: string }[];
}

interface ElegantRoseTemplateProps {
  data?: WeddingData;
  isPreview?: boolean;
}

const ElegantRoseTemplate = ({ data, isPreview = false }: ElegantRoseTemplateProps) => {
  // If no data provided (for example in template gallery), use placeholder data
  const previewData = data || {
    brideFullName: "Putri Setiawati",
    brideName: "Putri",
    brideBio: "",
    brideParents: "Putri dari Bapak Setiawan dan Ibu Rahayu",
    groomFullName: "Adi Nugroho",
    groomName: "Adi",
    groomBio: "",
    groomParents: "Putra dari Bapak Nugroho dan Ibu Wati",
    akadDate: new Date("2025-06-20T09:00:00"),
    akadLocation: "Masjid Al-Akbar",
    akadAddress: "Jl. Ahmad Yani No. 10, Jakarta Selatan",
    receptionDate: new Date("2025-06-20T13:00:00"),
    receptionLocation: "Balai Samudera",
    receptionAddress: "Jl. Gatot Subroto No. 20, Jakarta Selatan",
    loveStory: "Kami bertemu pertama kali di sebuah acara kampus. Sejak saat itu, kami menjalani hubungan yang penuh dengan cinta dan kebahagiaan.",
    photos: [
      { id: 1, url: "/placeholder.svg" },
      { id: 2, url: "/placeholder.svg" },
    ],
  };

  const weddingData = isPreview ? previewData : data || previewData;
  
  // Ensure photos is always an array
  const safePhotos = Array.isArray(weddingData.photos) ? weddingData.photos : [];
  
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Cover Section */}
      <div className="relative h-[60vh] md:h-[80vh] bg-gradient-to-b from-wedding-champagne/20 to-white flex items-center justify-center">
        <div className="absolute inset-0 bg-elegant-pattern bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center p-6 animate-fade-in">
          <p className="font-great-vibes text-4xl md:text-5xl text-wedding-rosegold mb-6">Undangan Pernikahan</p>
          <h1 className="font-cormorant text-5xl md:text-7xl font-light mb-8 text-wedding-text tracking-wide">
            {weddingData.brideName} <span className="font-great-vibes text-wedding-rosegold">&</span> {weddingData.groomName}
          </h1>
          <p className="text-xl md:text-2xl text-wedding-text mb-8 font-cormorant tracking-wider">
            {weddingData.akadDate && format(weddingData.akadDate, "dd.MM.yyyy", { locale: id })}
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-0.5 bg-wedding-rosegold"></div>
            <Heart size={24} className="text-wedding-rosegold fill-wedding-rosegold" />
            <div className="w-16 h-0.5 bg-wedding-rosegold"></div>
          </div>
        </div>
      </div>

      {/* Couple Section */}
      <section className="py-20 px-6 bg-wedding-ivory">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-great-vibes text-4xl md:text-5xl font-normal mb-12 text-wedding-rosegold">Mempelai</h2>
          
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-6 transform transition duration-500 hover:scale-105">
              <div className="w-52 h-52 mx-auto rounded-full overflow-hidden border-4 border-wedding-rosegold shadow-lg p-1">
                <img src={safePhotos[0]?.url || "/placeholder.svg"} alt="Bride" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className="font-cormorant text-3xl font-semibold text-wedding-rosegold">{weddingData.brideFullName}</h3>
                <p className="mt-2 text-wedding-text font-light italic">{weddingData.brideParents}</p>
                {weddingData.brideBio && <p className="mt-4 italic text-gray-600">{weddingData.brideBio}</p>}
              </div>
            </div>

            <div className="space-y-6 transform transition duration-500 hover:scale-105">
              <div className="w-52 h-52 mx-auto rounded-full overflow-hidden border-4 border-wedding-rosegold shadow-lg p-1">
                <img src={safePhotos[1]?.url || "/placeholder.svg"} alt="Groom" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className="font-cormorant text-3xl font-semibold text-wedding-rosegold">{weddingData.groomFullName}</h3>
                <p className="mt-2 text-wedding-text font-light italic">{weddingData.groomParents}</p>
                {weddingData.groomBio && <p className="mt-4 italic text-gray-600">{weddingData.groomBio}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 px-6 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-wedding-ivory" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}></div>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-great-vibes text-4xl md:text-5xl font-normal mb-16 text-wedding-rosegold">Acara</h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-24">
            <div className="bg-gradient-to-br from-wedding-light-blush to-white p-8 rounded-lg shadow-md space-y-6 border border-wedding-champagne/30 transform transition duration-500 hover:-translate-y-2 hover:shadow-lg">
              <h3 className="font-cormorant text-3xl font-semibold text-wedding-text">Akad Nikah</h3>
              <div className="flex items-center justify-center gap-3">
                <CalendarCheck size={20} className="text-wedding-rosegold" />
                <p className="font-cormorant text-lg">
                  {weddingData.akadDate && format(weddingData.akadDate, "EEEE, dd MMMM yyyy", { locale: id })}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock size={20} className="text-wedding-rosegold" />
                <p className="font-cormorant text-lg">
                  {weddingData.akadDate && format(weddingData.akadDate, "HH.mm", { locale: id })} WIB
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-3">
                  <MapPin size={20} className="text-wedding-rosegold" />
                  <p className="font-medium font-cormorant text-lg">{weddingData.akadLocation}</p>
                </div>
                <p className="text-sm text-gray-600">{weddingData.akadAddress}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-wedding-light-blush to-white p-8 rounded-lg shadow-md space-y-6 border border-wedding-champagne/30 transform transition duration-500 hover:-translate-y-2 hover:shadow-lg">
              <h3 className="font-cormorant text-3xl font-semibold text-wedding-text">Resepsi</h3>
              <div className="flex items-center justify-center gap-3">
                <CalendarCheck size={20} className="text-wedding-rosegold" />
                <p className="font-cormorant text-lg">
                  {weddingData.receptionDate && format(weddingData.receptionDate, "EEEE, dd MMMM yyyy", { locale: id })}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock size={20} className="text-wedding-rosegold" />
                <p className="font-cormorant text-lg">
                  {weddingData.receptionDate && format(weddingData.receptionDate, "HH.mm", { locale: id })} WIB
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-3">
                  <MapPin size={20} className="text-wedding-rosegold" />
                  <p className="font-medium font-cormorant text-lg">{weddingData.receptionLocation}</p>
                </div>
                <p className="text-sm text-gray-600">{weddingData.receptionAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {safePhotos.length > 0 && (
        <section className="py-20 px-6 bg-wedding-ivory">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-great-vibes text-4xl md:text-5xl font-normal mb-16 text-wedding-rosegold">Galeri</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {safePhotos.map((photo) => (
                <div key={photo.id} className="aspect-square overflow-hidden rounded-lg shadow-md group">
                  <img 
                    src={photo.url} 
                    alt="Foto Prewedding" 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Love Story Section */}
      {weddingData.loveStory && (
        <section className="py-20 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-great-vibes text-4xl md:text-5xl font-normal mb-16 text-wedding-rosegold flex items-center justify-center gap-4">
              <Heart size={24} fill="#E8B4BD" className="text-wedding-rosegold" />
              <span>Kisah Cinta</span>
              <Heart size={24} fill="#E8B4BD" className="text-wedding-rosegold" />
            </h2>
            <div className="bg-gradient-to-br from-wedding-light-blush to-white p-8 rounded-lg shadow-md border border-wedding-champagne/30">
              <p className="text-gray-700 leading-relaxed font-light italic font-cormorant text-xl">
                "{weddingData.loveStory}"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <section className="py-16 px-6 bg-gradient-to-r from-wedding-rosegold to-wedding-deep-rosegold text-white text-center">
        <h2 className="font-great-vibes text-4xl md:text-5xl mb-6">Terima Kasih</h2>
        <p className="font-cormorant text-2xl">
          {weddingData.brideName} <span className="font-great-vibes">&</span> {weddingData.groomName}
        </p>
      </section>
    </div>
  );
};

export default ElegantRoseTemplate;
