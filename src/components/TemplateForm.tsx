import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { CalendarIcon, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  brideFullName: z.string().min(2, { message: "Masukkan nama lengkap pengantin wanita" }),
  brideName: z.string().min(1, { message: "Masukkan nama panggilan pengantin wanita" }),
  brideBio: z.string().optional(),
  brideParents: z.string().min(2, { message: "Masukkan nama orang tua pengantin wanita" }),
  groomFullName: z.string().min(2, { message: "Masukkan nama lengkap pengantin pria" }),
  groomName: z.string().min(1, { message: "Masukkan nama panggilan pengantin pria" }),
  groomBio: z.string().optional(),
  groomParents: z.string().min(2, { message: "Masukkan nama orang tua pengantin pria" }),
  akadDate: z.date({ required_error: "Pilih tanggal akad nikah" }),
  akadLocation: z.string().min(2, { message: "Masukkan lokasi akad nikah" }),
  akadAddress: z.string().min(2, { message: "Masukkan alamat akad nikah" }),
  receptionDate: z.date({ required_error: "Pilih tanggal resepsi pernikahan" }),
  receptionLocation: z.string().min(2, { message: "Masukkan lokasi resepsi pernikahan" }),
  receptionAddress: z.string().min(2, { message: "Masukkan alamat resepsi pernikahan" }),
  loveStory: z.string().optional(),
});

interface TemplateFormProps {
  templateId: string;
}

const TemplateForm = ({ templateId }: TemplateFormProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<{ id: number; url: string }[]>([]);
  
  // Use existing data if available (e.g., when editing)
  const existingData = location.state?.weddingData;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: existingData || {
      brideFullName: "",
      brideName: "",
      brideBio: "",
      brideParents: "",
      groomFullName: "",
      groomName: "",
      groomBio: "",
      groomParents: "",
      akadLocation: "",
      akadAddress: "",
      receptionLocation: "",
      receptionAddress: "",
      loveStory: "",
    },
  });

  // Initialize photos from existing data if available
  useState(() => {
    if (existingData?.photos) {
      setPhotos(existingData.photos);
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // In a real app, we would send this data to the backend
    const weddingData = {
      ...values,
      photos
    };
    
    console.log(weddingData);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Undangan berhasil dibuat!", {
        description: "Sekarang Anda dapat melihat dan membagikan undangan Anda",
      });
      // Navigate to the preview page with the form data
      navigate(`/preview/${templateId}`, { state: { weddingData } });
    }, 1500);
  }

  const handleAddPhoto = () => {
    // Limit to max 6 photos
    if (photos.length >= 6) {
      toast.error("Maksimal 6 foto yang diperbolehkan");
      return;
    }
    
    const newPhoto = { id: Date.now(), url: "/placeholder.svg" };
    setPhotos([...photos, newPhoto]);
  };

  const handleRemovePhoto = (id: number) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };

  const handlePhotoChange = (id: number, url: string) => {
    setPhotos(photos.map(photo => 
      photo.id === id ? { ...photo, url } : photo
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-playfair font-semibold border-b border-wedding-champagne pb-2">
              Data Pengantin
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-playfair text-wedding-rosegold">Pengantin Wanita</h3>
                
                <FormField
                  control={form.control}
                  name="brideFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brideName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Panggilan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama panggilan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brideBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio Singkat</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ceritakan sedikit tentang pengantin wanita (opsional)" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Informasi singkat yang akan ditampilkan di undangan
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brideParents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Orang Tua</FormLabel>
                      <FormControl>
                        <Input placeholder="Putri dari Bapak ... dan Ibu ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-playfair text-wedding-rosegold">Pengantin Pria</h3>
                
                <FormField
                  control={form.control}
                  name="groomFullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="groomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Panggilan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama panggilan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="groomBio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio Singkat</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ceritakan sedikit tentang pengantin pria (opsional)" 
                          className="resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Informasi singkat yang akan ditampilkan di undangan
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="groomParents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Orang Tua</FormLabel>
                      <FormControl>
                        <Input placeholder="Putra dari Bapak ... dan Ibu ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-playfair font-semibold border-b border-wedding-champagne pb-2">
              Acara Akad Nikah
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="akadDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal & Waktu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "EEEE, dd MMMM yyyy", { locale: id })
                            ) : (
                              <span>Pilih tanggal akad</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="akadLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lokasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Masjid/Gedung/Rumah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="akadAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Alamat lengkap lokasi akad nikah" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-playfair font-semibold border-b border-wedding-champagne pb-2">
              Acara Resepsi Pernikahan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="receptionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal & Waktu</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "EEEE, dd MMMM yyyy", { locale: id })
                            ) : (
                              <span>Pilih tanggal resepsi</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="receptionLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Lokasi</FormLabel>
                    <FormControl>
                      <Input placeholder="Gedung/Hotel/Rumah" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="receptionAddress"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Alamat lengkap lokasi resepsi pernikahan" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-playfair font-semibold border-b border-wedding-champagne pb-2">
              Galeri Foto
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="relative border border-wedding-champagne rounded-md overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt="Foto galeri" 
                      className="w-full aspect-square object-cover"
                    />
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-2 right-2 w-8 h-8 bg-white/80 hover:bg-white border border-red-200 text-red-500"
                      onClick={() => handleRemovePhoto(photo.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                ))}
                
                {photos.length < 6 && (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-[150px] border-dashed border-2 border-wedding-champagne hover:border-wedding-rosegold hover:bg-wedding-light-blush flex flex-col items-center justify-center gap-2"
                    onClick={handleAddPhoto}
                  >
                    <Plus size={24} className="text-wedding-rosegold" />
                    <span className="text-sm">Tambah Foto</span>
                  </Button>
                )}
              </div>
              
              <p className="text-sm text-gray-500">
                Tambahkan foto prewedding atau foto-foto lain yang ingin ditampilkan di galeri undangan (maks. 6 foto)
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-playfair font-semibold border-b border-wedding-champagne pb-2">
              Kisah Cinta
            </h2>
            
            <FormField
              control={form.control}
              name="loveStory"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Ceritakan kisah cinta Anda (opsional)" 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Ceritakan bagaimana Anda bertemu, kisah cinta Anda, atau momen-momen spesial lainnya
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-6 border-t border-wedding-champagne">
            <Button 
              type="submit" 
              className="w-full bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white py-6 text-lg" 
              disabled={isLoading}
            >
              {isLoading ? "Membuat Undangan..." : (existingData ? "Perbarui Undangan" : "Buat Undangan")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TemplateForm;
