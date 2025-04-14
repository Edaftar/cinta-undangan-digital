
import React, { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ProfileAvatarProps {
  avatar_url: string | null;
  firstName: string;
  lastName: string;
  userId: string;
  onAvatarChange: (url: string) => void;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatar_url,
  firstName,
  lastName,
  userId,
  onAvatarChange
}) => {
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    setUploading(true);
    try {
      // First upload to storage
      const { error: uploadError } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = await supabase.storage
        .from('user-avatars')
        .getPublicUrl(filePath);
        
      const publicUrl = urlData.publicUrl;
      onAvatarChange(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Failed to upload avatar');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="h-32 w-32">
          {avatar_url ? (
            <AvatarImage src={avatar_url} />
          ) : (
            <AvatarFallback className="bg-wedding-sage text-white text-3xl">
              {firstName?.[0]}{lastName?.[0]}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="absolute bottom-0 right-0">
          <Label 
            htmlFor="avatar-upload"
            className="bg-wedding-rosegold hover:bg-wedding-deep-rosegold text-white rounded-full p-2 cursor-pointer"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
          </Label>
          <Input 
            id="avatar-upload"
            type="file" 
            accept="image/*" 
            onChange={handleAvatarChange}
            className="hidden"
            disabled={uploading}
          />
        </div>
      </div>
      <p className="text-gray-600 text-center text-sm">
        Click the camera icon to upload a profile photo
      </p>
    </div>
  );
};

export default ProfileAvatar;
