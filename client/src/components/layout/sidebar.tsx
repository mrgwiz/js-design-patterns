import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Heart } from "lucide-react";
import { type Pattern } from "@shared/schema";

export default function Sidebar() {
  const [location] = useLocation();
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    javascript: true,
    nodejs: false,
    react: false
  });
  
  const { data: patterns } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
  });
  
  const { data: favorites } = useQuery<Pattern[]>({
    queryKey: ["/api/favorites"],
  });
  
  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };
  
  // Group patterns by category
  const patternsByCategory = {
    javascript: patterns?.filter(pattern => pattern.category === 'javascript') || [],
    nodejs: patterns?.filter(pattern => pattern.category === 'nodejs') || [],
    react: patterns?.filter(pattern => pattern.category === 'react') || []
  };
  
  return (
    <aside className="w-64 h-full bg-card overflow-y-auto border-r border-border flex-shrink-0">
      <nav className="py-6 px-3">
        <div className="mb-6">
          <Link href="/">
            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-between px-4 py-2 text-left"
            >
              <span>All Patterns</span>
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* JavaScript Patterns */}
          <Collapsible 
            open={openCategories.javascript} 
            onOpenChange={() => toggleCategory('javascript')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <span>JavaScript</span>
                {openCategories.javascript ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1">
              {patternsByCategory.javascript.map(pattern => (
                <Link key={pattern.id} href={`/pattern/${pattern.slug}`}>
                  <a 
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md hover:bg-accent hover:bg-opacity-50",
                      location === `/pattern/${pattern.slug}` 
                        ? "bg-primary bg-opacity-10 border-l-2 border-primary"
                        : "text-foreground"
                    )}
                  >
                    {pattern.name}
                  </a>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Node.js Patterns */}
          <Collapsible 
            open={openCategories.nodejs} 
            onOpenChange={() => toggleCategory('nodejs')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Node.js</span>
                {openCategories.nodejs ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1">
              {patternsByCategory.nodejs.map(pattern => (
                <Link key={pattern.id} href={`/pattern/${pattern.slug}`}>
                  <a 
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md hover:bg-accent hover:bg-opacity-50",
                      location === `/pattern/${pattern.slug}` 
                        ? "bg-primary bg-opacity-10 border-l-2 border-primary"
                        : "text-foreground"
                    )}
                  >
                    {pattern.name}
                  </a>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* React Patterns */}
          <Collapsible 
            open={openCategories.react} 
            onOpenChange={() => toggleCategory('react')}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <span>React</span>
                {openCategories.react ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-1">
              {patternsByCategory.react.map(pattern => (
                <Link key={pattern.id} href={`/pattern/${pattern.slug}`}>
                  <a 
                    className={cn(
                      "block px-4 py-2 text-sm rounded-md hover:bg-accent hover:bg-opacity-50",
                      location === `/pattern/${pattern.slug}` 
                        ? "bg-primary bg-opacity-10 border-l-2 border-primary"
                        : "text-foreground"
                    )}
                  >
                    {pattern.name}
                  </a>
                </Link>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Favorites Section */}
          <div>
            <Link href="/favorites">
              <div className="flex items-center px-4 py-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Favorites</span>
                {favorites && favorites.length > 0 && (
                  <Badge variant="outline" className="ml-2 px-1.5 py-0.5 text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </div>
            </Link>
            {favorites && favorites.length > 0 && (
              <div className="mt-2 space-y-1">
                {favorites.slice(0, 5).map(pattern => (
                  <Link key={pattern.id} href={`/pattern/${pattern.slug}`}>
                    <a className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-accent hover:bg-opacity-50 text-foreground">
                      <Heart className="w-3 h-3 mr-2 text-primary fill-primary" />
                      {pattern.name}
                    </a>
                  </Link>
                ))}
                {favorites.length > 5 && (
                  <Link href="/favorites">
                    <a className="block px-4 py-2 text-sm rounded-md hover:bg-accent hover:bg-opacity-50 text-primary">
                      View all ({favorites.length})
                    </a>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
}
