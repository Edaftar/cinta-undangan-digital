
-- Add preference columns to profiles table if they don't exist

DO $$
BEGIN
    -- Check if email_notifications column exists
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'email_notifications'
    ) THEN
        ALTER TABLE profiles ADD COLUMN email_notifications BOOLEAN DEFAULT TRUE;
    END IF;

    -- Check if dark_mode column exists
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'dark_mode'
    ) THEN
        ALTER TABLE profiles ADD COLUMN dark_mode BOOLEAN DEFAULT FALSE;
    END IF;

    -- Check if language column exists
    IF NOT EXISTS (
        SELECT FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'language'
    ) THEN
        ALTER TABLE profiles ADD COLUMN language TEXT DEFAULT 'en';
    END IF;
END
$$;
