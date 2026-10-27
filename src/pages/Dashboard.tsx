import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { 
  FilePlus, 
  Search, 
  TrendingUp, 
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MOCK_CVS } from "@/lib/mock-data";
import CVCard from "@/components/CVCard";
import LinkedInOptimizer from "@/components/LinkedInOptimizer";
import JobTargeting from "@/components/JobTargeting";
import Pricing from "@/components/Pricing";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [cvs, setCvs] = useState(MOCK_CVS);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar onLogout={onLogout} />
      
      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-white px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Workspace</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="pl-9 h-9 w-64 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button size="sm" className="gap-2">
              <FilePlus className="w-4 h-4" /> New CV
            </Button>
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route index element={<Overview cvs={cvs} />} />
            <Route path="cvs" element={<CVManager cvs={cvs} />} />
            <Route path="linkedin" element={<LinkedInOptimizer />} />
            <Route path="billing" element={<Billing />} />
            <Route path="settings" element={<div className="p-8">Settings content coming soon...</div>} />
            <Route path="optimize" element={<JobTargeting />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function Overview({ cvs }: { cvs: typeof MOCK_CVS }) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Alex</h2>
        <p className="text-muted-foreground">You have 2 pending CV optimizations for upcoming roles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm ring-1 ring-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider">Average ATS Score</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              82% <TrendingUp className="text-green-500 w-5 h-5" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm ring-1 ring-border/50">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider">CVs Optimized</CardDescription>
            <CardTitle className="text-3xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Across 8 target roles</p>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground border-none shadow-lg">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase font-bold tracking-wider text-primary-foreground/70">Optimization Speed</CardDescription>
            <CardTitle className="text-3xl">4s</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-primary-foreground/70">Average generation time</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Recent CVs</h3>
          <Link to="/dashboard/cvs">
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cvs.slice(0, 3).map((cv) => (
            <CVCard key={cv.id} cv={cv} />
          ))}
        </div>
      </div>

      <Card className="bg-slate-900 text-white overflow-hidden relative border-none">
        <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12">
           <Sparkles className="w-32 h-32" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Tailor your CV for a specific job</CardTitle>
          <CardDescription className="text-slate-400 max-w-lg">
            Upload your base CV and paste a job listing URL. We'll optimize your CV for that specific role.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/dashboard/optimize">
            <Button variant="secondary" className="gap-2">
              Start Optimization Flow <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

function CVManager({ cvs }: { cvs: typeof MOCK_CVS }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">CV Manager</h2>
          <p className="text-muted-foreground">Organize and manage your job-specific resumes.</p>
        </div>
        <Button className="gap-2">
          <FilePlus className="w-4 h-4" /> Upload Base CV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cvs.map((cv) => (
          <CVCard key={cv.id} cv={cv} />
        ))}
      </div>
    </div>
  );
}

function Billing() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-border">
        <h2 className="text-xl font-bold mb-2">Current Subscription</h2>
        <div className="flex items-center justify-between py-4 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="font-semibold">Pro Plan</p>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Active</span>
            </div>
            <p className="text-sm text-muted-foreground">800 KES per month • Next billing Apr 20, 2024</p>
          </div>
          <Button variant="outline">Manage Plan</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">CV Usage</span>
              <span className="font-bold">2 / 4</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/2 rounded-full" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground font-medium">AI Tokens</span>
              <span className="font-bold">82% remaining</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[82%] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">Upgrade for more power</h3>
        <Pricing hideLanding />
      </div>
    </div>
  );
}