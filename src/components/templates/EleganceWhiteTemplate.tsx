
import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarCheck, Map, Clock, Heart, ChevronDown } from 'lucide-react';

interface TemplateProps {
  data: {
    bride_name: string;
    groom_name: string;
    bride_photo?: string;
    groom_photo?: string;
    bride_mother?: string;
    bride_father?: string;
    groom_mother?: string;
    groom_father?: string;
    main_date: string;
    akad_date?: string;
    reception_date?: string;
    location: string;
    location_address?: string;
    location_map_url?: string;
    love_story?: string;
    gallery?: string[];
  };
}

const EleganceWhiteTemplate = ({ data }: TemplateProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();
  
  useEffect(() => {
    setIsLoaded(true);
    controls.start("visible");
  }, [controls]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return {
        fullDate: format(date, "EEEE, d MMMM yyyy", { locale: id }),
        time: format(date, "HH:mm 'WIB'")
      };
    } catch (error) {
      console.error("Error formatting date:", error);
      return { fullDate: dateString, time: "" };
    }
  };

  const mainDateFormatted = formatDate(data.main_date);
  const akadDateFormatted = data.akad_date ? formatDate(data.akad_date) : null;
  const receptionDateFormatted = data.reception_date ? formatDate(data.reception_date) : null;

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.3 }
    }
  };

  return (
    <div className="font-serif">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        </div>

        <motion.div 
          className="z-10 max-w-3xl mx-auto"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
        >
          <motion.div variants={textVariants} className="mb-4">
            <p className="text-gray-600 text-sm md:text-base">Kami mengundang Anda untuk merayakan pernikahan</p>
          </motion.div>
          
          <motion.div variants={textVariants} className="mb-8">
            <h1 className="text-5xl md:text-7xl font-serif font-light text-gray-800 mb-2">
              {data.bride_name} <span className="font-normal text-gray-400">&</span> {data.groom_name}
            </h1>
          </motion.div>
          
          <motion.div variants={textVariants} className="mb-12">
            <div className="inline-block border border-gray-300 py-4 px-8 rounded-lg">
              <p className="text-xl font-light text-gray-700">{mainDateFormatted.fullDate}</p>
            </div>
          </motion.div>
          
          <motion.div 
            variants={textVariants} 
            className="absolute bottom-12 left-0 right-0 text-center"
          >
            <ChevronDown className="h-8 w-8 text-gray-400 mx-auto animate-bounce" />
          </motion.div>
        </motion.div>
      </section>

      {/* Couple Photos */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2 
            className="text-center text-3xl md:text-4xl font-serif text-gray-700 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Calon Pengantin
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Bride */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 relative mx-auto w-64 h-64 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img 
                  src={data.bride_photo || '/placeholder.svg'} 
                  alt={data.bride_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif text-gray-800">{data.bride_name}</h3>
              {(data.bride_father || data.bride_mother) && (
                <p className="text-gray-600 mt-2">
                  Putri dari {data.bride_father && `Bapak ${data.bride_father}`}
                  {data.bride_father && data.bride_mother && ' & '}
                  {data.bride_mother && `Ibu ${data.bride_mother}`}
                </p>
              )}
            </motion.div>
            
            {/* Groom */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-6 relative mx-auto w-64 h-64 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img 
                  src={data.groom_photo || '/placeholder.svg'} 
                  alt={data.groom_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif text-gray-800">{data.groom_name}</h3>
              {(data.groom_father || data.groom_mother) && (
                <p className="text-gray-600 mt-2">
                  Putra dari {data.groom_father && `Bapak ${data.groom_father}`}
                  {data.groom_father && data.groom_mother && ' & '}
                  {data.groom_mother && `Ibu ${data.groom_mother}`}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Save The Date */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Save The Date
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Akad Ceremony */}
            {akadDateFormatted && (
              <motion.div 
                className="bg-gray-50 p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-serif text-gray-800 mb-4">Akad Nikah</h3>
                <div className="flex justify-center items-center mb-4">
                  <CalendarCheck className="w-5 h-5 text-gray-500 mr-2" />
                  <p className="text-gray-700">{akadDateFormatted.fullDate}</p>
                </div>
                <div className="flex justify-center items-center mb-4">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  <p className="text-gray-700">{akadDateFormatted.time}</p>
                </div>
                <div className="flex justify-center items-center">
                  <Map className="w-5 h-5 text-gray-500 mr-2" />
                  <p className="text-gray-700">{data.location}</p>
                </div>
                {data.location_address && (
                  <p className="mt-2 text-sm text-gray-600">{data.location_address}</p>
                )}
              </motion.div>
            )}
            
            {/* Reception */}
            <motion.div 
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-serif text-gray-800 mb-4">Resepsi Pernikahan</h3>
              <div className="flex justify-center items-center mb-4">
                <CalendarCheck className="w-5 h-5 text-gray-500 mr-2" />
                <p className="text-gray-700">
                  {receptionDateFormatted ? receptionDateFormatted.fullDate : mainDateFormatted.fullDate}
                </p>
              </div>
              <div className="flex justify-center items-center mb-4">
                <Clock className="w-5 h-5 text-gray-500 mr-2" />
                <p className="text-gray-700">
                  {receptionDateFormatted ? receptionDateFormatted.time : mainDateFormatted.time}
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Map className="w-5 h-5 text-gray-500 mr-2" />
                <p className="text-gray-700">{data.location}</p>
              </div>
              {data.location_address && (
                <p className="mt-2 text-sm text-gray-600">{data.location_address}</p>
              )}
            </motion.div>
          </div>
          
          {/* Map Link */}
          {data.location_map_url && (
            <motion.div 
              className="mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <a 
                href={data.location_map_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Map className="w-5 h-5 mr-2" />
                Lihat Lokasi di Google Maps
              </a>
            </motion.div>
          )}
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gray-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>
      </section>

      {/* Love Story */}
      {data.love_story && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Heart className="h-8 w-8 text-gray-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Cerita Cinta Kami</h2>
              <div 
                className="prose prose-gray mx-auto text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: data.love_story }}
              ></div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif text-gray-800 mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Galeri Foto
            </motion.h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {data.gallery.map((image, index) => (
                <motion.div 
                  key={index}
                  className="aspect-square overflow-hidden rounded-lg shadow-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing */}
      <section className="py-20 px-4 bg-gray-50 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-6">Terima Kasih</h2>
            <p className="text-gray-600 mb-8">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.
            </p>
            <p className="text-xl font-serif text-gray-700">
              {data.bride_name} & {data.groom_name}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-white text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} - Digital Wedding Invitation</p>
      </footer>
    </div>
  );
};

export default EleganceWhiteTemplate;
