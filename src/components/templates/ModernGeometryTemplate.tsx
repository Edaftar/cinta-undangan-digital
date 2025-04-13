
import React from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, MapPin, Heart } from 'lucide-react';

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

const ModernGeometryTemplate = ({ data }: { data: InvitationData }) => {
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
    <div className="bg-white min-h-screen">
      {/* Header with geometric patterns */}
      <div className="relative bg-slate-800 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-indigo-500 to-slate-900"></div>
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array(100).fill(0).map((_, i) => (
              <div key={i} className="border border-white opacity-10"></div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-40 h-40 border-2 border-indigo-300 opacity-30 transform rotate-45"></div>
          <div className="absolute w-60 h-60 border-2 border-indigo-300 opacity-20 transform rotate-45"></div>
          <div className="absolute w-80 h-80 border-2 border-indigo-300 opacity-10 transform rotate-45"></div>
        </div>
        <div className="relative z-10 text-center">
          <p className="text-indigo-200 tracking-widest mb-2">THE WEDDING OF</p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-sans">
            {data.bride_name} & {data.groom_name}
          </h2>
          <div className="flex justify-center items-center">
            <div className="h-0.5 w-12 bg-indigo-300"></div>
            <Heart className="h-5 w-5 mx-4 text-indigo-300" fill="currentColor" />
            <div className="h-0.5 w-12 bg-indigo-300"></div>
          </div>
          <p className="mt-6 text-indigo-200">{formatDate(data.main_date)}</p>
        </div>
      </div>

      {/* Couple Info */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-500 mb-8">Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami:</p>
          
          <div className="grid md:grid-cols-2 gap-12 mt-12">
            {/* Bride */}
            <div className="text-center">
              {data.bride_photo && (
                <div className="w-48 h-48 mb-6 mx-auto relative">
                  <div className="absolute inset-0 transform rotate-45 border-2 border-indigo-500"></div>
                  <div className="absolute inset-3 overflow-hidden transform rotate-45 border-2 border-white">
                    <img 
                      src={data.bride_photo} 
                      alt={data.bride_name} 
                      className="absolute inset-0 w-full h-full object-cover transform -rotate-45 scale-150"
                    />
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-medium text-gray-800 mb-2">{data.bride_name}</h3>
              {(data.bride_father || data.bride_mother) && (
                <p className="text-gray-500">
                  Putri dari Bapak {data.bride_father || '___'} & Ibu {data.bride_mother || '___'}
                </p>
              )}
            </div>
            
            {/* Groom */}
            <div className="text-center">
              {data.groom_photo && (
                <div className="w-48 h-48 mb-6 mx-auto relative">
                  <div className="absolute inset-0 transform rotate-45 border-2 border-indigo-500"></div>
                  <div className="absolute inset-3 overflow-hidden transform rotate-45 border-2 border-white">
                    <img 
                      src={data.groom_photo} 
                      alt={data.groom_name} 
                      className="absolute inset-0 w-full h-full object-cover transform -rotate-45 scale-150"
                    />
                  </div>
                </div>
              )}
              <h3 className="text-2xl font-medium text-gray-800 mb-2">{data.groom_name}</h3>
              {(data.groom_father || data.groom_mother) && (
                <p className="text-gray-500">
                  Putra dari Bapak {data.groom_father || '___'} & Ibu {data.groom_mother || '___'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Event Details */}
      <div className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-slate-100">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Detail Acara</h2>
            <div className="flex justify-center items-center">
              <div className="h-0.5 w-12 bg-indigo-500"></div>
              <div className="w-2 h-2 mx-2 bg-indigo-500 transform rotate-45"></div>
              <div className="h-0.5 w-12 bg-indigo-500"></div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Akad */}
            {data.akad_date && (
              <Card className="overflow-hidden border-none shadow-xl">
                <div className="h-2 bg-indigo-500"></div>
                <CardContent className="pt-6">
                  <div className="relative mb-8 text-center">
                    <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200"></div>
                    <span className="relative bg-white px-4 text-lg font-medium text-indigo-600">Akad Nikah</span>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                      <p className="text-gray-600">{formatDate(data.akad_date)}</p>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                      <p className="text-gray-600">{formatTime(data.akad_date)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Reception */}
            <Card className="overflow-hidden border-none shadow-xl">
              <div className="h-2 bg-indigo-500"></div>
              <CardContent className="pt-6">
                <div className="relative mb-8 text-center">
                  <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200"></div>
                  <span className="relative bg-white px-4 text-lg font-medium text-indigo-600">Resepsi</span>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
                    <p className="text-gray-600">{formatDate(data.reception_date || data.main_date)}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-indigo-500 mr-2" />
                    <p className="text-gray-600">{formatTime(data.reception_date || data.main_date)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Location */}
          <div className="mt-8">
            <Card className="overflow-hidden border-none shadow-xl">
              <div className="h-2 bg-indigo-500"></div>
              <CardContent className="pt-6">
                <div className="relative mb-8 text-center">
                  <div className="absolute left-0 top-1/2 w-full h-px bg-gray-200"></div>
                  <span className="relative bg-white px-4 text-lg font-medium text-indigo-600">Lokasi</span>
                </div>
                
                <div className="flex flex-col items-center space-y-4">
                  <p className="text-gray-800 font-medium text-center">{data.location}</p>
                  
                  {data.location_address && (
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                      <p className="text-gray-600">{data.location_address}</p>
                    </div>
                  )}
                  
                  {data.location_map_url && (
                    <div className="mt-4">
                      <a 
                        href={data.location_map_url}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-indigo-500 text-white px-6 py-2 rounded inline-flex items-center hover:bg-indigo-600 transition-colors"
                      >
                        <MapPin className="h-4 w-4 mr-2" />
                        Lihat Lokasi
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Love Story */}
      {data.love_story && (
        <div className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Kisah Cinta</h2>
              <div className="flex justify-center items-center">
                <div className="h-0.5 w-12 bg-indigo-500"></div>
                <Heart className="h-5 w-5 mx-4 text-indigo-500" fill="currentColor" />
                <div className="h-0.5 w-12 bg-indigo-500"></div>
              </div>
            </div>
            <div className="prose prose-slate mx-auto">
              <p className="text-gray-600 whitespace-pre-line text-center">{data.love_story}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Gallery */}
      {data.gallery && data.gallery.length > 0 && (
        <div className="py-20 px-4 bg-gradient-to-br from-indigo-50 to-slate-100">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Galeri Foto</h2>
              <div className="flex justify-center items-center">
                <div className="h-0.5 w-12 bg-indigo-500"></div>
                <div className="w-2 h-2 mx-2 bg-indigo-500 transform rotate-45"></div>
                <div className="h-0.5 w-12 bg-indigo-500"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {data.gallery.map((photo, index) => (
                <div key={index} className="aspect-square relative group overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-20 transition-opacity z-10"></div>
                  <img 
                    src={photo} 
                    alt={`Gallery ${index + 1}`} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="py-20 px-4 bg-slate-800 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
            {Array(100).fill(0).map((_, i) => (
              <div key={i} className="border border-white opacity-10"></div>
            ))}
          </div>
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h3 className="text-3xl font-bold mb-6">Terima Kasih</h3>
          <p className="mb-8 text-indigo-200">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <div className="flex justify-center items-center mb-8">
            <div className="h-0.5 w-12 bg-indigo-300"></div>
            <Heart className="h-5 w-5 mx-4 text-indigo-300" fill="currentColor" />
            <div className="h-0.5 w-12 bg-indigo-300"></div>
          </div>
          <h4 className="text-2xl font-bold text-indigo-200">
            {data.bride_name} & {data.groom_name}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ModernGeometryTemplate;
