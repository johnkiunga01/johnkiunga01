import { CV } from "@/lib/mock-data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ExternalLink, 
  History, 
  Download,
  MoreVertical,
  Calendar
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CVCardProps {
  cv: CV;
}

export default function CVCard({ cv }: CVCardProps) {
  return (
    <Card className="group overflow-hidden border-border/50 hover:shadow-md transition-all hover:border-primary/20">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
              <FileText className="w-6 h-6" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2"><History className="w-4 h-4" /> Version History</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><Download className="w-4 h-4" /> Download PDF</DropdownMenuItem>
                <DropdownMenuItem className="gap-2 text-destructive"><FileText className="w-4 h-4" /> Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h4 className="font-bold text-lg mb-1 line-clamp-1">{cv.title}</h4>
          
          <div className="flex flex-col gap-2 mt-4">
            {cv.jobUrl && (
              <a 
                href={cv.jobUrl} 
                target="_blank" 
                rel="noreferrer"
                className="text-xs text-primary flex items-center gap-1 hover:underline truncate"
              >
                <ExternalLink className="w-3 h-3" /> Targeted Job Listing
              </a>
            )}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" /> Optimized {cv.lastOptimized}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50/80 border-t border-border/40 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">ATS Score</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-sm font-bold",
                cv.atsScore >= 90 ? "text-green-600" : cv.atsScore >= 75 ? "text-blue-600" : "text-amber-600"
              )}>
                {cv.atsScore}%
              </span>
              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full",
                    cv.atsScore >= 90 ? "bg-green-500" : cv.atsScore >= 75 ? "bg-blue-500" : "bg-amber-500"
                  )} 
                  style={{ width: `${cv.atsScore}%` }} 
                />
              </div>
            </div>
          </div>
          <Badge variant={cv.status === "optimized" ? "default" : "secondary"} className="rounded-full px-3">
            v{cv.version}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper function locally since I don't want to import from lib/utils if not needed but shadcn uses it
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}