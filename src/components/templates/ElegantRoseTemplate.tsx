
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
      <div className="relative h-[50vh] md:h-[70vh] bg-gradient-to-b from-wedding-champagne/40 to-wedding-ivory flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="relative z-10 text-center p-6">
          <p className="font-dancing text-3xl md:text-4xl text-wedding-rosegold mb-4">Undangan Pernikahan</p>
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 text-wedding-text">
            {weddingData.brideName} &amp; {weddingData.groomName}
          </h1>
          <p className="text-xl md:text-2xl text-wedding-text mb-8">
            {weddingData.akadDate && format(weddingData.akadDate, "dd.MM.yyyy", { locale: id })}
          </p>
          <div className="w-32 h-1 bg-wedding-rosegold mx-auto"></div>
        </div>
      </div>

      {/* Couple Section */}
      <section className="py-16 px-6 bg-wedding-ivory">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-10 text-wedding-text">Mempelai</h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="space-y-6">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-wedding-rosegold">
                <img src={safePhotos[0]?.url || "/placeholder.svg"} alt="Bride" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-wedding-rosegold">{weddingData.brideFullName}</h3>
                <p className="mt-2 text-wedding-text">{weddingData.brideParents}</p>
                {weddingData.brideBio && <p className="mt-4 italic text-gray-600">{weddingData.brideBio}</p>}
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-wedding-rosegold">
                <img src={safePhotos[1]?.url || "/placeholder.svg"} alt="Groom" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-semibold text-wedding-rosegold">{weddingData.groomFullName}</h3>
                <p className="mt-2 text-wedding-text">{weddingData.groomParents}</p>
                {weddingData.groomBio && <p className="mt-4 italic text-gray-600">{weddingData.groomBio}</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 px-6 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-wedding-ivory" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 0)" }}></div>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-wedding-text">Acara</h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="bg-wedding-light-blush p-8 rounded-lg shadow-md space-y-6">
              <h3 className="font-playfair text-2xl font-semibold text-wedding-text">Akad Nikah</h3>
              <div className="flex items-center justify-center gap-2">
                <CalendarCheck size={20} className="text-wedding-rosegold" />
                <p>
                  {weddingData.akadDate && format(weddingData.akadDate, "EEEE, dd MMMM yyyy", { locale: id })}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock size={20} className="text-wedding-rosegold" />
                <p>
                  {weddingData.akadDate && format(weddingData.akadDate, "HH.mm", { locale: id })} WIB
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={20} className="text-wedding-rosegold" />
                  <p className="font-medium">{weddingData.akadLocation}</p>
                </div>
                <p className="text-sm text-gray-600">{weddingData.akadAddress}</p>
              </div>
            </div>

            <div className="bg-wedding-light-blush p-8 rounded-lg shadow-md space-y-6">
              <h3 className="font-playfair text-2xl font-semibold text-wedding-text">Resepsi</h3>
              <div className="flex items-center justify-center gap-2">
                <CalendarCheck size={20} className="text-wedding-rosegold" />
                <p>
                  {weddingData.receptionDate && format(weddingData.receptionDate, "EEEE, dd MMMM yyyy", { locale: id })}
                </p>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock size={20} className="text-wedding-rosegold" />
                <p>
                  {weddingData.receptionDate && format(weddingData.receptionDate, "HH.mm", { locale: id })} WIB
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center gap-2">
                  <MapPin size={20} className="text-wedding-rosegold" />
                  <p className="font-medium">{weddingData.receptionLocation}</p>
                </div>
                <p className="text-sm text-gray-600">{weddingData.receptionAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {safePhotos.length > 0 && (
        <section className="py-16 px-6 bg-wedding-ivory">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-10 text-wedding-text">Galeri</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {safePhotos.map((photo) => (
                <div key={photo.id} className="aspect-square overflow-hidden rounded-lg shadow-md">
                  <img 
                    src={photo.url} 
                    alt="Foto Prewedding" 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Love Story Section */}
      {weddingData.loveStory && (
        <section className="py-16 px-6 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-10 text-wedding-text flex items-center justify-center gap-3">
              <Heart size={24} fill="#D8A7B1" className="text-wedding-rosegold" />
              <span>Kisah Cinta</span>
              <Heart size={24} fill="#D8A7B1" className="text-wedding-rosegold" />
            </h2>
            <div className="bg-wedding-light-blush p-8 rounded-lg shadow-md">
              <p className="text-gray-700 leading-relaxed font-light italic">
                "{weddingData.loveStory}"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <section className="py-12 px-6 bg-wedding-deep-rosegold text-white text-center">
        <h2 className="font-dancing text-3xl md:text-4xl mb-6">Terima Kasih</h2>
        <p className="font-playfair text-xl">
          {weddingData.brideName} &amp; {weddingData.groomName}
        </p>
      </section>
    </div>
  );
};

export default ElegantRoseTemplate;
