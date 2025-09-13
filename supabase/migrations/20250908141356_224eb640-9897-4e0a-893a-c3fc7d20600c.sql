-- Phase 3: Sidebar Data Integration
-- Step 3.1: Create Group & Club tables
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  profile_pic_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.group_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

CREATE TABLE public.clubs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  profile_pic_url TEXT,
  banner_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.club_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id UUID REFERENCES clubs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(20) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(club_id, user_id)
);

-- Step 3.2: Create Direct Messages & Events tables
CREATE TABLE public.direct_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT,
  media_urls TEXT[],
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  edited_at TIMESTAMPTZ
);

CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT,
  event_type VARCHAR(50),
  organizer_type VARCHAR(20),
  organizer_id UUID,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  image_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Phase 4: Interactive Features
-- Step 4.1: Create post_visibility table
CREATE TABLE public.post_visibility (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  visible_to_user UUID REFERENCES profiles(id) ON DELETE CASCADE,
  visible_to_group UUID REFERENCES groups(id) ON DELETE CASCADE,
  visible_to_club UUID REFERENCES clubs(id) ON DELETE CASCADE
);

-- Enable RLS on all new tables
ALTER TABLE groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_visibility ENABLE ROW LEVEL SECURITY;

-- RLS Policies for groups
CREATE POLICY "Groups are viewable by everyone"
ON groups FOR SELECT
USING (true);

CREATE POLICY "Users can create groups"
ON groups FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Group creators can update their groups"
ON groups FOR UPDATE
USING (auth.uid() = created_by);

-- RLS Policies for group_members
CREATE POLICY "Group members are viewable by group members"
ON group_members FOR SELECT
USING (
  user_id = auth.uid() OR
  group_id IN (
    SELECT group_id FROM group_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can join groups"
ON group_members FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for clubs
CREATE POLICY "Clubs are viewable by everyone"
ON clubs FOR SELECT
USING (true);

CREATE POLICY "Users can create clubs"
ON clubs FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Club creators can update their clubs"
ON clubs FOR UPDATE
USING (auth.uid() = created_by);

-- RLS Policies for club_members
CREATE POLICY "Club members are viewable by club members"
ON club_members FOR SELECT
USING (
  user_id = auth.uid() OR
  club_id IN (
    SELECT club_id FROM club_members WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Users can join clubs"
ON club_members FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- RLS Policies for direct_messages
CREATE POLICY "Users can view their own messages"
ON direct_messages FOR SELECT
USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages"
ON direct_messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages"
ON direct_messages FOR UPDATE
USING (auth.uid() = sender_id);

-- RLS Policies for events
CREATE POLICY "Events are viewable by everyone"
ON events FOR SELECT
USING (true);

CREATE POLICY "Users can create events"
ON events FOR INSERT
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Event creators can update their events"
ON events FOR UPDATE
USING (auth.uid() = created_by);

-- RLS Policies for post_visibility
CREATE POLICY "Post visibility viewable by post author"
ON post_visibility FOR SELECT
USING (
  post_id IN (
    SELECT id FROM posts WHERE author_id = auth.uid()
  )
);

CREATE POLICY "Users can set visibility for their posts"
ON post_visibility FOR INSERT
WITH CHECK (
  post_id IN (
    SELECT id FROM posts WHERE author_id = auth.uid()
  )
);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON public.groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clubs_updated_at
  BEFORE UPDATE ON public.clubs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();