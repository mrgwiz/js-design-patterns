import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatternBreadcrumbProps {
  category: string;
  patternName: string;
  className?: string;
}

export default function PatternBreadcrumb({ category, patternName, className }: PatternBreadcrumbProps) {
  return (
    <nav className={cn("mb-6 flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/">
            <a className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
              <Home className="w-4 h-4 mr-1" />
              Home
            </a>
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <Link href={`/?category=${category}`}>
              <a className="ml-1 text-sm text-muted-foreground hover:text-foreground md:ml-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </a>
            </Link>
          </div>
        </li>
        <li aria-current="page">
          <div className="flex items-center">
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
            <span className="ml-1 text-sm font-medium text-primary md:ml-2">
              {patternName}
            </span>
          </div>
        </li>
      </ol>
    </nav>
  );
}
