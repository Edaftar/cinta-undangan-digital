
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fetchMusicOptions, MusicOption } from "@/services/musicService";
import { cn } from "@/lib/utils";

interface MusicSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function MusicSelector({ value, onChange, className }: MusicSelectorProps) {
  const [open, setOpen] = useState(false);
  const [musicOptions, setMusicOptions] = useState<MusicOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMusicOptions = async () => {
      setLoading(true);
      const options = await fetchMusicOptions();
      setMusicOptions(options);
      setLoading(false);
    };

    loadMusicOptions();
  }, []);

  const selectedMusic = musicOptions.find(music => music.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={loading}
        >
          <div className="flex items-center gap-2 truncate">
            <Music size={16} className="shrink-0 text-wedding-rosegold" />
            <span className="truncate">
              {value && selectedMusic
                ? `${selectedMusic.title}${selectedMusic.artist ? ` - ${selectedMusic.artist}` : ''}`
                : "Pilih Musik Latar"}
            </span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Cari musik..." />
          <CommandEmpty>Tidak ada musik yang ditemukan.</CommandEmpty>
          <CommandGroup>
            {musicOptions.map((music) => (
              <CommandItem
                key={music.id}
                value={`${music.title} ${music.artist || ''}`}
                onSelect={() => {
                  onChange(music.id);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === music.id ? "opacity-100" : "opacity-0"
                  )}
                />
                <span>{music.title}</span>
                {music.artist && (
                  <span className="text-sm text-muted-foreground ml-1">
                    - {music.artist}
                  </span>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
