import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Image as ImageIcon, Video, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { usePosts } from "@/hooks/usePosts";
import { toast } from "sonner";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  currentUser?: any;
}

export function CreatePostModal({ open, onOpenChange, currentUser }: CreatePostModalProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("everyone");
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createPost, uploadPostMedia } = usePosts();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    console.log('Creating post with content:', content);
    setUploading(true);
    try {
      let mediaUrls: string[] = [];
      
      // Upload files if any are selected
      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const url = await uploadPostMedia(file);
          if (url) {
            mediaUrls.push(url);
          }
        }
      }
      
      const result = await createPost(content, visibility, mediaUrls);
      console.log('Post creation result:', result);
      if (result) {
        console.log('Post created successfully, clearing form');
        setContent("");
        setVisibility("everyone");
        setDate(undefined);
        setSelectedFiles([]);
        onOpenChange(false);
      }
    } finally {
      setUploading(false);
    }
  };

  const userInitials = currentUser?.user_metadata?.full_name
    ?.split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase() || currentUser?.email?.[0]?.toUpperCase() || 'U';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser?.user_metadata?.profile_pic_url} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium">
              {currentUser?.user_metadata?.full_name || currentUser?.email || 'Your Name'}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={visibility} onValueChange={setVisibility}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Audience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="friends">Friends</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm"><CalendarIcon size={16} /> Schedule</Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Textarea 
          placeholder="What's on your mind?" 
          className="min-h-36 rounded-xl" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">Selected Media:</div>
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative bg-muted p-2 rounded-lg flex items-center gap-2">
                  <span className="text-xs truncate max-w-[120px]">{file.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFile(index)}
                    className="h-4 w-4 p-0"
                  >
                    <X size={12} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              ref={fileInputRef}
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              <ImageIcon size={16} /> Media
            </Button>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Only For" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Only For: None</SelectItem>
                <SelectItem value="person">Only For: Person</SelectItem>
                <SelectItem value="group">Only For: Group</SelectItem>
                <SelectItem value="club">Only For: Club</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={uploading || !content.trim()}
          >
            {uploading ? 'Posting...' : 'Post This'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
