
-- If an admin role doesn't exist yet for a user, create one
-- Replace 'your-user-id-here' with the actual user ID from the auth.users table
INSERT INTO public.roles (user_id, role)
SELECT auth.uid(), 'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.roles 
  WHERE user_id = auth.uid() 
  AND role = 'admin'
);
