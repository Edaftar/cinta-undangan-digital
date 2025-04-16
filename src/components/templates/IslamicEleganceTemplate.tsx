
import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

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

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const IslamicEleganceTemplate = ({ data }: { data: InvitationData }) => {
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
    <div className="bg-emerald-50 min-h-screen font-serif">
      {/* Header with Islamic pattern */}
      <motion.div 
        className="relative bg-emerald-900 py-24 overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 1 } }
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-pattern.png')] bg-repeat"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 to-emerald-900/90"></div>
        <div className="relative z-10 text-center">
          <motion.h1 
            className="text-amber-300 font-islamic text-xl md:text-4xl mb-3 arabic-text"
            variants={fadeInUp}
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم
          </motion.h1>
          <motion.p 
            className="text-emerald-50 mb-8 italic"
            variants={fadeInUp}
          >
            Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang
          </motion.p>
          
          <motion.div 
            className="inline-block relative"
            variants={fadeInUp}
          >
            <div className="w-60 h-60 md:w-80 md:h-80 rounded-full border-4 border-amber-300 mx-auto mb-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-frame.png')] bg-contain bg-no-repeat bg-center opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <h2 className="text-3xl md:text-5xl text-white font-islamic tracking-wide leading-relaxed">
                  {data?.bride_name || 'Bride'} <span className="text-amber-300">&</span> {data?.groom_name || 'Groom'}
                </h2>
              </div>
            </div>
          </motion.div>
          
          <motion.h3 
            className="text-2xl md:text-3xl text-amber-300 font-islamic mt-4"
            variants={fadeInUp}
          >
            Undangan Pernikahan
          </motion.h3>
          <motion.p 
            className="text-emerald-50 mt-4"
            variants={fadeInUp}
          >
            {formatDate(data?.main_date) || 'Tanggal Pernikahan'}
          </motion.p>
        </div>
      </motion.div>

      {/* Quranic Verse */}
      <motion.div 
        className="py-16 px-4 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h3 
            className="text-xl md:text-2xl font-islamic text-emerald-800 mb-4 arabic-text leading-loose"
            variants={fadeInUp}
          >
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِقَوْمٍ يَتَفَكَّرُونَ
          </motion.h3>
          <motion.p 
            className="text-emerald-700 italic mb-4"
            variants={fadeInUp}
          >
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir."
          </motion.p>
          <motion.p 
            className="text-emerald-600"
            variants={fadeInUp}
          >
            (QS. Ar-Rum: 21)
          </motion.p>
        </div>
      </motion.div>

      {/* Introduction */}
      <motion.div 
        className="py-16 px-4 text-center bg-emerald-100 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }}
      >
        <div className="absolute top-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30 transform rotate-180"></div>
        
        <div className="max-w-3xl mx-auto">
          <motion.h3 
            className="text-2xl font-islamic text-emerald-800 mb-8"
            variants={fadeInUp}
          >
            Assalamu'alaikum Warahmatullahi Wabarakatuh
          </motion.h3>
          <motion.p 
            className="text-emerald-700 mb-6"
            variants={fadeInUp}
          >
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan:
          </motion.p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Bride */}
            <motion.div 
              className="text-center relative"
              variants={fadeInUp}
            >
              <div className="absolute top-0 right-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform rotate-90"></div>
              <div className="absolute bottom-0 left-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform -rotate-90"></div>
              
              <div className="py-8 px-4">
                {data?.bride_photo ? (
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-400 shadow-lg">
                    <img 
                      src={data.bride_photo} 
                      alt={data.bride_name || 'Bride'} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-400 bg-emerald-200 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-emerald-700" />
                  </div>
                )}
                <h3 className="text-3xl font-islamic text-emerald-800 mb-2">{data?.bride_name || 'Bride'}</h3>
                {(data?.bride_father || data?.bride_mother) && (
                  <p className="text-emerald-700">
                    Putri dari Bapak {data.bride_father || '___'} & Ibu {data.bride_mother || '___'}
                  </p>
                )}
              </div>
            </motion.div>
            
            {/* Groom */}
            <motion.div 
              className="text-center relative"
              variants={fadeInUp}
            >
              <div className="absolute top-0 right-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform rotate-90"></div>
              <div className="absolute bottom-0 left-4 w-16 h-16 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner.png')] bg-no-repeat bg-contain opacity-30 transform -rotate-90"></div>
              
              <div className="py-8 px-4">
                {data?.groom_photo ? (
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-400 shadow-lg">
                    <img 
                      src={data.groom_photo} 
                      alt={data.groom_name || 'Groom'} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-40 h-40 rounded-full mx-auto mb-4 overflow-hidden border-4 border-amber-400 bg-emerald-200 flex items-center justify-center">
                    <Heart className="h-16 w-16 text-emerald-700" />
                  </div>
                )}
                <h3 className="text-3xl font-islamic text-emerald-800 mb-2">{data?.groom_name || 'Groom'}</h3>
                {(data?.groom_father || data?.groom_mother) && (
                  <p className="text-emerald-700">
                    Putra dari Bapak {data.groom_father || '___'} & Ibu {data.groom_mother || '___'}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Event Details */}
      <motion.div 
        className="py-16 px-4 bg-emerald-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h3 
            className="text-3xl font-islamic text-emerald-800 mb-12"
            variants={fadeInUp}
          >
            Jadwal Acara
          </motion.h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            {data?.akad_date && (
              <motion.div variants={fadeInUp}>
                <Card className="bg-white border-amber-400 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 pb-6 relative">
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
              </motion.div>
            )}
            
            {/* Reception */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-white border-amber-400 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 pb-6 relative">
                  <div className="absolute top-0 right-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30 transform rotate-180"></div>
                  
                  <h4 className="text-xl font-islamic text-emerald-800 mb-4">Resepsi</h4>
                  <div className="flex items-center justify-center mb-2">
                    <Calendar className="h-5 w-5 text-amber-600 mr-2" />
                    <p className="text-emerald-700">{formatDate(data?.reception_date || data?.main_date)}</p>
                  </div>
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-5 w-5 text-amber-600 mr-2" />
                    <p className="text-emerald-700">{formatTime(data?.reception_date || data?.main_date)}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Location */}
          <motion.div 
            className="mt-8"
            variants={fadeInUp}
          >
            <Card className="bg-white border-amber-400 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="pt-6 pb-6 relative">
                <div className="absolute top-0 right-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-corner-small.png')] bg-no-repeat bg-contain opacity-30 transform rotate-180"></div>
                
                <h4 className="text-xl font-islamic text-emerald-800 mb-4">Lokasi</h4>
                <p className="text-emerald-700 font-semibold mb-2">{data?.location || 'Lokasi Pernikahan'}</p>
                {data?.location_address && (
                  <div className="flex items-center justify-center mb-4">
                    <MapPin className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0" />
                    <p className="text-emerald-700">{data.location_address}</p>
                  </div>
                )}
                
                {data?.location_map_url && (
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
          </motion.div>
        </div>
      </motion.div>
      
      {/* Love Story */}
      {data?.love_story && (
        <motion.div 
          className="py-16 px-4 bg-emerald-100 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
        >
          <div className="absolute top-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-full h-12 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-border.png')] bg-repeat-x opacity-30 transform rotate-180"></div>
          
          <div className="max-w-3xl mx-auto text-center">
            <motion.h3 
              className="text-3xl font-islamic text-emerald-800 mb-8"
              variants={fadeInUp}
            >
              Kisah Cinta
            </motion.h3>
            <motion.div 
              className="prose prose-emerald mx-auto"
              variants={fadeInUp}
            >
              <p className="text-emerald-700 whitespace-pre-line">{data.love_story}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {/* Gallery */}
      {data?.gallery && data.gallery.length > 0 && (
        <motion.div 
          className="py-16 px-4 bg-emerald-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.8 } }
          }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.h3 
              className="text-3xl font-islamic text-emerald-800 mb-8"
              variants={fadeInUp}
            >
              Galeri Foto
            </motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.gallery.map((photo, index) => (
                <motion.div 
                  key={index} 
                  className="aspect-square overflow-hidden rounded-lg border-4 border-amber-400 shadow-md hover:shadow-xl transition-shadow"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { 
                      opacity: 1, 
                      scale: 1, 
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.5 
                      } 
                    }
                  }}
                >
                  <img 
                    src={photo} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Footer */}
      <motion.div 
        className="py-16 px-4 bg-emerald-900 text-center text-white relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }}
      >
        <div className="absolute inset-0 opacity-20 bg-[url('https://qacrvdqrdymlxdfcubgk.supabase.co/storage/v1/object/public/wedding_photos/islamic-pattern.png')] bg-repeat"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h3 
            className="text-3xl font-islamic text-amber-300 mb-6 arabic-text"
            variants={fadeInUp}
          >
            بَارَكَ اللهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
          </motion.h3>
          <motion.p 
            className="text-emerald-100 italic mb-8"
            variants={fadeInUp}
          >
            "Semoga Allah memberkahimu dan mengumpulkan kalian berdua dalam kebaikan."
          </motion.p>
          <motion.p 
            className="mb-6"
            variants={fadeInUp}
          >
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
          </motion.p>
          <motion.h4 
            className="text-2xl font-islamic text-amber-300 mt-8"
            variants={fadeInUp}
          >
            Wassalamu'alaikum Warahmatullahi Wabarakatuh
          </motion.h4>
          
          <motion.h4 
            className="text-2xl font-islamic mt-8 text-amber-300"
            variants={fadeInUp}
          >
            {data?.bride_name || 'Bride'} & {data?.groom_name || 'Groom'}
          </motion.h4>
        </div>
      </motion.div>
      
      {/* CSS for better Arabic font styling */}
      <style>
        {`
          .arabic-text {
            direction: rtl;
            line-height: 1.8;
            letter-spacing: 0.5px;
          }
          @font-face {
            font-family: 'Islamic';
            src: url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap');
            font-display: swap;
          }
          .font-islamic {
            font-family: 'Scheherazade New', serif;
          }
        `}
      </style>
    </div>
  );
};

export default IslamicEleganceTemplate;
