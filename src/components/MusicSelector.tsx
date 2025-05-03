
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, ExternalLink, Play, Pause } from "lucide-react";
import { MusicOption, fetchActiveMusicOptions } from "@/services/musicService";
import { toast } from "sonner";
import { isSupportedMusicUrl } from "@/utils/musicUtils";

interface MusicSelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

export default function MusicSelector({ value, onChange }: MusicSelectorProps) {
  const [musicOptions, setMusicOptions] = useState<MusicOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMusicType, setSelectedMusicType] = useState<"library" | "external">("library");
  const [externalMusicUrl, setExternalMusicUrl] = useState("");
  const [selectedLibraryMusic, setSelectedLibraryMusic] = useState<string | null>(null);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  // Load music options from the library
  useEffect(() => {
    const loadMusicOptions = async () => {
      try {
        const data = await fetchActiveMusicOptions();
        setMusicOptions(data);
        
        // If value exists and it's one of our library options, select library tab
        if (value) {
          const isLibraryMusic = data.some(option => option.url === value);
          if (isLibraryMusic) {
            setSelectedMusicType("library");
            setSelectedLibraryMusic(value);
          } else {
            setSelectedMusicType("external");
            setExternalMusicUrl(value);
          }
        }
      } catch (error) {
        console.error("Failed to load music options:", error);
        toast.error("Gagal memuat pilihan musik");
      } finally {
        setLoading(false);
      }
    };

    loadMusicOptions();
  }, [value]);

  // Handle music selection change
  useEffect(() => {
    if (selectedMusicType === "library") {
      onChange(selectedLibraryMusic);
    } else {
      if (externalMusicUrl && isSupportedMusicUrl(externalMusicUrl)) {
        onChange(externalMusicUrl);
      } else if (externalMusicUrl) {
        // Don't clear the field, but don't update the value either
      } else {
        onChange(null);
      }
    }
  }, [selectedMusicType, selectedLibraryMusic, externalMusicUrl, onChange]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, [audioElement]);

  // Handle playing preview
  const handlePlayPreview = (url: string) => {
    // If already playing, stop it
    if (audioElement) {
      audioElement.pause();
      audioElement.src = "";
      setAudioElement(null);
      setPlayingUrl(null);
    }

    // If clicking on the same URL that's already playing, just stop
    if (playingUrl === url) {
      return;
    }

    // Create new audio element and play
    const audio = new Audio(url);
    audio.volume = 0.5;
    
    audio.oncanplaythrough = () => {
      audio.play().catch(err => {
        console.error("Failed to play audio:", err);
        toast.error("Gagal memutar audio");
      });
    };
    
    audio.onended = () => {
      setPlayingUrl(null);
      setAudioElement(null);
    };
    
    audio.onerror = () => {
      toast.error("URL audio tidak valid");
      setPlayingUrl(null);
      setAudioElement(null);
    };

    setAudioElement(audio);
    setPlayingUrl(url);
  };

  // Handle external URL validation
  const handleExternalUrlChange = (url: string) => {
    setExternalMusicUrl(url);
    if (url && !isSupportedMusicUrl(url)) {
      toast.warning("Format URL tidak didukung. Gunakan URL mp3 langsung, YouTube, atau Spotify.");
    }
  };

  return (
    <div className="space-y-4">
      <Label>Musik Latar</Label>
      
      <Tabs value={selectedMusicType} onValueChange={(v) => setSelectedMusicType(v as "library" | "external")}>
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="library" className="flex items-center gap-1">
            <Music className="h-4 w-4" />
            Pustaka Musik
          </TabsTrigger>
          <TabsTrigger value="external" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            Link Eksternal
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="space-y-4">
          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin h-6 w-6 border-2 border-wedding-rosegold border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Memuat pilihan musik...</p>
            </div>
          ) : musicOptions.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">
              Tidak ada pilihan musik yang tersedia. 
              Silakan gunakan link eksternal.
            </p>
          ) : (
            <RadioGroup 
              value={selectedLibraryMusic || ""} 
              onValueChange={setSelectedLibraryMusic}
              className="space-y-2"
            >
              {musicOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option.url} id={option.id} />
                    <Label htmlFor={option.id} className="cursor-pointer flex-1">
                      <div>{option.title}</div>
                      <div className="text-xs text-gray-500">{option.artist || "Unknown Artist"}</div>
                    </Label>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePlayPreview(option.url);
                    }}
                    className={playingUrl === option.url ? "text-wedding-rosegold" : ""}
                  >
                    {playingUrl === option.url ? <Pause size={18} /> : <Play size={18} />}
                  </Button>
                </div>
              ))}
            </RadioGroup>
          )}
        </TabsContent>
        
        <TabsContent value="external" className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="externalMusicUrl">Link URL Musik</Label>
              {externalMusicUrl && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePlayPreview(externalMusicUrl)}
                  disabled={!isSupportedMusicUrl(externalMusicUrl)}
                  className={playingUrl === externalMusicUrl ? "text-wedding-rosegold" : ""}
                >
                  {playingUrl === externalMusicUrl ? <Pause size={16} /> : <Play size={16} />}
                  <span className="ml-1 text-xs">
                    {playingUrl === externalMusicUrl ? "Stop" : "Uji"}
                  </span>
                </Button>
              )}
            </div>
            <Input
              id="externalMusicUrl"
              placeholder="https://example.com/music.mp3 atau YouTube/Spotify URL"
              value={externalMusicUrl}
              onChange={(e) => handleExternalUrlChange(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Didukung: file MP3 langsung, YouTube, atau Spotify
            </p>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Option to remove music */}
      {value && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            onChange(null);
            setSelectedLibraryMusic(null);
            setExternalMusicUrl("");
          }}
          className="mt-2"
        >
          Hapus Musik
        </Button>
      )}
    </div>
  );
}
