-- Create chat-attachments storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('chat-attachments', 'chat-attachments', true);

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated uploads" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'chat-attachments' AND 
  auth.role() = 'authenticated'
);

-- Allow public access to view files
CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'chat-attachments');

-- Allow users to delete their own files
CREATE POLICY "Allow users to delete own files" ON storage.objects
FOR DELETE USING (
  bucket_id = 'chat-attachments' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);
