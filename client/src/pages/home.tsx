import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import PatternCard from "@/components/pattern/pattern-card";
import { Skeleton } from "@/components/ui/skeleton";
import { type Pattern } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: patterns, isLoading } = useQuery<Pattern[]>({
    queryKey: ["/api/patterns"],
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    // If there's a search query, we let the UI filter the results
    // Since all data is client-side, we don't need to make an API call
  };

  // Filter patterns based on category and search query
  const filteredPatterns = patterns?.filter(pattern => {
    const matchesCategory = activeCategory === "all" || pattern.category === activeCategory;
    const matchesSearch = !searchQuery || 
      pattern.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pattern.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">JavaScript Design Patterns</h1>
          <p className="text-lg text-muted-foreground">
            Learn, practice, and master essential design patterns in JavaScript, Node.js, and React
          </p>
        </div>
        
        <form onSubmit={handleSearch} className="relative mb-8">
          <Input
            type="text"
            placeholder="Search patterns..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-3">
            Search
          </Button>
        </form>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-6 w-full justify-start overflow-x-auto">
            <TabsTrigger value="all">All Patterns</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="nodejs">Node.js</TabsTrigger>
            <TabsTrigger value="react">React</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
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
            ) : (
              <>
                {filteredPatterns && filteredPatterns.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPatterns.map((pattern) => (
                      <PatternCard key={pattern.id} pattern={pattern} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-medium mb-2">No patterns found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? `No results found for "${searchQuery}". Try a different search term.`
                        : "No patterns available for this category."}
                    </p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
