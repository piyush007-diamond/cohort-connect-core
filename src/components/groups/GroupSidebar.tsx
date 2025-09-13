import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";

interface Group {
  id: string;
  name: string;
  preview: string;
  unreadCount: number;
  avatar: string;
}

interface GroupSidebarProps {
  selectedGroup: string | null;
  onGroupSelect: (groupId: string) => void;
  onCreateGroup: () => void;
}

// Mock data for groups
const mockGroups: Group[] = [
  {
    id: "1",
    name: "Study Group CS",
    preview: "Latest discussion about algorithms...",
    unreadCount: 5,
    avatar: "SG"
  },
  {
    id: "2", 
    name: "Web Dev Team",
    preview: "Project meeting tomorrow at 3 PM",
    unreadCount: 12,
    avatar: "WD"
  },
  {
    id: "3",
    name: "Data Science",
    preview: "New dataset uploaded for analysis",
    unreadCount: 3,
    avatar: "DS"
  },
  {
    id: "4",
    name: "Mobile App Dev",
    preview: "UI/UX review session this weekend",
    unreadCount: 0,
    avatar: "MA"
  }
];

export function GroupSidebar({ selectedGroup, onGroupSelect, onCreateGroup }: GroupSidebarProps) {
  const [groups] = useState<Group[]>(mockGroups);

  return (
    <aside className="hidden lg:block w-[280px] flex-shrink-0">
      {/* Action Buttons Section */}
      <div className="group-action-buttons">
        <Button 
          onClick={onCreateGroup}
          className="action-button w-full h-11 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Group
        </Button>
        
        <Button 
          className="action-button w-full h-11 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-xl"
        >
          <Search className="w-4 h-4 mr-2" />
          Explore Groups
        </Button>
      </div>

      {/* Group Separator */}
      <div className="group-separator">
        <span>Groups</span>
      </div>

      {/* Groups List */}
      <div className="groups-container pt-2">
        {groups.map((group) => (
          <div
            key={group.id}
            onClick={() => onGroupSelect(group.id)}

// make the change in the scale instead of translate

            className={`group-item p-3 mb-2 border rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-500 hover:shadow-md hover:scale-[0.98] ${   
              selectedGroup === group.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center">
              {/* Group Avatar */}
              <div className="group-avatar w-9 h-9 rounded-lg flex items-center justify-center text-white font-semibold text-sm mr-3">
                {group.avatar}
              </div>
              
              {/* Group Info */}
              <div className="group-info flex-1 min-w-0">
                <div className="group-name text-sm font-semibold text-gray-900 mb-1 truncate">
                  {group.name}
                </div>
                <div className="group-preview text-xs text-gray-500 truncate">
                  {group.preview}
                </div>
              </div>
              
              {/* Unread Badge */}
              {group.unreadCount > 0 && (
                <div className="unread-badge w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {group.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
