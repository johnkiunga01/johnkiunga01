import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Linkedin, 
  Settings, 
  LogOut, 
  Sparkles,
  CreditCard,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  onLogout: () => void;
}

export default function DashboardSidebar({ onLogout }: DashboardSidebarProps) {
  const location = useLocation();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
    { name: "CV Manager", icon: FileText, path: "/dashboard/cvs" },
    { name: "LinkedIn Tools", icon: Linkedin, path: "/dashboard/linkedin" },
    { name: "Billing", icon: CreditCard, path: "/dashboard/billing" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 border-r border-border bg-card/50 flex flex-col h-full sticky top-0">
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">CVForge AI</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              location.pathname === item.path
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <div className="bg-slate-50 p-3 rounded-lg border border-border mb-4">
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
            <span>Usage</span>
            <span>2 / 4 CVs</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary w-1/2 rounded-full" />
          </div>
          <Link to="/dashboard/billing">
            <Button variant="link" size="sm" className="px-0 h-auto text-xs mt-2 text-primary">
              Upgrade to Elite
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border bg-slate-100">
             <img src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/04333007-6586-4328-9846-6ef246276133/user-avatar-94a5dff0-1776353564395.webp" alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Johnson</p>
            <p className="text-[10px] text-muted-foreground truncate">Pro Plan</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive transition-colors"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}