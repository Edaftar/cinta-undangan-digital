
import React, { useState } from "react";
import { toast } from "sonner";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  id?: string;
  value: string | string[] | null;
  onChange: (url: string | string[]) => void;
  multiple?: boolean;
}

const ImageUpload = ({ id, value, onChange, multiple = false }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const files = Array.from(e.target.files);
    setUploading(true);
    
    try {
      // Create directory if it doesn't exist
      const timestamp = Date.now();
      const uploadPath = `wedding-images/${timestamp}`;
      
      // Upload each file
      const uploadPromises = files.map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${uploadPath}/${fileName}`;
        
        const { error, data } = await supabase.storage
          .from('user-avatars')
          .upload(filePath, file);
          
        if (error) {
          console.error('Error uploading file:', error);
          toast.error(`Failed to upload ${file.name}`);
          return null;
        }
        
        const { data: { publicUrl } } = supabase.storage
          .from('user-avatars')
          .getPublicUrl(filePath);
          
        return publicUrl;
      });
      
      const uploadedUrls = (await Promise.all(uploadPromises)).filter(Boolean) as string[];
      
      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : [];
        onChange([...currentUrls, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
      
      toast.success('Image uploaded successfully!');
      
    } catch (error: any) {
      console.error('Error in upload process:', error);
      toast.error('Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (urlToRemove: string) => {
    if (multiple && Array.isArray(value)) {
      onChange(value.filter(url => url !== urlToRemove));
    } else {
      onChange("");
    }
  };

  const handleAddExternalUrl = () => {
    if (!urlInput.trim()) return;
    
    // Basic URL validation
    let url = urlInput.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`;
    }
    
    try {
      new URL(url);
      
      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : [];
        onChange([...currentUrls, url]);
      } else {
        onChange(url);
      }
      
      setUrlInput("");
      toast.success('External URL added!');
    } catch (error) {
      toast.error('Please enter a valid URL');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          id={id}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          multiple={multiple}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(id || 'file-upload')?.click()}
          disabled={uploading}
          className="flex-1"
        >
          <Upload className="mr-2 h-4 w-4" />
          {uploading ? "Uploading..." : "Upload Image"}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Or paste image URL"
          value={urlInput}
          onChange={e => setUrlInput(e.target.value)}
          className="flex-1"
        />
        <Button 
          type="button"
          variant="outline"
          onClick={handleAddExternalUrl}
        >
          Add URL
        </Button>
      </div>

      {/* Preview area for single image */}
      {!multiple && value && typeof value === 'string' && value !== "" && (
        <div className="relative rounded-md overflow-hidden border border-gray-200">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-48 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-8 w-8 bg-white bg-opacity-70 hover:bg-opacity-100"
            onClick={() => handleRemoveImage(value)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Preview grid for multiple images */}
      {multiple && Array.isArray(value) && value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {value.map((url, index) => (
            <div key={index} className="relative rounded-md overflow-hidden border border-gray-200 h-32">
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 bg-white bg-opacity-70 hover:bg-opacity-100"
                onClick={() => handleRemoveImage(url)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {((multiple && (!value || (Array.isArray(value) && value.length === 0))) || 
       (!multiple && (!value || value === ""))) && (
        <div className="border-2 border-dashed border-gray-200 rounded-md p-8 text-center text-gray-500">
          <ImageIcon className="mx-auto h-10 w-10 mb-2" />
          <p>No images uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
