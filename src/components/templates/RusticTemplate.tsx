
import React from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface WeddingData {
  brideName?: string;
  bridePhoto?: string;
  brideFather?: string;
  brideMother?: string;
  groomName?: string;
  groomPhoto?: string;
  groomFather?: string;
  groomMother?: string;
  mainDate?: string;
  akadDate?: string;
  receptionDate?: string;
  location?: string;
  locationAddress?: string;
  locationMapUrl?: string;
  loveStory?: string;
  gallery?: string[];
  title?: string;
}

const RusticTemplate: React.FC<{ data?: WeddingData }> = ({ data }) => {
  if (!data) {
    data = {
      brideName: "Nama Pengantin Wanita",
      groomName: "Nama Pengantin Pria",
      mainDate: new Date().toISOString(),
      location: "Nama Lokasi Pernikahan",
      locationAddress: "Alamat Lokasi Pernikahan",
      loveStory: "Cerita cinta kami dimulai...",
    };
  }

  const formatDateLong = (dateString?: string) => {
    if (!dateString) return "-";
    
    try {
      const date = new Date(dateString);
      return format(date, "EEEE, dd MMMM yyyy", { locale: id });
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return "-";
    
    try {
      const date = new Date(dateString);
      return format(date, "HH:mm 'WIB'", { locale: id });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="font-montserrat text-gray-800 bg-wedding-ivory">
      {/* Cover */}
      <section 
        className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16 text-center bg-cover bg-center" 
        style={{
          backgroundImage: "url('/placeholder.svg')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(255,248,240,0.85)"
        }}
      >
        <div className="max-w-3xl mx-auto border-8 border-wedding-sage p-8 md:p-12 bg-white bg-opacity-90">
          <p className="text-sm md:text-base mb-2 text-wedding-sage tracking-wider">UNDANGAN PERNIKAHAN</p>
          <h1 className="text-4xl md:text-6xl font-dancing font-bold mb-6">
            {data.brideName} & {data.groomName}
          </h1>
          <div className="w-24 h-0.5 bg-wedding-sage mx-auto mb-6"></div>
          <p className="text-lg mb-4 font-playfair">{formatDateLong(data.mainDate)}</p>
          <p className="text-sm tracking-wider uppercase">{data.location}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl font-playfair mb-6">Bismillahirrahmanirrahim</h2>
          <p className="text-gray-700 mb-8">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan
            pernikahan putra putri kami:
          </p>

          <div className="grid md:grid-cols-2 gap-y-12 gap-x-8">
            <div>
              {data.bridePhoto && (
                <div className="mb-6 overflow-hidden rounded-full w-40 h-40 mx-auto border-4 border-wedding-sage">
                  <img 
                    src={data.bridePhoto} 
                    alt={data.brideName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl md:text-3xl mb-2 font-dancing font-bold">{data.brideName}</h3>
              {(data.brideFather || data.brideMother) && (
                <p className="text-gray-600 text-sm mb-4">
                  Putri dari Pasangan <br />
                  Bapak {data.brideFather || "..."} <br />
                  dan Ibu {data.brideMother || "..."}
                </p>
              )}
            </div>
            
            <div className="relative">
              <span className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-dancing text-wedding-sage">&</span>
              {data.groomPhoto && (
                <div className="mb-6 overflow-hidden rounded-full w-40 h-40 mx-auto border-4 border-wedding-sage">
                  <img 
                    src={data.groomPhoto} 
                    alt={data.groomName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl md:text-3xl mb-2 font-dancing font-bold">{data.groomName}</h3>
              {(data.groomFather || data.groomMother) && (
                <p className="text-gray-600 text-sm mb-4">
                  Putra dari Pasangan <br />
                  Bapak {data.groomFather || "..."} <br />
                  dan Ibu {data.groomMother || "..."}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section 
        className="py-16 px-4 bg-cover bg-center" 
        style={{
          backgroundImage: "url('/placeholder.svg')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(247,231,206,0.9)"
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 md:p-12 border border-wedding-sage">
            <h2 className="text-2xl md:text-3xl text-center font-dancing font-bold mb-12">
              Rangkaian Acara
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {data.akadDate && (
                <div className="text-center">
                  <div className="inline-block border-4 border-wedding-sage p-1 mb-4">
                    <div className="border border-wedding-sage p-4">
                      <h3 className="text-xl font-playfair mb-2">Akad Nikah</h3>
                      <p className="text-gray-600 mb-2">{formatDateLong(data.akadDate)}</p>
                      <p className="font-bold">{formatTime(data.akadDate)}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{data.location}</p>
                  <p className="text-gray-600 text-sm mt-1">{data.locationAddress}</p>
                </div>
              )}
              
              {data.receptionDate && (
                <div className="text-center">
                  <div className="inline-block border-4 border-wedding-sage p-1 mb-4">
                    <div className="border border-wedding-sage p-4">
                      <h3 className="text-xl font-playfair mb-2">Resepsi</h3>
                      <p className="text-gray-600 mb-2">{formatDateLong(data.receptionDate)}</p>
                      <p className="font-bold">{formatTime(data.receptionDate)}</p>
                    </div>
                  </div>
                  <p className="font-semibold">{data.location}</p>
                  <p className="text-gray-600 text-sm mt-1">{data.locationAddress}</p>
                </div>
              )}
            </div>

            {data.locationMapUrl && (
              <div className="mt-12 text-center">
                <a 
                  href={data.locationMapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-wedding-sage hover:bg-opacity-80 text-white font-medium px-6 py-3 rounded-md transition-colors"
                >
                  Lihat Lokasi di Google Maps
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Love Story */}
      {data.loveStory && (
        <section className="bg-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block border-4 border-wedding-sage p-1 mb-8">
              <div className="border border-wedding-sage py-2 px-8">
                <h2 className="text-2xl font-dancing font-bold">
                  Cerita Cinta Kami
                </h2>
              </div>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-line text-gray-700">
                {data.loveStory}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="bg-wedding-ivory py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block border-4 border-wedding-sage p-1 mb-12">
              <div className="border border-wedding-sage py-2 px-8">
                <h2 className="text-2xl font-dancing font-bold">
                  Galeri Foto
                </h2>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.gallery.map((photo, index) => (
                <div key={index} className="overflow-hidden border-2 border-wedding-champagne">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quote */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-wedding-sage mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="italic text-gray-700 max-w-2xl mx-auto">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
          </p>
          <p className="mt-4 text-wedding-sage font-semibold">QS. Ar-Rum: 21</p>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-wedding-champagne py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-dancing font-bold mb-4">
            Terima Kasih
          </h2>
          <p className="text-gray-700 mb-6">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
          <div className="w-20 h-0.5 bg-wedding-sage mx-auto mb-8"></div>
          <h3 className="text-2xl font-dancing font-bold mb-2">
            {data.brideName} & {data.groomName}
          </h3>
          <p className="text-gray-700 font-playfair">
            {formatDateLong(data.mainDate)}
          </p>
        </div>
      </section>
    </div>
  );
};

export default RusticTemplate;
