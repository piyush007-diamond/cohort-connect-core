-- Step 2.3: Implement the get_user_feed Database Function
CREATE OR REPLACE FUNCTION get_user_feed(user_id UUID DEFAULT auth.uid())
RETURNS TABLE (
  post_id UUID,
  content TEXT,
  author_name VARCHAR,
  author_pic TEXT,
  author_id UUID,
  created_at TIMESTAMPTZ,
  media_urls TEXT[]
) 
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.content,
    pr.full_name,
    pr.profile_pic_url,
    p.author_id,
    p.created_at,
    p.media_urls
  FROM posts p
  JOIN profiles pr ON p.author_id = pr.id
  WHERE p.is_published = true
  AND (
    p.visibility = 'everyone'
    OR (p.visibility = 'friends' AND p.author_id IN (
      SELECT CASE
        WHEN c.requester_id = user_id THEN c.receiver_id
        ELSE c.requester_id
      END
      FROM connections c
      WHERE c.status = 'accepted'
      AND (c.requester_id = user_id OR c.receiver_id = user_id)
    ))
    OR p.author_id = user_id
  )
  ORDER BY p.created_at DESC
  LIMIT 50;
END;
$$ LANGUAGE plpgsql;

-- Create storage buckets for profile pictures and post media
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile-pictures', 'profile-pictures', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('post-media', 'post-media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for profile pictures
CREATE POLICY "Profile pictures are publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-pictures');

CREATE POLICY "Users can upload their own profile pictures"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'profile-pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own profile pictures"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile-pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own profile pictures"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'profile-pictures' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Storage policies for post media
CREATE POLICY "Post media is publicly viewable"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-media');

CREATE POLICY "Users can upload post media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-media' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own post media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-media' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);