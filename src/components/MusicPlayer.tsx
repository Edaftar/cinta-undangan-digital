
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { extractYoutubeId, extractSpotifyId } from "@/utils/musicUtils";

interface MusicPlayerProps {
  musicUrl?: string;
  audioUrl?: string;  // Added for backward compatibility
  title?: string;
  artist?: string;
  autoplay?: boolean;
  initialMuted?: boolean;
  iconOnly?: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  musicUrl,
  audioUrl,
  title,
  artist,
  autoplay = false,
  initialMuted = false,
  iconOnly = false,
}) => {
  // Use audioUrl as fallback if musicUrl is not provided
  const audioSource = musicUrl || audioUrl;
  
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(initialMuted);
  const [volume, setVolume] = useState(70);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const youtubeId = audioSource ? extractYoutubeId(audioSource) : null;
  const spotifyId = audioSource ? extractSpotifyId(audioSource) : null;
  const isExternalPlayer = !!(youtubeId || spotifyId);

  useEffect(() => {
    if (!isExternalPlayer && audioSource) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioSource);
        audioRef.current.loop = true;
      } else {
        audioRef.current.src = audioSource;
      }

      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;

      if (autoplay && !isMuted) {
        audioRef.current.play()
          .catch(error => {
            console.log("Autoplay prevented by browser:", error);
            setIsPlaying(false);
          });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [audioSource, autoplay, isMuted]);

  const togglePlay = () => {
    if (isExternalPlayer) {
      // Can't control external player directly
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play()
          .catch(error => console.log("Playback failed:", error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  if (!audioSource) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-full border border-wedding-champagne px-3 py-2 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`rounded-full ${isMuted ? "text-gray-400" : "text-wedding-rosegold"}`}
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>

        {showVolumeControl && !iconOnly && (
          <div className="w-24 mx-2">
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="cursor-pointer"
            />
          </div>
        )}

        <Button 
          variant="ghost" 
          size="sm" 
          className="text-wedding-rosegold rounded-full"
          onClick={() => setShowVolumeControl(!showVolumeControl)}
        >
          <Music size={18} />
        </Button>

        {!isExternalPlayer && !iconOnly && (
          <span className="text-xs text-gray-500 ml-1 hidden sm:inline">
            {isPlaying ? "Musik dimainkan" : "Musik dihentikan"}
          </span>
        )}
        
        {(title || artist) && !iconOnly && (
          <div className="ml-2 hidden sm:block">
            <div className="text-xs font-medium">{title}</div>
            {artist && <div className="text-xs text-gray-500">{artist}</div>}
          </div>
        )}
      </div>

      {/* Hidden audio element for YouTube or Spotify if needed */}
      {isExternalPlayer && (
        <div className="hidden">
          {youtubeId && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=${!isMuted && autoplay ? '1' : '0'}&controls=0&loop=1&playlist=${youtubeId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="YouTube Music Player"
            />
          )}
          {spotifyId && (
            <iframe
              src={`https://open.spotify.com/embed/track/${spotifyId}`}
              title="Spotify Music Player"
              allow="encrypted-media"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
