/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export function SignatureMoment() {
  // Subtle reactive glow following cursor (respects reduced motion)
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <div
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setPos({ x, y });
      }}
      className="relative hidden md:block w-full h-10"
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60 will-change-transform"
        style={{
          background: `radial-gradient(300px circle at ${pos.x}% ${pos.y}%, hsl(var(--primary)/0.12), transparent 60%)`,
          transition: "background 120ms ease-out",
        }}
      />
    </div>
  );
}
