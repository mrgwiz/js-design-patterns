import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Twitter, BookOpen } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9.06 8.683L5.648 6.238 4.353 7.762l7.72 6.555 7.581-6.56-1.308-1.513-6.285 5.439h-.001z"/>
              </svg>
              <span className="ml-2 text-lg font-semibold">
                <span className="text-secondary">JS</span> Design Patterns
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              A comprehensive learning platform for JavaScript design patterns
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/" className="text-sm hover:text-primary">Home</Link></li>
                <li><a href="#" className="text-sm hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-sm hover:text-primary">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Community</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">GitHub</a></li>
                <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">Discord</a></li>
                <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">Twitter</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-sm hover:text-primary">Terms of Service</a></li>
                <li><a href="#" className="text-sm hover:text-primary">License</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} JS Design Patterns. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Documentation">
                <BookOpen className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
