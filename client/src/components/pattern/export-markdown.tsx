import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateMarkdown } from "@/lib/utils/markdown";
import { type Pattern } from "@shared/schema";

interface ExportMarkdownProps {
  pattern: Pattern;
}

export default function ExportMarkdown({ pattern }: ExportMarkdownProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      
      // Generate markdown content
      const markdown = generateMarkdown(pattern);
      
      // Create a blob with the markdown content
      const blob = new Blob([markdown], { type: "text/markdown" });
      
      // Create a download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${pattern.slug}.md`;
      
      // Trigger download
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Export successful",
        description: "Pattern documentation has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Could not export pattern documentation",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleExport}
      disabled={isExporting}
    >
      <Download className="w-4 h-4 mr-1" />
      <span>Export MD</span>
    </Button>
  );
}
