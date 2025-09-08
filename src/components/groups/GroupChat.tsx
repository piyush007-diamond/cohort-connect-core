import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Image, File, Video } from "lucide-react";

interface Message {
  id: string;
  sender: {
    name: string;
    initials: string;
    avatar?: string;
  };
  content: string;
  timestamp: string;
}

interface GroupChatProps {
  selectedGroup: string | null;
}

// Mock data for groups
const mockGroups = {
  "1": {
    name: "Study Group CS",
    avatar: "SG"
  },
  "2": {
    name: "Web Dev Team", 
    avatar: "WD"
  },
  "3": {
    name: "Data Science",
    avatar: "DS"
  },
  "4": {
    name: "Mobile App Dev",
    avatar: "MA"
  }
};

// Mock messages
const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      name: "Sarah Johnson",
      initials: "SJ"
    },
    content: "Hey everyone! I've been working on the algorithm problems and I think I found a more efficient solution.",
    timestamp: "2:30 PM"
  },
  {
    id: "2", 
    sender: {
      name: "Alex Chen",
      initials: "AC"
    },
    content: "That's great Sarah! Can you share your approach? I'm stuck on the dynamic programming part.",
    timestamp: "2:32 PM"
  },
  {
    id: "3",
    sender: {
      name: "Mike Brown",
      initials: "MB"
    },
    content: "I'll be available for a study session tomorrow at 3 PM if anyone wants to join.",
    timestamp: "2:35 PM"
  }
];

export function GroupChat({ selectedGroup }: GroupChatProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const selectedGroupData = selectedGroup ? mockGroups[selectedGroup as keyof typeof mockGroups] : null;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedGroup) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: {
        name: "You",
        initials: "YO"
      },
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (type: "image" | "file" | "video") => {
    // Create a file input element
    const input = document.createElement('input');
    input.type = 'file';
    
    switch (type) {
      case "image":
        input.accept = "image/*";
        break;
      case "file":
        input.accept = ".pdf,.doc,.docx,.txt";
        break;
      case "video":
        input.accept = "video/*";
        break;
    }

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        // Handle file upload logic here
        console.log(`Uploading ${type}:`, target.files[0].name);
      }
    };

    input.click();
  };

  if (!selectedGroup || !selectedGroupData) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Group</h3>
          <p className="text-gray-500">Choose a group from the sidebar to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-white rounded-lg border border-gray-200">
      {/* Chat Header */}
      <div className="chat-header h-15 bg-white border-b border-gray-200 flex items-center px-5 py-4">
        <div className="group-chat-info flex items-center flex-1">
          <div className="group-avatar w-8 h-8 rounded-lg flex items-center justify-center text-white font-semibold text-xs mr-3">
            {selectedGroupData.avatar}
          </div>
          <div className="group-chat-name text-base font-semibold text-gray-900">
            {selectedGroupData.name}
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="chat-messages flex-1 overflow-y-auto p-5 bg-white">
        {messages.map((message) => (
          <div key={message.id} className="message-item flex mb-4 animate-in slide-in-from-bottom-2 duration-300">
            <Avatar className="message-avatar w-8 h-8 mr-3 flex-shrink-0">
              <AvatarFallback className="text-xs font-semibold">
                {message.sender.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="message-content flex-1">
              <div className="message-header flex items-center mb-1">
                <span className="sender-name text-sm font-semibold text-gray-900 mr-2">
                  {message.sender.name}
                </span>
                <span className="message-time text-xs text-gray-400">
                  {message.timestamp}
                </span>
              </div>
              <div className="message-text text-sm text-gray-900 leading-relaxed">
                {message.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input Area */}
      <div className="message-input-container p-4 bg-white border-t border-gray-200">
        <div className="message-input-wrapper flex items-center bg-gray-50 rounded-full px-4 py-3 border border-gray-200 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="message-input flex-1 border-none bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
          />
          
          <div className="media-buttons flex gap-2 ml-3">
            <Button
              onClick={() => handleFileUpload("image")}
              className="media-button w-8 h-8 p-0 bg-transparent text-gray-500 hover:bg-gray-200 hover:text-blue-600 rounded-full transition-all duration-200"
              title="Share image"
            >
              <Image className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={() => handleFileUpload("file")}
              className="media-button w-8 h-8 p-0 bg-transparent text-gray-500 hover:bg-gray-200 hover:text-blue-600 rounded-full transition-all duration-200"
              title="Share file"
            >
              <File className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={() => handleFileUpload("video")}
              className="media-button w-8 h-8 p-0 bg-transparent text-gray-500 hover:bg-gray-200 hover:text-blue-600 rounded-full transition-all duration-200"
              title="Share video"
            >
              <Video className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="media-button w-8 h-8 p-0 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
