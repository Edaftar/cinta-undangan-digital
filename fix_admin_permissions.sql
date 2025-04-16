
-- Create the roles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE(user_id, role)
);

-- Enable RLS on the roles table
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

-- Add policy to allow authenticated users to read their own roles
CREATE POLICY IF NOT EXISTS "Users can read their own roles"
ON public.roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Add policy to allow admins to do everything with roles
CREATE POLICY IF NOT EXISTS "Admins can manage all roles"
ON public.roles
USING (EXISTS (
    SELECT 1 FROM public.roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
));

-- Clear existing admin roles for the specific admin user to avoid duplicates
DELETE FROM public.roles 
WHERE user_id = (SELECT id FROM auth.users WHERE email = 'admin@admin.com')
AND role = 'admin';

-- Insert admin role for the specific admin user
INSERT INTO public.roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'admin@admin.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Create or replace the is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  );
END;
$$;

-- Grant proper permissions
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon;

-- Add proper RLS policies for the roles table
CREATE POLICY IF NOT EXISTS "Allow public read access to roles table"
ON public.roles
FOR SELECT
TO authenticated
USING (true);
