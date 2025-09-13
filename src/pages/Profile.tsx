import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Plus, X, Loader2, Edit2, Check, ArrowLeft } from 'lucide-react';
import { useProfile, type Profile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'PhD'];
const branchOptions = [
  'Computer Science',
  'Information Technology', 
  'Mechanical Engineering',
  'Electrical Engineering',
  'Civil Engineering',
  'Data Science',
  'Business Administration',
  'Design',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Other'
];

const commonSkills = [
  'JavaScript', 'Python', 'React', 'Node.js', 'TypeScript', 'Java', 'C++',
  'Data Analysis', 'Machine Learning', 'UI/UX Design', 'Project Management',
  'Public Speaking', 'Leadership', 'Research', 'Writing', 'Photography'
];

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, updateProfile, uploadProfilePicture } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editData, setEditData] = useState<Partial<Profile>>({});
  const [newSkill, setNewSkill] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      full_name: profile?.full_name || '',
      username: profile?.username || '',
      year_of_study: profile?.year_of_study || '',
      branch: profile?.branch || '',
      bio: profile?.bio || '',
      skills: profile?.skills || [],
    });
  };

  const handleSave = async () => {
    const result = await updateProfile(editData);
    if (!result.error) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({});
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    await uploadProfilePicture(file);
    setUploading(false);
  };

  const addSkill = (skill: string) => {
    if (!skill.trim()) return;
    const currentSkills = editData.skills || [];
    if (!currentSkills.includes(skill)) {
      setEditData(prev => ({
        ...prev,
        skills: [...currentSkills, skill]
      }));
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove: string) => {
    setEditData(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(skill => skill !== skillToRemove)
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Profile not found</h2>
          <p className="text-muted-foreground">Unable to load profile data.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="relative pb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10" />
            <div className="relative flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl">Profile</CardTitle>
                <CardDescription>Manage your CampusConnect profile</CardDescription>
              </div>
              {!isEditing ? (
                <Button onClick={handleEdit} size="sm">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            <div className="relative -mt-16 mb-8">
              <div className="relative inline-block">
                <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                  <AvatarImage 
                    src={profile.profile_pic_url || undefined} 
                    alt={profile.full_name}
                  />
                  <AvatarFallback className="text-2xl font-bold">
                    {profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute bottom-0 right-0 rounded-full shadow-lg"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                  </Button>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  {isEditing ? (
                    <Input
                      id="fullName"
                      value={editData.full_name || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                    />
                  ) : (
                    <p className="text-lg font-medium">{profile.full_name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  {isEditing ? (
                    <Input
                      id="username"
                      value={editData.username || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  ) : (
                    <p className="text-lg">@{profile.username}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study</Label>
                  {isEditing ? (
                    <Select
                      value={editData.year_of_study || ''}
                      onValueChange={(value) => setEditData(prev => ({ ...prev, year_of_study: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {yearOptions.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-lg">{profile.year_of_study || 'Not specified'}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch/Major</Label>
                  {isEditing ? (
                    <Select
                      value={editData.branch || ''}
                      onValueChange={(value) => setEditData(prev => ({ ...prev, branch: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branchOptions.map(branch => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-lg">{profile.branch || 'Not specified'}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={editData.bio || ''}
                    onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.bio || 'No bio available'}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Label>Skills & Interests</Label>
                
                {isEditing && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addSkill(newSkill)}
                      />
                      <Button onClick={() => addSkill(newSkill)} size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {commonSkills.map(skill => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={() => addSkill(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editData.skills : profile.skills)?.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      {isEditing && (
                        <X
                          className="h-3 w-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeSkill(skill)}
                        />
                      )}
                    </Badge>
                  )) || <p className="text-muted-foreground">No skills added yet</p>}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div>
                    <Label>Member since</Label>
                    <p>{new Date(profile.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Last updated</Label>
                    <p>{new Date(profile.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}