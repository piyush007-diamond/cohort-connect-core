import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Smile, 
  Mic, 
  Send,
  FileText,
  Image as ImageIcon,
  Camera,
  Volume2,
  Contact,
  BarChart3
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Friend } from "@/pages/Friends";
import { useChat } from "@/hooks/useChat";
import { useAuth } from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

interface ChatInterfaceProps {
  friend: Friend;
  onProfileClick: () => void;
}

export function ChatInterface({ friend, onProfileClick }: ChatInterfaceProps) {
  const { user } = useAuth();
  const { messages: chatMessages, loading, sendMessage, uploadFile } = useChat(friend.id);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    await sendMessage(newMessage);
    setNewMessage("");
  };

  const handleFileUpload = async (files: FileList | null, type: 'document' | 'media') => {
    if (!files || files.length === 0) return;

    console.log('Starting file upload for', files.length, 'files');
    setUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        console.log('Processing file:', file.name, 'Type:', file.type);
        const url = await uploadFile(file);
        console.log('Upload result for', file.name, ':', url);
        return url;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      const validUrls = uploadedUrls.filter(url => url !== null) as string[];

      console.log('Valid URLs:', validUrls);

      if (validUrls.length > 0) {
        const fileNames = Array.from(files).map(file => file.name);
        const message = type === 'document' 
          ? `📎 ${fileNames.join(', ')}` 
          : `📷 ${fileNames.length} file(s)`;
        
        console.log('Sending message with attachments:', message, validUrls);
        const result = await sendMessage(message, validUrls);
        console.log('Message sent result:', result);
      } else {
        console.error('No valid URLs after upload');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const triggerFileInput = (accept: string, type: 'document' | 'media') => {
    console.log('Triggering file input with accept:', accept, 'type:', type);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      console.log('File input changed, files:', target.files);
      if (target.files && target.files.length > 0) {
        console.log('Selected files:', Array.from(target.files).map(f => f.name));
        handleFileUpload(target.files, type);
      }
    };
    input.click();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getOnlineStatus = () => {
    if (friend.isOnline) return "Active now";
    return "Last seen 2h ago"; // This would come from real data
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div 
        className="p-4 border-b border-border bg-card cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onProfileClick}
      >
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarImage src={friend.avatar} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {friend.initials}
              </AvatarFallback>
            </Avatar>
            {friend.isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent border-2 border-background rounded-full" />
            )}
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{friend.name}</h2>
            <p className="text-sm text-muted-foreground">{getOnlineStatus()}</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        ) : chatMessages.length === 0 ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-muted-foreground">No messages yet. Start a conversation!</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === user?.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender_id === user?.id
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}
              >
                {message.content && <p className="text-sm">{message.content}</p>}
                
                {/* Render media attachments */}
                {message.media_urls && message.media_urls.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.media_urls.map((url, index) => {
                      const isImage = url.match(/\.(jpg|jpeg|png|gif|webp)$/i);
                      const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                      
                      if (isImage) {
                        return (
                          <img
                            key={index}
                            src={url}
                            alt="Shared image"
                            className="max-w-full h-auto rounded-lg cursor-pointer hover:opacity-80"
                            onClick={() => window.open(url, '_blank')}
                          />
                        );
                      } else if (isVideo) {
                        return (
                          <video
                            key={index}
                            src={url}
                            controls
                            className="max-w-full h-auto rounded-lg"
                          />
                        );
                      } else {
                        return (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm underline hover:no-underline"
                          >
                            <FileText className="h-4 w-4" />
                            View attachment
                          </a>
                        );
                      }
                    })}
                  </div>
                )}
                
                <p className={`text-xs mt-1 ${
                  message.sender_id === user?.id ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Input Section */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex items-end space-x-2">
          {/* Plus Button with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Plus className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-48">
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => triggerFileInput('.pdf,.doc,.docx,.txt,.xlsx,.pptx', 'document')}
                disabled={uploading}
              >
                <FileText className="h-4 w-4" />
                Document
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => triggerFileInput('image/*,video/*', 'media')}
                disabled={uploading}
              >
                <ImageIcon className="h-4 w-4" />
                Photo & Video
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer"
                onClick={() => triggerFileInput('image/*', 'media')}
                disabled={uploading}
              >
                <Camera className="h-4 w-4" />
                Camera
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer opacity-50"
                disabled
              >
                <Volume2 className="h-4 w-4" />
                Audio Recording
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer opacity-50"
                disabled
              >
                <Contact className="h-4 w-4" />
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="gap-2 cursor-pointer opacity-50"
                disabled
              >
                <BarChart3 className="h-4 w-4" />
                Poll
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Emoji Button */}
          <Button size="icon" variant="ghost" className="rounded-full">
            <Smile className="h-5 w-5" />
          </Button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <Input
              placeholder={uploading ? "Uploading..." : "Type a message..."}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12"
              disabled={uploading}
            />
            {newMessage.trim() && !uploading && (
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
            )}
            {uploading && (
              <div className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              </div>
            )}
          </div>

          {/* Voice Button */}
          <Button
            size="icon"
            variant={isRecording ? "default" : "ghost"}
            className="rounded-full"
            onClick={() => setIsRecording(!isRecording)}
          >
            <Mic className={`h-5 w-5 ${isRecording ? "text-primary-foreground" : ""}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}