import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, Music, ExternalLink } from "lucide-react";
import { fetchActiveMusicOptions, MusicOption } from "@/services/musicService";
import { toast } from "sonner";
import { extractYoutubeId, extractSpotifyId, isSupportedMusicUrl } from "@/utils/musicUtils";

interface MusicSelectorProps {
  selectedMusic: string;
  onMusicChange: (url: string) => void;
}

export default function MusicSelector({ selectedMusic, onMusicChange }: MusicSelectorProps) {
  const [musicOptions, setMusicOptions] = useState<MusicOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [customUrl, setCustomUrl] = useState("");
  const [activeTab, setActiveTab] = useState<string>("library");
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadMusicOptions();

    // Initialize custom URL if selectedMusic is not in our library
    if (selectedMusic && !selectedMusic.includes("music_options")) {
      setCustomUrl(selectedMusic);
      setActiveTab("custom");
    }
  }, [selectedMusic]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
      }
    };
  }, [audioElement]);

  const loadMusicOptions = async () => {
    setLoading(true);
    try {
      const data = await fetchActiveMusicOptions();
      setMusicOptions(data);
    } catch (error) {
      console.error("Failed to load music options:", error);
      toast.error("Gagal memuat pilihan musik");
    } finally {
      setLoading(false);
    }
  };

  const handlePlayPreview = (url: string) => {
    if (audioElement) {
      audioElement.pause();
      audioElement.src = "";
    }

    // If clicking on already playing audio, just stop it
    if (currentlyPlaying === url) {
      setCurrentlyPlaying(null);
      return;
    }

    // Otherwise play the selected audio
    const audio = new Audio(url);
    audio.oncanplaythrough = () => {
      audio.play().catch(err => {
        console.error("Failed to play audio:", err);
        toast.error("Gagal memutar audio");
      });
    };
    audio.onended = () => {
      setCurrentlyPlaying(null);
    };
    audio.onerror = () => {
      toast.error("URL audio tidak valid");
      setCurrentlyPlaying(null);
    };

    setAudioElement(audio);
    setCurrentlyPlaying(url);
  };

  const handleCustomUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomUrl(e.target.value);
  };

  const handleApplyCustomUrl = () => {
    if (!customUrl.trim()) {
      toast.error("URL tidak boleh kosong");
      return;
    }

    if (!isSupportedMusicUrl(customUrl)) {
      toast.error("URL tidak didukung. Gunakan URL langsung MP3/OGG atau YouTube/Spotify");
      return;
    }

    onMusicChange(customUrl);
    toast.success("Musik telah dipilih");
  };

  const renderMusicPreview = (url: string) => {
    const youtubeId = extractYoutubeId(url);
    const spotifyId = extractSpotifyId(url);

    if (youtubeId) {
      return (
        <div className="mt-2 aspect-video w-full">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else if (spotifyId) {
      return (
        <div className="mt-2">
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${spotifyId}`}
            width="100%"
            height="152"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      );
    } else if (url) {
      // For direct audio URLs
      return (
        <div className="mt-2 flex justify-center">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handlePlayPreview(url)}
            className={currentlyPlaying === url ? "bg-wedding-rosegold text-white" : ""}
          >
            {currentlyPlaying === url ? (
              <>
                <Pause className="mr-1 h-4 w-4" />
                Berhenti
              </>
            ) : (
              <>
                <Play className="mr-1 h-4 w-4" />
                Putar
              </>
            )}
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <Label className="text-base font-medium">Musik Latar</Label>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="library" className="flex-1">
            <Music className="mr-1 h-4 w-4" />
            Pustaka Musik
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex-1">
            <ExternalLink className="mr-1 h-4 w-4" />
            Link Eksternal
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="library" className="mt-4">
          {loading ? (
            <div className="text-center py-6">Memuat pilihan musik...</div>
          ) : musicOptions.length === 0 ? (
            <div className="text-center py-6 text-gray-500">Tidak ada pilihan musik tersedia</div>
          ) : (
            <RadioGroup
              value={selectedMusic}
              onValueChange={onMusicChange}
              className="space-y-3"
            >
              {musicOptions.map((option) => (
                <div key={option.id} className="flex items-center justify-between space-x-2 p-3 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value={option.url} id={option.id} />
                    <div>
                      <Label htmlFor={option.id} className="font-medium cursor-pointer">
                        {option.title}
                      </Label>
                      {option.artist && (
                        <p className="text-sm text-gray-500">{option.artist}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePlayPreview(option.url)}
                    className={`min-w-[80px] ${currentlyPlaying === option.url ? "bg-wedding-rosegold text-white" : ""}`}
                  >
                    {currentlyPlaying === option.url ? (
                      <>
                        <Pause className="mr-1 h-4 w-4" />
                        Berhenti
                      </>
                    ) : (
                      <>
                        <Play className="mr-1 h-4 w-4" />
                        Putar
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </RadioGroup>
          )}
        </TabsContent>
        
        <TabsContent value="custom" className="mt-4 space-y-3">
          <div className="space-y-2">
            <Label htmlFor="customMusicUrl">
              URL Musik Eksternal
              <span className="ml-1 text-sm text-gray-500">(YouTube, Spotify, atau URL MP3 langsung)</span>
            </Label>
            <div className="flex space-x-2">
              <Input
                id="customMusicUrl"
                placeholder="https://"
                value={customUrl}
                onChange={handleCustomUrlChange}
              />
              <Button 
                type="button"
                onClick={handleApplyCustomUrl}
                className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
              >
                Pilih
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Didukung: Link MP3/OGG langsung, YouTube, atau Spotify
            </p>
          </div>
          
          {customUrl && renderMusicPreview(customUrl)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
