import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-10 w-40 mb-6 rounded-md" />
      
      <div className="bg-card overflow-hidden shadow-xl rounded-xl">
        <div className="p-6 bg-secondary/30">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <Skeleton className="h-32 w-32 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-10 w-48 rounded-md" />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-secondary/50 p-4 rounded-lg flex items-start">
                <Skeleton className="h-5 w-5 mr-3 mt-1 rounded-full" />
                <div className="w-full">
                  <Skeleton className="h-4 w-1/3 mb-1" />
                  <Skeleton className="h-5 w-2/3" />
                </div>
              </div>
            ))}
          </div>
          
          <Skeleton className="h-px w-full" />

          <div className="space-y-3">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>

          <Skeleton className="h-px w-full" />
          
          <div className="space-y-3">
            <Skeleton className="h-8 w-1/3" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-8 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
