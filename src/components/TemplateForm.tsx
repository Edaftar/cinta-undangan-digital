import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import DatePicker from "./DatePicker";
import ImageUpload from "./ImageUpload";
import MusicSelector from "./MusicSelector"; // Import the MusicSelector component

interface TemplateFormProps {
  templateId: string;
  existingData?: any;
}

const TemplateForm = ({ templateId, existingData = null }: TemplateFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState(existingData?.title || "");
  const [slug, setSlug] = useState(existingData?.slug || "");
  const [groomName, setGroomName] = useState(existingData?.groom_name || "");
  const [brideName, setBrideName] = useState(existingData?.bride_name || "");
  const [groomFather, setGroomFather] = useState(existingData?.groom_father || "");
  const [groomMother, setGroomMother] = useState(existingData?.groom_mother || "");
  const [brideFather, setBrideFather] = useState(existingData?.bride_father || "");
  const [brideMother, setBrideMother] = useState(existingData?.bride_mother || "");
  const [selectedDate, setSelectedDate] = useState<Date>(existingData?.main_date ? new Date(existingData.main_date) : new Date());
  const [akadDate, setAkadDate] = useState<Date | undefined>(existingData?.akad_date ? new Date(existingData.akad_date) : undefined);
  const [receptionDate, setReceptionDate] = useState<Date | undefined>(existingData?.reception_date ? new Date(existingData.reception_date) : undefined);
  const [location, setLocation] = useState(existingData?.location || "");
  const [locationAddress, setLocationAddress] = useState(existingData?.location_address || "");
  const [mapUrl, setMapUrl] = useState(existingData?.location_map_url || "");
  const [loveStory, setLoveStory] = useState(existingData?.love_story || "");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(existingData?.gallery || []);
  const [groomPhoto, setGroomPhoto] = useState(existingData?.groom_photo || null);
  const [bridePhoto, setBridePhoto] = useState(existingData?.bride_photo || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [musicUrl, setMusicUrl] = useState(existingData?.music_url || null);

  useEffect(() => {
    if (!existingData) {
      const defaultSlug = `${groomName.toLowerCase().replace(/\s/g, "-")}-&-${brideName.toLowerCase().replace(/\s/g, "-")}`;
      setSlug(defaultSlug);
    }
  }, []);

  const validateForm = () => {
    if (!title.trim()) {
      toast.error("Judul undangan wajib diisi");
      return false;
    }
    if (!groomName.trim()) {
      toast.error("Nama mempelai pria wajib diisi");
      return false;
    }
    if (!brideName.trim()) {
      toast.error("Nama mempelai wanita wajib diisi");
      return false;
    }
    if (!location.trim()) {
      toast.error("Lokasi acara wajib diisi");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const weddingData = {
        title: title.trim(),
        slug: slug.trim(),
        template_id: templateId,
        groom_name: groomName.trim(),
        bride_name: brideName.trim(),
        groom_father: groomFather.trim() || null,
        groom_mother: groomMother.trim() || null,
        bride_father: brideFather.trim() || null,
        bride_mother: brideMother.trim() || null,
        main_date: selectedDate.toISOString(),
        akad_date: akadDate ? akadDate.toISOString() : null,
        reception_date: receptionDate ? receptionDate.toISOString() : null,
        location: location.trim(),
        location_address: locationAddress.trim() || null,
        location_map_url: mapUrl.trim() || null,
        love_story: loveStory || null,
        gallery: uploadedPhotos,
        groom_photo: groomPhoto || null,
        bride_photo: bridePhoto || null,
        music_id: null, // Will be replaced if we have a music reference
        music_url: musicUrl,
      };

      if (existingData) {
        // Update existing invitation
        const { data, error } = await supabase
          .from("invitations")
          .update(weddingData)
          .eq("id", existingData.id)
          .select()
          .single();

        if (error) {
          console.error("Error updating invitation:", error);
          toast.error("Gagal memperbarui undangan. Silakan coba lagi.");
          setIsSubmitting(false);
          return;
        }

        toast.success("Undangan berhasil diperbarui!");
        navigate(`/preview/${data.slug}`);
      } else {
        // Create new invitation
        const { data, error } = await supabase
          .from("invitations")
          .insert({
            ...weddingData,
            user_id: user?.id,
          })
          .select()
          .single();

        if (error) {
          console.error("Error creating invitation:", error);
          toast.error("Gagal membuat undangan. Silakan coba lagi.");
          setIsSubmitting(false);
          return;
        }

        toast.success("Undangan berhasil dibuat!");
        navigate(`/preview/${data.slug}`);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Terjadi kesalahan tak terduga. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSlug = e.target.value.toLowerCase().replace(/\s/g, "-");
    setSlug(newSlug);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white rounded-lg shadow-md p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Informasi Undangan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul Undangan <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="title"
              placeholder="Contoh: Undangan Pernikahan Andi & Susi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="slug"
              placeholder="andi-&-susi"
              value={slug}
              onChange={handleSlugChange}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Informasi Mempelai</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="groomName">Nama Mempelai Pria <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="groomName"
              placeholder="Andi Kurniawan"
              value={groomName}
              onChange={(e) => setGroomName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brideName">Nama Mempelai Wanita <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="brideName"
              placeholder="Susi Susanti"
              value={brideName}
              onChange={(e) => setBrideName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="groomFather">Nama Ayah Mempelai Pria</Label>
            <Input
              type="text"
              id="groomFather"
              placeholder="Bapak Bambang"
              value={groomFather}
              onChange={(e) => setGroomFather(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groomMother">Nama Ibu Mempelai Pria</Label>
            <Input
              type="text"
              id="groomMother"
              placeholder="Ibu Sri"
              value={groomMother}
              onChange={(e) => setGroomMother(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="brideFather">Nama Ayah Mempelai Wanita</Label>
            <Input
              type="text"
              id="brideFather"
              placeholder="Bapak Joko"
              value={brideFather}
              onChange={(e) => setBrideFather(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brideMother">Nama Ibu Mempelai Wanita</Label>
            <Input
              type="text"
              id="brideMother"
              placeholder="Ibu Rini"
              value={brideMother}
              onChange={(e) => setBrideMother(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="groomPhoto">Foto Mempelai Pria</Label>
              <ImageUpload
                id="groomPhoto"
                value={groomPhoto}
                onChange={(url) => setGroomPhoto(url)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bridePhoto">Foto Mempelai Wanita</Label>
              <ImageUpload
                id="bridePhoto"
                value={bridePhoto}
                onChange={(url) => setBridePhoto(url)}
              />
            </div>
          </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Informasi Acara</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="mainDate">Tanggal Acara <span className="text-red-500">*</span></Label>
            <DatePicker
              id="mainDate"
              selected={selectedDate}
              onChange={(date: Date) => setSelectedDate(date)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Lokasi Acara <span className="text-red-500">*</span></Label>
            <Input
              type="text"
              id="location"
              placeholder="Contoh: Balai Sudirman"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="akadDate">Tanggal Akad Nikah (Optional)</Label>
            <DatePicker
              id="akadDate"
              selected={akadDate}
              onChange={(date: Date) => setAkadDate(date)}
              placeholderText="Pilih Tanggal Akad"
              isClearable
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="receptionDate">Tanggal Resepsi (Optional)</Label>
            <DatePicker
              id="receptionDate"
              selected={receptionDate}
              onChange={(date: Date) => setReceptionDate(date)}
              placeholderText="Pilih Tanggal Resepsi"
              isClearable
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="locationAddress">Alamat Lokasi (Optional)</Label>
          <Textarea
            id="locationAddress"
            placeholder="Jl. Jend. Sudirman Kav. 12, Jakarta"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mapUrl">URL Google Maps (Optional)</Label>
          <Input
            type="url"
            id="mapUrl"
            placeholder="https://maps.google.com/..."
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Cerita Cinta (Optional)</h3>
        <div className="space-y-2">
          <Label htmlFor="loveStory">Tuliskan cerita cinta anda</Label>
          <Textarea
            id="loveStory"
            placeholder="Mulai dari pertemuan pertama..."
            value={loveStory}
            onChange={(e) => setLoveStory(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Galeri Foto (Optional)</h3>
        <div className="space-y-2">
          <Label>Foto-foto kenangan anda</Label>
          <ImageUpload
            multiple
            value={uploadedPhotos}
            onChange={(urls) => setUploadedPhotos(urls)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2">Musik Latar</h3>
        <div className="space-y-4">
          <MusicSelector 
            value={musicUrl} 
            onChange={setMusicUrl} 
          />
        </div>
      </div>

      <Button
        type="submit"
        className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Memproses..." : "Simpan Undangan"}
      </Button>
    </form>
  );
};

export default TemplateForm;
