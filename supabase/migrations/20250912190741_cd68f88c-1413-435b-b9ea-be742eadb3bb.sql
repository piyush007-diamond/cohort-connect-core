-- Add missing tables to complete CampusConnect database

-- Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type VARCHAR(50),
    content TEXT,
    related_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create post_interactions table (likes, shares)
CREATE TABLE IF NOT EXISTS public.post_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    interaction_type VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(post_id, user_id, interaction_type)
);

-- Create workspaces table
CREATE TABLE IF NOT EXISTS public.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID REFERENCES groups(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    workflow_steps JSONB,
    created_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    assigned_to UUID REFERENCES profiles(id),
    assigned_by UUID REFERENCES profiles(id),
    workflow_step VARCHAR(100),
    status VARCHAR(20) DEFAULT 'todo',
    due_date DATE,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
CREATE INDEX IF NOT EXISTS idx_post_interactions_post ON post_interactions(post_id);
CREATE INDEX IF NOT EXISTS idx_tasks_workspace ON tasks(workspace_id, status);

-- Enable RLS on new tables
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create security policies
CREATE POLICY "Users can view their notifications" 
ON notifications FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" 
ON notifications FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can mark their notifications as read"
ON notifications FOR UPDATE
USING (user_id = auth.uid());

CREATE POLICY "Users can view post interactions" 
ON post_interactions FOR SELECT 
USING (true);

CREATE POLICY "Users can create interactions" 
ON post_interactions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interactions"
ON post_interactions FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Group members can view workspaces" 
ON workspaces FOR SELECT 
USING (
    group_id IN (
        SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Group members can create workspaces"
ON workspaces FOR INSERT
WITH CHECK (
    auth.uid() = created_by AND
    group_id IN (
        SELECT group_id FROM group_members WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Workspace creators can update workspaces"
ON workspaces FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Workspace members can view tasks" 
ON tasks FOR SELECT 
USING (
    workspace_id IN (
        SELECT w.id FROM workspaces w 
        JOIN group_members gm ON w.group_id = gm.group_id 
        WHERE gm.user_id = auth.uid()
    )
);

CREATE POLICY "Workspace members can create tasks"
ON tasks FOR INSERT
WITH CHECK (
    auth.uid() = assigned_by AND
    workspace_id IN (
        SELECT w.id FROM workspaces w 
        JOIN group_members gm ON w.group_id = gm.group_id 
        WHERE gm.user_id = auth.uid()
    )
);

CREATE POLICY "Assigned users can update their tasks"
ON tasks FOR UPDATE
USING (
    auth.uid() = assigned_to OR 
    auth.uid() = assigned_by OR
    workspace_id IN (
        SELECT w.id FROM workspaces w 
        JOIN group_members gm ON w.group_id = gm.group_id 
        WHERE gm.user_id = auth.uid() AND gm.role = 'admin'
    )
);

-- Add triggers for updated_at timestamps
CREATE TRIGGER update_workspaces_updated_at
  BEFORE UPDATE ON public.workspaces
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
  BEFORE UPDATE ON public.tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();