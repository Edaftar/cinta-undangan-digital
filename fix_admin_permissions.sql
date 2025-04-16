
-- Clear existing admin roles that might be conflicting
DELETE FROM public.roles WHERE role = 'admin';

-- Insert admin role for any user with email ending with 'admin@admin.com'
INSERT INTO public.roles (user_id, role)
SELECT id, 'admin'
FROM auth.users
WHERE email = 'admin@admin.com'
AND NOT EXISTS (
  SELECT 1 FROM public.roles 
  WHERE user_id = auth.users.id 
  AND role = 'admin'
);

-- Create the is_admin function if it doesn't exist
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
