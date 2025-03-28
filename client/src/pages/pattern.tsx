import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "@/components/pattern/code-block";
import CodeEditor from "@/components/pattern/code-editor";
import PatternBreadcrumb from "@/components/pattern/pattern-breadcrumb";
import ExportMarkdown from "@/components/pattern/export-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { type Pattern as PatternType } from "@shared/schema";

export default function Pattern() {
  const { slug } = useParams();
  const { toast } = useToast();
  
  const { data: pattern, isLoading } = useQuery<PatternType>({
    queryKey: [`/api/patterns/${slug}`],
  });
  
  const { data: favoriteStatus, isLoading: isFavoriteStatusLoading } = useQuery<{isFavorite: boolean}>({
    queryKey: [pattern ? `/api/favorites/${pattern.id}` : null],
    enabled: !!pattern,
  });
  
  const addToFavorites = useMutation({
    mutationFn: async () => {
      if (!pattern) return;
      return apiRequest("POST", "/api/favorites", { patternId: pattern.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${pattern?.id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Added to favorites",
        description: "Pattern has been added to your favorites",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add pattern to favorites",
        variant: "destructive",
      });
    },
  });
  
  const removeFromFavorites = useMutation({
    mutationFn: async () => {
      if (!pattern) return;
      return apiRequest("DELETE", `/api/favorites/${pattern.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${pattern?.id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Removed from favorites",
        description: "Pattern has been removed from your favorites",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove pattern from favorites",
        variant: "destructive",
      });
    },
  });
  
  const toggleFavorite = () => {
    if (favoriteStatus?.isFavorite) {
      removeFromFavorites.mutate();
    } else {
      addToFavorites.mutate();
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <Skeleton className="h-6 w-64 mb-6" />
        <Skeleton className="h-12 w-3/4 mb-2" />
        <Skeleton className="h-6 w-full mb-6" />
        <div className="flex gap-2 mb-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-64 w-full mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  
  if (!pattern) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Pattern Not Found</h1>
        <p className="text-muted-foreground">
          The pattern you're looking for doesn't exist.
        </p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
      <PatternBreadcrumb category={pattern.category} patternName={pattern.name} />
      
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">{pattern.name}</h1>
            <p className="text-muted-foreground mt-2">{pattern.description}</p>
          </div>
          <div className="flex mt-4 md:mt-0 space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleFavorite}
              disabled={addToFavorites.isPending || removeFromFavorites.isPending}
            >
              <Heart 
                className={`w-4 h-4 mr-1 ${favoriteStatus?.isFavorite ? 'fill-primary text-primary' : ''}`} 
              />
              <span>{favoriteStatus?.isFavorite ? "Favorited" : "Favorite"}</span>
            </Button>
            <ExportMarkdown pattern={pattern} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className="bg-primary bg-opacity-20 text-primary hover:bg-primary hover:bg-opacity-30">
            {pattern.type}
          </Badge>
          <Badge variant="outline">
            {pattern.category.charAt(0).toUpperCase() + pattern.category.slice(1)}
          </Badge>
          <Badge variant="outline">{pattern.difficulty}</Badge>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: pattern.content }} />
        
        <h2 className="text-xl font-semibold mb-4 text-foreground">Implementation Example</h2>
        <CodeBlock
          code={pattern.codeExample}
          language="javascript"
          title={`${pattern.name} Example`}
        />
        
        <h2 className="text-xl font-semibold mb-4 text-foreground">Try It Yourself</h2>
        <CodeEditor
          initialCode={pattern.codeTemplate}
          language="javascript"
        />
        
        <h2 className="text-xl font-semibold mb-4 text-foreground">Real-World Applications</h2>
        <div className="mb-6">
          {pattern.realWorldExamples.map((example, index) => (
            <div key={index} className="bg-accent bg-opacity-5 p-4 rounded-md mb-4">
              <h3 className="font-medium mb-2">{example.title}</h3>
              <p className="text-muted-foreground text-sm">
                {example.description}
              </p>
            </div>
          ))}
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-foreground">Benefits and Drawbacks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-accent bg-opacity-5 p-4 rounded-md">
            <h3 className="font-medium mb-2 text-green-400">Benefits</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {pattern.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="bg-accent bg-opacity-5 p-4 rounded-md">
            <h3 className="font-medium mb-2 text-red-400">Drawbacks</h3>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {pattern.drawbacks.map((drawback, index) => (
                <li key={index}>{drawback}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-4 text-foreground">Related Patterns</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {pattern.relatedPatterns.map((related, index) => (
            <a 
              href={`/pattern/${related.id}`} 
              key={index} 
              className="block p-4 bg-accent bg-opacity-5 rounded-md hover:bg-opacity-10 transition"
            >
              <h3 className="font-medium mb-1">{related.name}</h3>
              <p className="text-muted-foreground text-sm">{related.description}</p>
            </a>
          ))}
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Further Reading</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pattern.furtherReading.map((reference, index) => (
            <a 
              href={reference.url || "#"} 
              key={index} 
              className="flex items-start p-4 bg-accent bg-opacity-5 rounded-md hover:bg-opacity-10 transition"
              target={reference.url ? "_blank" : undefined}
              rel={reference.url ? "noopener noreferrer" : undefined}
            >
              <div className="flex-shrink-0 mr-4">
                <Download className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">{reference.title}</h3>
                <p className="text-sm text-muted-foreground">{reference.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
