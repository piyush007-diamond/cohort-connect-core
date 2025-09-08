-- Phase 2: Core Feed System (Posts)
-- Step 2.1: Create posts and comments tables
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_urls TEXT[],
  visibility VARCHAR(20) DEFAULT 'everyone', -- 'everyone', 'friends', 'specific'
  scheduled_time TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2.2: Create connections table for friends
CREATE TABLE public.connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(requester_id, receiver_id)
);

-- Enable RLS on all tables
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for posts
CREATE POLICY "Posts are viewable by everyone for public posts"
ON posts FOR SELECT
USING (
  visibility = 'everyone' OR
  (visibility = 'friends' AND author_id IN (
    SELECT CASE
      WHEN c.requester_id = auth.uid() THEN c.receiver_id
      ELSE c.requester_id
    END
    FROM connections c
    WHERE c.status = 'accepted'
    AND (c.requester_id = auth.uid() OR c.receiver_id = auth.uid())
  )) OR
  author_id = auth.uid()
);

CREATE POLICY "Users can create their own posts"
ON posts FOR INSERT
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts"
ON posts FOR UPDATE
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own posts"
ON posts FOR DELETE
USING (auth.uid() = author_id);

-- RLS Policies for comments
CREATE POLICY "Comments are viewable if post is viewable"
ON comments FOR SELECT
USING (
  post_id IN (
    SELECT id FROM posts WHERE
    visibility = 'everyone' OR
    (visibility = 'friends' AND author_id IN (
      SELECT CASE
        WHEN c.requester_id = auth.uid() THEN c.receiver_id
        ELSE c.requester_id
      END
      FROM connections c
      WHERE c.status = 'accepted'
      AND (c.requester_id = auth.uid() OR c.receiver_id = auth.uid())
    )) OR
    author_id = auth.uid()
  )
);

CREATE POLICY "Users can create comments on viewable posts"
ON comments FOR INSERT
WITH CHECK (
  auth.uid() = author_id AND
  post_id IN (
    SELECT id FROM posts WHERE
    visibility = 'everyone' OR
    (visibility = 'friends' AND author_id IN (
      SELECT CASE
        WHEN c.requester_id = auth.uid() THEN c.receiver_id
        ELSE c.requester_id
      END
      FROM connections c
      WHERE c.status = 'accepted'
      AND (c.requester_id = auth.uid() OR c.receiver_id = auth.uid())
    )) OR
    author_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own comments"
ON comments FOR UPDATE
USING (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments"
ON comments FOR DELETE
USING (auth.uid() = author_id);

-- RLS Policies for connections
CREATE POLICY "Users can view their own connections"
ON connections FOR SELECT
USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can create connection requests"
ON connections FOR INSERT
WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update connections they're involved in"
ON connections FOR UPDATE
USING (auth.uid() = requester_id OR auth.uid() = receiver_id);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_connections_updated_at
  BEFORE UPDATE ON public.connections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();