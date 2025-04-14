
-- Add preferences columns to the profiles table if they don't exist already
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'email_notifications') THEN
        ALTER TABLE public.profiles ADD COLUMN email_notifications BOOLEAN DEFAULT TRUE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'dark_mode') THEN
        ALTER TABLE public.profiles ADD COLUMN dark_mode BOOLEAN DEFAULT FALSE;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'profiles' AND column_name = 'language') THEN
        ALTER TABLE public.profiles ADD COLUMN language TEXT DEFAULT 'en';
    END IF;
END
$$;
