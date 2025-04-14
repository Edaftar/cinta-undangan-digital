
-- Add preferences columns to the profiles table
ALTER TABLE public.profiles
ADD COLUMN email_notifications BOOLEAN DEFAULT true,
ADD COLUMN dark_mode BOOLEAN DEFAULT false,
ADD COLUMN language TEXT DEFAULT 'en';
