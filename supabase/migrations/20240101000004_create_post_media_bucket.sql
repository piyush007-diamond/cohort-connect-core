-- Create post-media storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-media', 'post-media', true);

-- Allow authenticated users to upload post media
CREATE POLICY "Allow authenticated post media uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'post-media' AND 
  auth.role() = 'authenticated'
);

-- Allow public access to view post media
CREATE POLICY "Allow public access to post media" ON storage.objects
FOR SELECT USING (bucket_id = 'post-media');

-- Allow users to delete their own post media
CREATE POLICY "Allow users to delete own post media" ON storage.objects
FOR DELETE USING (
  bucket_id = 'post-media' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
