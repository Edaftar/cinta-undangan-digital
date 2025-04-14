
-- Create a storage bucket for user avatars
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-avatars', 'User Avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Set up public access policy for the avatars
CREATE POLICY "Public Access to Avatars" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'user-avatars'
  );

-- Allow authenticated users to upload avatars
CREATE POLICY "Users can upload their own avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'user-avatars' AND
    auth.uid() IS NOT NULL
  );
