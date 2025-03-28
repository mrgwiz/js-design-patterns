import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Pattern } from "@shared/schema";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface PatternCardProps {
  pattern: Pattern;
  showRemove?: boolean;
}

export default function PatternCard({ pattern, showRemove = false }: PatternCardProps) {
  const { toast } = useToast();
  
  const { data: favoriteStatus } = useQuery<{isFavorite: boolean}>({
    queryKey: [`/api/favorites/${pattern.id}`],
  });
  
  const removeFavorite = useMutation({
    mutationFn: async () => {
      return apiRequest("DELETE", `/api/favorites/${pattern.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${pattern.id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Success",
        description: "Pattern removed from favorites",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive",
      });
    },
  });
  
  return (
    <Card className="group hover:border-primary transition-colors">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <Link href={`/pattern/${pattern.slug}`}>
            <a className="block">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                {pattern.name}
              </h3>
              <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                {pattern.description}
              </p>
            </a>
          </Link>
          
          {showRemove && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => removeFavorite.mutate()}
              disabled={removeFavorite.isPending}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
          
          {!showRemove && favoriteStatus?.isFavorite && (
            <Heart className="h-4 w-4 text-primary fill-primary" />
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className="bg-primary bg-opacity-20 text-primary hover:bg-primary hover:bg-opacity-30">
            {pattern.type}
          </Badge>
          <Badge variant="outline">
            {pattern.category.charAt(0).toUpperCase() + pattern.category.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
