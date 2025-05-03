import MusicSelector from "@/components/MusicSelector";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { toast } from "sonner";

interface TemplateFormProps {
  templateId: string;
  existingData?: any;
}

const formSchema = z.object({
  title: z.string().min(1, "Judul undangan diperlukan"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .max(50, "Slug maksimal 50 karakter")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh berisi huruf kecil, angka, dan tanda hubung")
    .refine((val) => !val.startsWith('-') && !val.endsWith('-'), {
      message: "Slug tidak boleh diawali atau diakhiri dengan tanda hubung",
    }),
  brideName: z.string().min(1, "Nama pengantin wanita diperlukan"),
  brideFather: z.string().optional(),
  brideMother: z.string().optional(),
  groomName: z.string().min(1, "Nama pengantin pria diperlukan"),
  groomFather: z.string().optional(),
  groomMother: z.string().optional(),
  mainDate: z
    .date({ required_error: "Tanggal utama diperlukan" })
    .refine((date) => date > new Date(), {
      message: "Tanggal harus di masa depan",
    }),
  akadDate: z
    .date()
    .nullable()
    .refine((date) => !date || date > new Date(), {
      message: "Tanggal harus di masa depan",
    }),
  receptionDate: z
    .date()
    .nullable()
    .refine((date) => !date || date > new Date(), {
      message: "Tanggal harus di masa depan",
    }),
  location: z.string().min(1, "Lokasi diperlukan"),
  locationAddress: z.string().optional(),
  locationMapUrl: z
    .string()
    .url("URL tidak valid")
    .optional()
    .or(z.literal("")),
  loveStory: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const TemplateForm: React.FC<TemplateFormProps> = ({ templateId, existingData }) => {
  const [uploadedBridePhoto, setUploadedBridePhoto] = useState<File | null>(null);
  const [uploadedGroomPhoto, setUploadedGroomPhoto] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingBridePhoto, setExistingBridePhoto] = useState<string | null>(null);
  const [existingGroomPhoto, setExistingGroomPhoto] = useState<string | null>(null);
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<string>(existingData?.music_url || "");
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: existingData?.title || "",
      slug: existingData?.slug || "",
      brideName: existingData?.bride_name || "",
      brideFather: existingData?.bride_father || "",
      brideMother: existingData?.bride_mother || "",
      groomName: existingData?.groom_name || "",
      groomFather: existingData?.groom_father || "",
      groomMother: existingData?.groom_mother || "",
      mainDate: existingData?.main_date ? new Date(existingData.main_date) : undefined,
      akadDate: existingData?.akad_date ? new Date(existingData.akad_date) : null,
      receptionDate: existingData?.reception_date ? new Date(existingData.reception_date) : null,
      location: existingData?.location || "",
      locationAddress: existingData?.location_address || "",
      locationMapUrl: existingData?.location_map_url || "",
      loveStory: existingData?.love_story || "",
    },
  });

  useEffect(() => {
    // Set existing photos if available
    if (existingData) {
      if (existingData.bride_photo) {
        setExistingBridePhoto(existingData.bride_photo);
      }
      if (existingData.groom_photo) {
        setExistingGroomPhoto(existingData.groom_photo);
      }
      if (existingData.gallery && Array.isArray(existingData.gallery)) {
        setExistingGallery(existingData.gallery);
      }
    }
  }, [existingData]);

  const handleBridePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedBridePhoto(file);
  };

  const handleGroomPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadedGroomPhoto(file);
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setGalleryFiles(prev => [...prev, ...files]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryImage = (index: number) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index));
  };

  // Function to upload a file to Supabase
  const uploadFile = async (file: File, path: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${path}${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('wedding_photos')
      .upload(filePath, file);

    if (error) throw error;
    
    // Get public URL for the file
    const { data: publicUrlData } = supabase.storage
      .from('wedding_photos')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  // Function to check if a slug is available
  const checkSlugAvailability = async (slug: string, currentInvitationId?: string) => {
    let query = supabase
      .from('invitations')
      .select('id')
      .eq('slug', slug);
    
    // If we're editing an existing invitation, exclude it from the check
    if (currentInvitationId) {
      query = query.neq('id', currentInvitationId);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    
    return data.length === 0; // Returns true if slug is available
  };

  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("Anda harus login untuk menyimpan undangan");
      return;
    }

    setIsSubmitting(true);

    try {
      // Check if slug is available
      const isSlugAvailable = await checkSlugAvailability(
        values.slug, 
        existingData?.id
      );
      
      if (!isSlugAvailable) {
        toast.error("URL undangan sudah digunakan, silakan gunakan yang lain");
        form.setError("slug", {
          type: "manual",
          message: "URL undangan sudah digunakan"
        });
        setIsSubmitting(false);
        return;
      }

      let bridePhotoUrl = existingBridePhoto;
      let groomPhotoUrl = existingGroomPhoto;
      let galleryUrls = [...existingGallery];

      // Upload bride photo if provided
      if (uploadedBridePhoto) {
        bridePhotoUrl = await uploadFile(uploadedBridePhoto, 'bride/');
      }

      // Upload groom photo if provided
      if (uploadedGroomPhoto) {
        groomPhotoUrl = await uploadFile(uploadedGroomPhoto, 'groom/');
      }

      // Upload gallery photos if provided
      for (const file of galleryFiles) {
        const url = await uploadFile(file, 'gallery/');
        galleryUrls.push(url);
      }

      // Prepare invitation data with music field
      const invitationData = {
        user_id: user.id,
        template_id: templateId,
        title: values.title,
        slug: values.slug,
        bride_name: values.brideName,
        bride_father: values.brideFather,
        bride_mother: values.brideMother,
        bride_photo: bridePhotoUrl,
        groom_name: values.groomName,
        groom_father: values.groomFather,
        groom_mother: values.groomMother,
        groom_photo: groomPhotoUrl,
        main_date: values.mainDate.toISOString(),
        akad_date: values.akadDate ? values.akadDate.toISOString() : null,
        reception_date: values.receptionDate ? values.receptionDate.toISOString() : null,
        location: values.location,
        location_address: values.locationAddress,
        location_map_url: values.locationMapUrl,
        love_story: values.loveStory,
        gallery: galleryUrls,
        active: true,
        music_url: selectedMusic, // Add the selected music URL
      };

      let response;
      
      // Update or create invitation
      if (existingData?.id) {
        // Update existing invitation
        response = await supabase
          .from('invitations')
          .update(invitationData)
          .eq('id', existingData.id);
      } else {
        // Create new invitation
        response = await supabase
          .from('invitations')
          .insert([invitationData]);
      }

      if (response.error) throw response.error;
      
      toast.success(existingData?.id ? "Undangan berhasil diperbarui!" : "Undangan berhasil dibuat!");
      
      // Navigate to preview
      navigate(`/invitation/${values.slug}`);
    } catch (error: any) {
      console.error("Error saving invitation:", error);
      toast.error(`Gagal menyimpan undangan: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold font-playfair mb-6">
        {existingData ? "Edit Informasi Pernikahan" : "Masukkan Informasi Pernikahan"}
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6 bg-wedding-ivory p-4 rounded-md border border-wedding-champagne/50">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Informasi Dasar</h3>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Undangan</FormLabel>
                  <FormControl>
                    <Input placeholder="contoh: Pernikahan Budi & Ani" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Undangan (Slug)</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <span className="text-gray-500 bg-gray-100 px-3 py-2 rounded-l-md border border-r-0 border-input">
                        {window.location.origin}/invitation/
                      </span>
                      <Input className="rounded-l-none" placeholder="budi-ani" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                  <p className="text-xs text-gray-500 mt-1">
                    Gunakan huruf kecil, angka, dan tanda hubung. URL tidak boleh mengandung spasi.
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mainDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal Pernikahan</FormLabel>
                  <FormControl>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "EEEE, dd MMMM yyyy", { locale: id })
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0 w-auto" align="start">
                          <Calendar
                            mode="single"
                            locale={id}
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6 bg-wedding-ivory p-4 rounded-md border border-wedding-champagne/50">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Informasi Mempelai</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bride Info */}
              <div className="space-y-4">
                <h4 className="font-medium">Pengantin Wanita</h4>
                
                <FormField
                  control={form.control}
                  name="brideName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama pengantin wanita" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brideFather"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ayah</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama ayah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="brideMother"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ibu</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama ibu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel htmlFor="bridePhoto">Foto Pengantin Wanita</FormLabel>
                  <div className="mt-1 space-y-2">
                    <Input
                      id="bridePhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleBridePhotoChange}
                    />
                    {(existingBridePhoto && !uploadedBridePhoto) && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Foto saat ini:</p>
                        <img 
                          src={existingBridePhoto}
                          alt="Bride" 
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                    )}
                    {uploadedBridePhoto && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Foto baru:</p>
                        <img 
                          src={URL.createObjectURL(uploadedBridePhoto)}
                          alt="Bride" 
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Groom Info */}
              <div className="space-y-4">
                <h4 className="font-medium">Pengantin Pria</h4>
                
                <FormField
                  control={form.control}
                  name="groomName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama pengantin pria" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="groomFather"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ayah</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama ayah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="groomMother"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ibu</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama ibu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div>
                  <FormLabel htmlFor="groomPhoto">Foto Pengantin Pria</FormLabel>
                  <div className="mt-1 space-y-2">
                    <Input
                      id="groomPhoto"
                      type="file"
                      accept="image/*"
                      onChange={handleGroomPhotoChange}
                    />
                    {(existingGroomPhoto && !uploadedGroomPhoto) && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Foto saat ini:</p>
                        <img 
                          src={existingGroomPhoto}
                          alt="Groom" 
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                    )}
                    {uploadedGroomPhoto && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Foto baru:</p>
                        <img 
                          src={URL.createObjectURL(uploadedGroomPhoto)}
                          alt="Groom" 
                          className="w-20 h-20 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 bg-wedding-ivory p-4 rounded-md border border-wedding-champagne/50">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Detail Acara</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="akadDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal & Waktu Akad Nikah (Opsional)</FormLabel>
                    <FormControl>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "EEEE, dd MMMM yyyy - HH:mm", { locale: id })
                              ) : (
                                <span>Pilih tanggal & waktu</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-auto" align="start">
                            <Calendar
                              mode="single"
                              locale={id}
                              selected={field.value || undefined}
                              onSelect={(date) => field.onChange(date)}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="receptionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanggal & Waktu Resepsi (Opsional)</FormLabel>
                    <FormControl>
                      <div>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(field.value, "EEEE, dd MMMM yyyy - HH:mm", { locale: id })
                              ) : (
                                <span>Pilih tanggal & waktu</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0 w-auto" align="start">
                            <Calendar
                              mode="single"
                              locale={id}
                              selected={field.value || undefined}
                              onSelect={(date) => field.onChange(date)}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lokasi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama gedung/tempat/hotel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="locationAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alamat Lengkap</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Alamat lengkap lokasi acara"
                      className="resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="locationMapUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Google Maps (Opsional)</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="https://maps.google.com/..."
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6 bg-wedding-ivory p-4 rounded-md border border-wedding-champagne/50">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Cerita Cinta</h3>
            
            <FormField
              control={form.control}
              name="loveStory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cerita Cinta (Opsional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Ceritakan bagaimana Anda bertemu, kisah cinta Anda, atau pesan untuk tamu..."
                      className="min-h-[150px]"
                      {...field} 
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="space-y-6 bg-wedding-ivory p-4 rounded-md border border-wedding-champagne/50">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Galeri Foto</h3>
            
            <div>
              <FormLabel htmlFor="galleryPhotos">Upload Foto Galeri (Opsional)</FormLabel>
              <div className="mt-2">
                <Input
                  id="galleryPhotos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Anda dapat memilih beberapa foto sekaligus
                </p>
              </div>
              
              {/* Display existing gallery images */}
              {existingGallery.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Foto Yang Ada</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {existingGallery.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Gallery ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeExistingGalleryImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Display newly selected gallery images */}
              {galleryFiles.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Foto Yang Akan Ditambahkan</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {galleryFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New Gallery ${index + 1}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => removeGalleryFile(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="space-y-6 bg-wedding-ivory p-4 rounded-md border border-wedding-champagne/50">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Musik Latar</h3>
            
            <MusicSelector
              selectedMusic={selectedMusic}
              onMusicChange={setSelectedMusic}
            />
          </div>
          

          <Button
            type="submit"
            className="w-full bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {existingData ? 'Perbarui Undangan' : 'Buat Undangan'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TemplateForm;
