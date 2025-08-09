import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-24 mt-2" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
        <Skeleton className="h-24 w-full mt-4 rounded-xl" />
        <Skeleton className="h-10 w-full mt-4" />
      </CardContent>
    </Card>
  );
}
