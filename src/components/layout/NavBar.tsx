import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Users, Layers, Building2 } from "lucide-react";

const tabs = [
  { key: "home", label: "Home", Icon: Home, path: "/" },
  { key: "friends", label: "Friends", Icon: Users, path: "/friends" },
  { key: "groups", label: "Groups", Icon: Layers, path: "/groups" },
  { key: "clubs", label: "Clubs", Icon: Building2, path: "/clubs" },
] as const;

export function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveTab = () => {
    const currentPath = location.pathname;
    return tabs.find(tab => tab.path === currentPath)?.key || "home";
  };

  const handleTabClick = (tab: typeof tabs[number]) => {
    navigate(tab.path);
  };

  return (
    <nav className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={getActiveTab() === tab.key ? "primaryTab" : "ghostTab"}
              onClick={() => handleTabClick(tab)}
              aria-current={getActiveTab() === tab.key ? "page" : undefined}
            >
              <tab.Icon size={16} />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
