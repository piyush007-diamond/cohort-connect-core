import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Image as ImageIcon, Video } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

export function CreatePostModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted" />
            <div className="text-sm font-medium">Your Name</div>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="everyone">
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

        <Textarea placeholder="What's on your mind?" className="min-h-36 rounded-xl" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><ImageIcon size={16} /> Media</Button>
            <Button variant="outline" size="sm"><Video size={16} /> Video</Button>
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
          <Button>Post This</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
