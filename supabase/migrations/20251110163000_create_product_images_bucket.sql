-- Set up access controls for the product images bucket
-- Note: The bucket itself must be created manually through the Supabase dashboard
-- Bucket name: product-images
-- Bucket settings: Public access enabled

CREATE POLICY "Anyone can view product images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Users can update their own product images" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'product-images' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'product-images' AND auth.uid() = owner);

CREATE POLICY "Users can delete their own product images" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'product-images' AND auth.uid() = owner);

-- Grant necessary permissions
GRANT ALL ON TABLE storage.objects TO authenticated;