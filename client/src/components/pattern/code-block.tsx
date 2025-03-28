import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/hooks/use-theme";
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';

// Initialize highlight.js with JavaScript language
hljs.registerLanguage('javascript', javascript);

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
  className?: string;
}

export default function CodeBlock({ code, language, title, className }: CodeBlockProps) {
  const { theme } = useTheme();
  const [highlightedCode, setHighlightedCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (code) {
      const highlighted = hljs.highlight(code, { language }).value;
      setHighlightedCode(highlighted);
    }
  }, [code, language]);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <div className={cn("mb-6 rounded-md overflow-hidden border border-border", className)}>
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-accent bg-opacity-10">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{title}</span>
            <span className="px-2 py-0.5 text-xs bg-accent bg-opacity-20 rounded-md">
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-muted-foreground hover:text-foreground" 
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      )}
      <div className={cn(
        "p-4 font-mono text-sm leading-relaxed overflow-x-auto bg-background-code",
        theme === 'dark' ? 'hljs-dark' : 'hljs-light'
      )}>
        <pre className="whitespace-pre" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
      </div>
    </div>
  );
}
