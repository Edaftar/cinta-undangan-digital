
import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface MusicPlayerProps {
  audioUrl: string;
  title?: string;
  artist?: string;
  autoplay?: boolean;
  showControls?: boolean;
  iconOnly?: boolean;
}

const MusicPlayer = ({
  audioUrl,
  title,
  artist,
  autoplay = false,
  showControls = true,
  iconOnly = false
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    audio.addEventListener("canplaythrough", () => {
      setAudioReady(true);
      if (autoplay) {
        try {
          audio.play()
            .then(() => setIsPlaying(true))
            .catch((error) => {
              console.error("Autoplay prevented:", error);
              setIsPlaying(false);
            });
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
      }
    };
  }, [audioUrl, autoplay]);

  const togglePlay = () => {
    if (!audioRef.current || !audioReady) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  };

  if (iconOnly) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 right-4 z-10"
      >
        <Button
          variant="outline"
          size="sm"
          className="rounded-full h-10 w-10 flex items-center justify-center bg-white/80 backdrop-blur-sm border-none"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
          >
            <Music size={16} className={isPlaying ? "text-wedding-rosegold" : "text-gray-500"} />
          </motion.div>
        </Button>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-sm"
        >
          <Button
            variant="outline"
            size="sm"
            className="rounded-full h-8 w-8 flex items-center justify-center"
            onClick={togglePlay}
          >
            {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </Button>
          
          {(title || artist) && (
            <div className="text-xs text-gray-700">
              {title && <p className="font-medium">{title}</p>}
              {artist && <p className="text-gray-500">{artist}</p>}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPlayer;
