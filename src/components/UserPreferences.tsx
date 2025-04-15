
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserPreferencesProps {
  className?: string;
}

interface Preferences {
  emailNotifications: boolean;
  darkMode: boolean;
  language: string;
}

// Define an interface for profile data that includes our preference fields as optional
interface ProfileData {
  id: string;
  avatar_url: string | null;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  updated_at: string;
  email_notifications?: boolean;
  dark_mode?: boolean;
  language?: string;
  [key: string]: any; // Add index signature to handle any additional properties
}

const UserPreferences: React.FC<UserPreferencesProps> = ({ className }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [preferences, setPreferences] = useState<Preferences>({
    emailNotifications: true,
    darkMode: theme === 'dark',
    language: 'en',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (user) {
      fetchUserPreferences();
    }
  }, [user]);
  
  const fetchUserPreferences = async () => {
    try {
      setLoading(true);
      
      // Fetch preferences from the database
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) {
        console.error('Error fetching preferences:', error);
        toast.error('Failed to load preferences');
        setLoading(false);
        return;
      }
      
      // Cast data to our ProfileData type with optional preference fields
      const profileData = data as ProfileData;
      
      if (profileData) {
        // Use optional chaining and nullish coalescing to handle potentially missing fields
        setPreferences({
          emailNotifications: profileData.email_notifications ?? true,
          darkMode: profileData.dark_mode ?? false,
          language: profileData.language ?? 'en'
        });
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast.error('Failed to load preferences');
      setLoading(false);
    }
  };
  
  const handlePreferenceChange = (name: keyof Preferences, value: any) => {
    setPreferences(prev => {
      // If changing dark mode, also toggle the theme context
      if (name === 'darkMode' && prev.darkMode !== value) {
        // Use setTimeout to avoid state update during render
        setTimeout(() => {
          toggleTheme();
        }, 0);
      }
      return { ...prev, [name]: value };
    });
  };
  
  const handleSavePreferences = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Try to update with the full set of preferences
      let { error } = await supabase
        .from('profiles')
        .update({
          email_notifications: preferences.emailNotifications,
          dark_mode: preferences.darkMode,
          language: preferences.language,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Full update failed:', error);
        
        // If failed, try updating only the dark_mode preference
        const { error: darkModeError } = await supabase
          .from('profiles')
          .update({
            dark_mode: preferences.darkMode,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
          
        if (darkModeError) {
          console.error('Dark mode update failed too:', darkModeError);
          throw darkModeError;
        }
        
        toast.success('Theme preference updated successfully');
        toast.warning('Some preferences could not be saved. Database columns might be missing.');
      } else {
        toast.success('Preferences updated successfully');
      }
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex justify-center items-center py-6">
          <Loader2 className="h-8 w-8 animate-spin text-wedding-rosegold" />
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">Preferences</CardTitle>
        <CardDescription>
          Customize your account preferences and settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="emailNotifications" className="flex-1">
              <div>Email Notifications</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates about your invitations and RSVPs</p>
            </Label>
            <Switch
              id="emailNotifications"
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="darkMode" className="flex-1">
              <div>Dark Mode</div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme throughout the application</p>
            </Label>
            <Switch
              id="darkMode"
              checked={preferences.darkMode}
              onCheckedChange={(checked) => handlePreferenceChange('darkMode', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select
              value={preferences.language}
              onValueChange={(value) => handlePreferenceChange('language', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="id">Indonesian</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          onClick={handleSavePreferences}
          className="w-full bg-wedding-rosegold hover:bg-wedding-deep-rosegold"
          disabled={saving}
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserPreferences;
