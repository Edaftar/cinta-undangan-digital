
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

const IslamicOrnamentTemplate = ({ data }: { data: InvitationData }) => {
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
    <div className="bg-emerald-50 min-h-screen">
      {/* Header with Islamic pattern */}
      <div className="relative bg-emerald-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-pattern.png')] bg-repeat"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-amber-300 font-islamic text-xl md:text-2xl mb-3">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</h1>
          <p className="text-emerald-50 mb-8">Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang</p>
          
          <div className="inline-block relative">
            <div className="w-60 h-60 md:w-80 md:h-80 rounded-full border-4 border-amber-300 mx-auto mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-frame.png')] bg-contain bg-no-repeat bg-center opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-3xl md:text-5xl text-white font-islamic tracking-wide">
                  {data.bride_name} <span className="text-amber-300">&</span> {data.groom_name}
                </h2>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl md:text-3xl text-amber-300 font-islamic mt-4">Undangan Pernikahan</h3>
          <p className="text-emerald-50 mt-4">{formatDate(data.main_date)}</p>
        </div>
      </div>

      {/* Quranic Verse */}
      <div className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl md:text-2xl font-islamic text-emerald-800 mb-4">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
          </h3>
          <p className="text-emerald-700 italic mb-4">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
          </p>
          <p className="text-emerald-600">(QS. Ar-Rum: 21)</p>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-16 px-4 text-center bg-emerald-100 relative">
        <div className="absolute top-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30 transform rotate-180"></div>
        
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-islamic text-emerald-800 mb-8">Assalamu'alaikum Warahmatullahi Wabarakatuh</h3>
          <p className="text-emerald-700 mb-6">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Bride */}
            <div className="text-center relative">
              <div className="absolute top-0 right-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform rotate-90"></div>
              <div className="absolute bottom-0 left-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform -rotate-90"></div>
              
              <div className="py-8 px-4">
                {data.bride_photo && (
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-400">
                    <img 
                      src={data.bride_photo} 
                      alt={data.bride_name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-3xl font-islamic text-emerald-800 mb-2">{data.bride_name}</h3>
                {(data.bride_father || data.bride_mother) && (
                  <p className="text-emerald-700">
                    Putri dari Bapak {data.bride_father || '___'} & Ibu {data.bride_mother || '___'}
                  </p>
                )}
              </div>
            </div>
            
            {/* Groom */}
            <div className="text-center relative">
              <div className="absolute top-0 right-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform rotate-90"></div>
              <div className="absolute bottom-0 left-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform -rotate-90"></div>
              
              <div className="py-8 px-4">
                {data.groom_photo && (
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-400">
                    <img 
                      src={data.groom_photo} 
                      alt={data.groom_name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-3xl font-islamic text-emerald-800 mb-2">{data.groom_name}</h3>
                {(data.groom_father || data.groom_mother) && (
                  <p className="text-emerald-700">
                    Putra dari Bapak {data.groom_father || '___'} & Ibu {data.groom_mother || '___'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="py-16 px-4 bg-emerald-50">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-islamic text-emerald-800 mb-12">Jadwal Acara</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            {data.akad_date && (
              <Card className="bg-white border-amber-400">
                <CardContent className="pt-6 pb-4 relative">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30 transform rotate-180"></div>
                  
                  <h4 className="text-xl font-islamic text-emerald-800 mb-4">Akad Nikah</h4>
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                    <p className="text-emerald-700">{formatDate(data.akad_date)}</p>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-5 w-5 text-amber-600 mr-2" />
                    <p className="text-emerald-700">{formatTime(data.akad_date)}</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Reception */}
            <Card className="bg-white border-amber-400">
              <CardContent className="pt-6 pb-4 relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30 transform rotate-180"></div>
                
                <h4 className="text-xl font-islamic text-emerald-800 mb-4">Resepsi</h4>
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                  <p className="text-emerald-700">{formatDate(data.reception_date || data.main_date)}</p>
                </div>
                <div className="flex items-center justify-center mb-4">
                  <Clock className="h-5 w-5 text-amber-600 mr-2" />
                  <p className="text-emerald-700">{formatTime(data.reception_date || data.main_date)}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Location */}
          <div className="mt-8">
            <Card className="bg-white border-amber-400">
              <CardContent className="pt-6 pb-4 relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30 transform rotate-180"></div>
                
                <h4 className="text-xl font-islamic text-emerald-800 mb-4">Lokasi</h4>
                <p className="text-emerald-700 font-semibold mb-2">{data.location}</p>
                {data.location_address && (
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <p className="text-emerald-700">{data.location_address}</p>
                  </div>
                )}
                
                {data.location_map_url && (
                  <div className="mt-4">
                    <a 
                      href={data.location_map_url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-emerald-700 text-white px-4 py-2 rounded inline-flex items-center hover:bg-emerald-800 transition-colors"
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
        <div className="py-16 px-4 bg-emerald-100 relative">
          <div className="absolute top-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30 transform rotate-180"></div>
          
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl font-islamic text-emerald-800 mb-8">Kisah Cinta</h3>
            <div className="prose prose-emerald mx-auto">
              <p className="text-emerald-700 whitespace-pre-line">{data.love_story}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <div className="py-16 px-4 bg-emerald-50">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl font-islamic text-emerald-800 mb-8">Galeri Foto</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.gallery.map((photo, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg border-4 border-amber-400">
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
      <div className="py-16 px-4 bg-emerald-900 text-center text-white relative">
        <div className="absolute inset-0 opacity-20 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-pattern.png')] bg-repeat"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h3 className="text-3xl font-islamic text-amber-300 mb-6">
            بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </h3>
          <p className="text-emerald-100 italic mb-8">
            "Semoga Allah memberkahimu dan mengumpulkan kalian berdua dalam kebaikan."
          </p>
          <p className="mb-6">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
          </p>
          <h4 className="text-2xl font-islamic text-amber-300 mt-8">Wassalamu'alaikum Warahmatullahi Wabarakatuh</h4>
          
          <h4 className="text-2xl font-islamic mt-8 text-amber-300">
            {data.bride_name} & {data.groom_name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default IslamicOrnamentTemplate;
