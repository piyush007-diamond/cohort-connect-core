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

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSent: boolean;
}

interface ChatInterfaceProps {
  friend: Friend;
  onProfileClick: () => void;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hey! How's the project coming along?",
    timestamp: "10:30 AM",
    isSent: false,
  },
  {
    id: "2", 
    text: "Pretty good! Just finished the frontend part. Working on the backend now.",
    timestamp: "10:32 AM",
    isSent: true,
  },
  {
    id: "3",
    text: "That's awesome! Need any help with the APIs?",
    timestamp: "10:33 AM", 
    isSent: false,
  },
  {
    id: "4",
    text: "Actually yes! Could you help me with the authentication part?",
    timestamp: "10:35 AM",
    isSent: true,
  },
];

export function ChatInterface({ friend, onProfileClick }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      isSent: true,
    };

    setMessages([...messages, message]);
    setNewMessage("");
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
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.isSent
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.isSent ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
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
              <DropdownMenuItem className="gap-2">
                <FileText className="h-4 w-4" />
                Document
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <ImageIcon className="h-4 w-4" />
                Photo & Video
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Camera className="h-4 w-4" />
                Camera
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Volume2 className="h-4 w-4" />
                Audio Recording
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Contact className="h-4 w-4" />
                Contact
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
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
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-12"
            />
            {newMessage.trim() && (
              <Button
                size="icon"
                onClick={handleSendMessage}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
              >
                <Send className="h-4 w-4" />
              </Button>
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