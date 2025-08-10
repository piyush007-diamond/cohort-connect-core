import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export function ResourceFilters() {
  return (
    <div className="flex flex-wrap gap-2">
      <Select>
        <SelectTrigger className="w-[120px] rounded-lg">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectItem value="images">Images</SelectItem>
          <SelectItem value="videos">Videos</SelectItem>
          <SelectItem value="documents">Documents</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className="w-[140px] rounded-lg">
          <SelectValue placeholder="Last Modified" />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectItem value="24h">24 hours</SelectItem>
          <SelectItem value="1w">1 week</SelectItem>
          <SelectItem value="1m">1 month</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1 min-w-[160px]">
        <Input placeholder="People..." className="rounded-lg" />
      </div>
    </div>
  );
}
