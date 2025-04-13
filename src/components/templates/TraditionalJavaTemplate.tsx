
import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface InvitationData {
  id?: string;
  bride_name: string;
  bride_father?: string;
  bride_mother?: string;
  bride_photo?: string;
  groom_name: string;
  groom_father?: string;
  groom_mother?: string;
  groom_photo?: string;
  main_date: string;
  akad_date?: string;
  reception_date?: string;
  location: string;
  location_address?: string;
  location_map_url?: string;
  love_story?: string;
  gallery?: string[];
  [key: string]: any;
}

const TraditionalJavaTemplate = ({ data }: { data: InvitationData }) => {
  // Check if the date is valid before formatting
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'EEEE, d MMMM yyyy', { locale: id });
    } catch (error) {
      console.error('Invalid date format:', error);
      return dateString;
    }
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'HH:mm', { locale: id }) + ' WIB';
    } catch (error) {
      console.error('Invalid date format:', error);
      return '';
    }
  };

  return (
    <div className="bg-wedding-ivory min-h-screen">
      {/* Header with batik pattern */}
      <div className="relative bg-amber-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/batik-pattern.jpg')] bg-repeat"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-gold font-traditional text-4xl md:text-6xl mb-4">Undangan Pernikahan</h1>
          <div className="flex justify-center items-center">
            <hr className="w-12 border-t-2 border-gold" />
            <span className="mx-4 text-gold">&hearts;</span>
            <hr className="w-12 border-t-2 border-gold" />
          </div>
          <h2 className="text-3xl md:text-5xl mt-8 text-gold font-traditional">
            {data.bride_name} & {data.groom_name}
          </h2>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 px-4 text-center bg-amber-50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold text-amber-900 mb-8">Assalamu'alaikum Warahmatullahi Wabarakatuh</h3>
          <p className="text-amber-800 mb-6">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri resepsi pernikahan putra-putri kami:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Bride */}
            <div className="text-center">
              {data.bride_photo && (
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-700">
                  <img 
                    src={data.bride_photo} 
                    alt={data.bride_name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-3xl font-traditional text-amber-900 mb-2">{data.bride_name}</h3>
              {(data.bride_father || data.bride_mother) && (
                <p className="text-amber-700">
                  Putri dari Bapak {data.bride_father || '___'} & Ibu {data.bride_mother || '___'}
                </p>
              )}
            </div>
            
            {/* Groom */}
            <div className="text-center">
              {data.groom_photo && (
                <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-700">
                  <img 
                    src={data.groom_photo} 
                    alt={data.groom_name} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-3xl font-traditional text-amber-900 mb-2">{data.groom_name}</h3>
              {(data.groom_father || data.groom_mother) && (
                <p className="text-amber-700">
                  Putra dari Bapak {data.groom_father || '___'} & Ibu {data.groom_mother || '___'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="py-16 px-4 bg-amber-100 relative">
        <div className="absolute top-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/batik-border.png')] bg-repeat-x"></div>
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-traditional text-amber-900 mb-12">Jadwal Acara</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            {data.akad_date && (
              <Card className="bg-amber-50 border-amber-700">
                <CardContent className="pt-6 pb-4">
                  <h4 className="text-xl font-semibold text-amber-900 mb-4">Akad Nikah</h4>
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-5 w-5 text-amber-700 mr-2" />
                    <p className="text-amber-800">{formatDate(data.akad_date)}</p>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-5 w-5 text-amber-700 mr-2" />
                    <p className="text-amber-800">{formatTime(data.akad_date)}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Reception */}
            <Card className="bg-amber-50 border-amber-700">
              <CardContent className="pt-6 pb-4">
                <h4 className="text-xl font-semibold text-amber-900 mb-4">Resepsi</h4>
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-amber-700 mr-2" />
                  <p className="text-amber-800">{formatDate(data.reception_date || data.main_date)}</p>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-amber-700 mr-2" />
                  <p className="text-amber-800">{formatTime(data.reception_date || data.main_date)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Location */}
          <div className="mt-8">
            <Card className="bg-amber-50 border-amber-700">
              <CardContent className="pt-6 pb-4">
                <h4 className="text-xl font-semibold text-amber-900 mb-4">Lokasi</h4>
                <p className="text-amber-800 font-semibold mb-2">{data.location}</p>
                {data.location_address && (
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-amber-700 mr-2 flex-shrink-0" />
                    <p className="text-amber-800">{data.location_address}</p>
                  </div>
                )}
                
                {data.location_map_url && (
                  <div className="mt-4">
                    <a 
                      href={data.location_map_url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-amber-700 text-white px-4 py-2 rounded inline-flex items-center hover:bg-amber-800 transition-colors"
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Lihat Lokasi
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Love Story */}
      {data.love_story && (
        <div className="py-16 px-4 bg-amber-50">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-traditional text-amber-900 mb-8">Kisah Cinta</h3>
            <div className="prose prose-amber mx-auto">
              <p className="text-amber-800 whitespace-pre-line">{data.love_story}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <div className="py-16 px-4 bg-amber-100">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-traditional text-amber-900 mb-8">Galeri Foto</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.gallery.map((photo, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg border-4 border-amber-700">
                  <img 
                    src={photo} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="py-16 px-4 bg-amber-800 text-center text-white relative">
        <div className="absolute top-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/batik-border.png')] bg-repeat-x transform rotate-180"></div>
        <div className="max-w-3xl mx-auto">
          <h3 className="text-3xl font-traditional mb-6">Terima Kasih</h3>
          <p className="mb-4">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
          </p>
          <div className="flex justify-center items-center mb-8">
            <hr className="w-12 border-t-2 border-gold" />
            <span className="mx-4 text-gold">&hearts;</span>
            <hr className="w-12 border-t-2 border-gold" />
          </div>
          <h4 className="text-2xl font-traditional">
            {data.bride_name} & {data.groom_name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TraditionalJavaTemplate;
