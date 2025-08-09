import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Users, Layers, Building2 } from "lucide-react";

const tabs = [
  { key: "home", label: "Home", Icon: Home },
  { key: "friends", label: "Friends", Icon: Users },
  { key: "groups", label: "Groups", Icon: Layers },
  { key: "clubs", label: "Clubs", Icon: Building2 },
] as const;

export function NavBar() {
  const [active, setActive] = useState<(typeof tabs)[number]["key"]>("home");

  return (
    <nav className="sticky top-16 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center gap-2">
        <div className="flex items-center gap-2">
          {tabs.map(({ key, label, Icon }) => (
            <Button
              key={key}
              variant={active === key ? "primaryTab" : "ghostTab"}
              onClick={() => setActive(key)}
              aria-current={active === key ? "page" : undefined}
              className={active === key ? "nav-active" : undefined}
            >
              <Icon size={16} className="nav-icon" />
              {label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}
