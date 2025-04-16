
import React from 'react';
import { Card, CardContent } from './ui/card';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface InteractiveMapProps {
  locationAddress: string;
  locationMapUrl: string;
  embedUrl?: string;
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  locationAddress, 
  locationMapUrl,
  embedUrl,
  className = ''
}) => {
  // If embed URL is not provided, try to create one from the Google Maps URL
  const getEmbedUrl = (): string => {
    if (embedUrl) return embedUrl;
    
    // Try to extract the place ID or coordinates from a Google Maps URL
    if (locationMapUrl.includes('google.com/maps')) {
      try {
        // For URLs like https://maps.app.goo.gl/XXX or https://goo.gl/maps/XXX
        if (locationMapUrl.includes('goo.gl')) {
          return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15000!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0!2s!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid`;
        }
        
        // For URLs containing ?q= parameter (search query)
        if (locationMapUrl.includes('?q=')) {
          const query = locationMapUrl.split('?q=')[1].split('&')[0];
          return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(query)}`;
        }
        
        // For URLs containing /place/ parameter
        if (locationMapUrl.includes('/place/')) {
          const place = locationMapUrl.split('/place/')[1].split('/')[0];
          return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(place)}`;
        }
      } catch (error) {
        console.error("Error creating embed URL:", error);
      }
    }
    
    // Fallback: use the address as a search query
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(locationAddress)}`;
  };

  return (
    <motion.div 
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden bg-white shadow-md">
        <CardContent className="p-0">
          <AspectRatio ratio={16/9}>
            <iframe
              src={getEmbedUrl()}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
              title="Lokasi Acara"
            ></iframe>
          </AspectRatio>
          <div className="p-4">
            <p className="text-sm text-gray-600 mb-3">{locationAddress}</p>
            <Button 
              variant="default"
              className="w-full bg-wedding-sage hover:bg-wedding-sage/80 text-white"
              asChild
            >
              <a 
                href={locationMapUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                Buka di Google Maps
                <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InteractiveMap;
