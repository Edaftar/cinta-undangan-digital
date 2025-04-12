
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

const MinimalistTemplate: React.FC<{ data?: WeddingData }> = ({ data }) => {
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
    <div className="font-montserrat text-gray-800">
      {/* Cover */}
      <section className="bg-white p-8 md:p-16 text-center min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-sm md:text-base mb-4 tracking-widest uppercase">Undangan Pernikahan</h3>
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            {data.brideName} <span className="font-playfair">&</span> {data.groomName}
          </h1>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>
          <p className="mb-8 text-gray-600">{formatDateLong(data.mainDate)}</p>
          <div className="inline-block border border-gray-200 px-6 py-3">
            <p className="text-sm tracking-widest uppercase">Save the Date</p>
          </div>
        </div>
      </section>

      {/* Bride & Groom */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl mb-12 tracking-wide font-light">
            Bismillahirrahmanirrahim
          </h2>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              {data.bridePhoto && (
                <div className="mb-6 overflow-hidden rounded-full w-40 h-40 mx-auto border-4 border-white shadow-md">
                  <img 
                    src={data.bridePhoto} 
                    alt={data.brideName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl md:text-2xl mb-2">{data.brideName}</h3>
              {(data.brideFather || data.brideMother) && (
                <p className="text-gray-600 text-sm mb-4">
                  Putri dari Bapak {data.brideFather || "..."} <br />
                  dan Ibu {data.brideMother || "..."}
                </p>
              )}
            </div>
            <div>
              {data.groomPhoto && (
                <div className="mb-6 overflow-hidden rounded-full w-40 h-40 mx-auto border-4 border-white shadow-md">
                  <img 
                    src={data.groomPhoto} 
                    alt={data.groomName} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl md:text-2xl mb-2">{data.groomName}</h3>
              {(data.groomFather || data.groomMother) && (
                <p className="text-gray-600 text-sm mb-4">
                  Putra dari Bapak {data.groomFather || "..."} <br />
                  dan Ibu {data.groomMother || "..."}
                </p>
              )}
            </div>
          </div>
          <div className="text-center">
            <p className="italic text-gray-600 max-w-2xl mx-auto">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
              <br /><br />
              (QS. Ar-Rum: 21)
            </p>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl mb-12 tracking-wide font-light">
            Rangkaian Acara
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {data.akadDate && (
              <div className="border border-gray-200 p-6">
                <h3 className="text-xl mb-4 font-semibold">Akad Nikah</h3>
                <div className="mb-4">
                  <p className="text-gray-600">{formatDateLong(data.akadDate)}</p>
                  <p className="font-bold mt-2">{formatTime(data.akadDate)}</p>
                </div>
                <div>
                  <p className="font-semibold">{data.location}</p>
                  <p className="text-gray-600 text-sm mt-2">{data.locationAddress}</p>
                </div>
              </div>
            )}
            
            {data.receptionDate && (
              <div className="border border-gray-200 p-6">
                <h3 className="text-xl mb-4 font-semibold">Resepsi</h3>
                <div className="mb-4">
                  <p className="text-gray-600">{formatDateLong(data.receptionDate)}</p>
                  <p className="font-bold mt-2">{formatTime(data.receptionDate)}</p>
                </div>
                <div>
                  <p className="font-semibold">{data.location}</p>
                  <p className="text-gray-600 text-sm mt-2">{data.locationAddress}</p>
                </div>
              </div>
            )}
          </div>

          {data.locationMapUrl && (
            <div className="mt-8">
              <a 
                href={data.locationMapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block border border-gray-300 px-6 py-3 text-sm hover:bg-gray-50 transition-colors"
              >
                Lihat Lokasi di Google Maps
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Love Story */}
      {data.loveStory && (
        <section className="bg-gray-50 py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl mb-12 tracking-wide font-light">
              Cerita Cinta Kami
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-line text-gray-600">
                {data.loveStory}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="bg-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl mb-12 tracking-wide font-light">
              Galeri
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.gallery.map((photo, index) => (
                <div key={index} className="overflow-hidden aspect-square">
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

      {/* Footer */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl mb-8 tracking-wide font-light">
            Terima Kasih
          </h2>
          <p className="text-gray-600 mb-8">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-8"></div>
          <h3 className="text-2xl mb-4">
            {data.brideName} <span className="font-playfair">&</span> {data.groomName}
          </h3>
          <p className="text-sm text-gray-500 italic">
            {formatDateLong(data.mainDate)}
          </p>
        </div>
      </section>
    </div>
  );
};

export default MinimalistTemplate;
