
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  Play,
  Loader2,
  Music,
  Check,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  MusicOption,
  fetchMusicOptions,
  createMusic,
  updateMusic,
  deleteMusic,
} from "@/services/musicService";

interface MusicFormData {
  title: string;
  artist: string;
  url: string;
  is_active: boolean;
}

const initialFormData: MusicFormData = {
  title: "",
  artist: "",
  url: "",
  is_active: true,
};

export default function MusicManager() {
  const [musicList, setMusicList] = useState<MusicOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [formData, setFormData] = useState<MusicFormData>(initialFormData);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPlayingUrl, setCurrentPlayingUrl] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    loadMusicOptions();
  }, []);

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
      const data = await fetchMusicOptions();
      setMusicList(data);
    } catch (error) {
      console.error("Failed to load music options:", error);
      toast.error("Gagal memuat daftar musik");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_active: checked }));
  };

  const handleEdit = (music: MusicOption) => {
    setCurrentId(music.id);
    setFormData({
      title: music.title,
      artist: music.artist || "",
      url: music.url,
      is_active: music.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = (music: MusicOption) => {
    setCurrentId(music.id);
    setFormData({
      title: music.title,
      artist: music.artist || "",
      url: music.url,
      is_active: music.is_active,
    });
    setConfirmDialogOpen(true);
  };

  const handlePlayPreview = (url: string) => {
    if (audioElement) {
      audioElement.pause();
      audioElement.src = "";
      setAudioPlaying(false);
    }

    if (currentPlayingUrl === url && audioPlaying) {
      setCurrentPlayingUrl(null);
      return;
    }

    const audio = new Audio(url);
    audio.oncanplaythrough = () => {
      audio.play().catch(err => {
        console.error("Failed to play audio:", err);
        toast.error("Gagal memutar audio");
      });
      setAudioPlaying(true);
    };
    audio.onended = () => {
      setCurrentPlayingUrl(null);
      setAudioPlaying(false);
    };
    audio.onerror = () => {
      toast.error("URL audio tidak valid");
      setCurrentPlayingUrl(null);
      setAudioPlaying(false);
    };

    setAudioElement(audio);
    setCurrentPlayingUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error("Judul musik wajib diisi");
      return;
    }
    if (!formData.url.trim()) {
      toast.error("URL audio wajib diisi");
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (currentId) {
        // Update existing music
        await updateMusic(currentId, formData);
        toast.success("Musik berhasil diperbarui");
      } else {
        // Create new music
        await createMusic(formData);
        toast.success("Musik baru berhasil ditambahkan");
      }
      
      // Reload music list and reset form
      await loadMusicOptions();
      setFormData(initialFormData);
      setCurrentId(null);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error submitting music:", error);
      toast.error("Gagal menyimpan data musik");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!currentId) return;
    
    setIsSubmitting(true);
    try {
      await deleteMusic(currentId);
      toast.success("Musik berhasil dihapus");
      
      await loadMusicOptions();
      setCurrentId(null);
      setConfirmDialogOpen(false);
    } catch (error) {
      console.error("Error deleting music:", error);
      toast.error("Gagal menghapus musik");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Kelola Musik Latar</h2>
        <Button
          onClick={() => {
            setCurrentId(null);
            setFormData(initialFormData);
            setDialogOpen(true);
          }}
          className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
        >
          <Plus size={16} className="mr-1" />
          Tambah Musik
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
        </div>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Artis</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pratinjau</TableHead>
                <TableHead className="w-[120px]">Tindakan</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {musicList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    Belum ada musik yang tersedia.
                  </TableCell>
                </TableRow>
              ) : (
                musicList.map((music) => (
                  <TableRow key={music.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Music size={16} className="text-wedding-rosegold shrink-0" />
                        {music.title}
                      </div>
                    </TableCell>
                    <TableCell>{music.artist || "-"}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        music.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {music.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${
                          currentPlayingUrl === music.url && audioPlaying
                            ? "bg-wedding-rosegold text-white hover:bg-wedding-deep-rosegold hover:text-white"
                            : ""
                        }`}
                        onClick={() => handlePlayPreview(music.url)}
                      >
                        <Play size={16} />
                      </Button>
                    </TableCell>
                    <TableCell className="space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleEdit(music)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(music)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add/Edit Music Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {currentId ? "Edit Musik" : "Tambah Musik Baru"}
            </DialogTitle>
            <DialogDescription>
              {currentId ? "Perbarui informasi musik yang dipilih." : "Tambahkan musik latar baru untuk undangan."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Musik <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Contoh: Wedding March"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist">Artis</Label>
              <Input
                id="artist"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                placeholder="Contoh: Traditional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL Audio <span className="text-red-500">*</span></Label>
              <Input
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                placeholder="https://example.com/music.mp3"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="is_active">Aktif</Label>
            </div>

            <DialogFooter className="sm:justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus musik "{formData.title}"?
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setConfirmDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                "Hapus"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
