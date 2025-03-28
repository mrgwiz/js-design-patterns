import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import PatternCard from "@/components/pattern/pattern-card";
import { Skeleton } from "@/components/ui/skeleton";
import { type Pattern } from "@shared/schema";
import { Link } from "wouter";

export default function Favorites() {
  const { data: favorites, isLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/favorites"],
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Favorite Patterns</h1>
          <p className="text-muted-foreground">
            Your personal collection of saved design patterns
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-border rounded-md p-4">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>
            ))}
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((pattern) => (
              <PatternCard key={pattern.id} pattern={pattern} showRemove />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed border-border rounded-lg">
            <h3 className="text-xl font-medium mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-6">
              Start adding patterns to your favorites collection
            </p>
            <Button asChild>
              <Link href="/">Browse Patterns</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
