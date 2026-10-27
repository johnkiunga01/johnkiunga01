import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Linkedin, Sparkles, Check, RefreshCw, Loader2, Copy } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function LinkedInOptimizer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<null | {
    headline: string;
    about: string;
    tips: string[];
  }>(null);

  const handleOptimize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI
    setTimeout(() => {
      setResult({
        headline: "Senior Frontend Architect | React 19 Expert | Transforming Complex SaaS Visions into Performance-Driven UI",
        about: "Strategic-minded Frontend Architect with 8+ years of experience in building scalable, enterprise-grade React applications. Expert in React 19, TypeScript, and high-performance system design. Proven track record of reducing bundle sizes by 40% and leading engineering teams to deliver award-winning UI/UX.",
        tips: [
          "Include keywords like 'System Design', 'React 19', and 'Frontend Architecture' in your skills section.",
          "Add quantifiable achievements to your current role bullets.",
          "Enable 'Open to Work' with specific focus on Senior/Lead roles."
        ]
      });
      setIsLoading(false);
      toast.success("LinkedIn profile optimized!");
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.info("Copied to clipboard");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">LinkedIn Optimizer</h2>
        <p className="text-muted-foreground">Tailor your professional brand to match your optimized CV.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Details</CardTitle>
              <CardDescription>Enter your current LinkedIn info</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOptimize} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin-url">LinkedIn URL</Label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input id="linkedin-url" placeholder="linkedin.com/in/username" className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="skills">Core Skills</Label>
                  <Textarea id="skills" placeholder="React, TypeScript, Node.js..." className="min-h-[100px]" />
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate Optimization
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          {!result ? (
            <div className="h-full min-h-[400px] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                <Linkedin className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Optimization Generated</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Fill out the form on the left to receive AI-powered suggestions for your LinkedIn profile.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <Card className="border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-primary hover:bg-primary">AI Suggested Headline</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(result.headline)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">{result.headline}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md font-bold">About Section Rewrite</CardTitle>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard(result.about)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-slate-700">{result.about}</p>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground px-1">Quick Wins</h4>
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-border">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full gap-2" onClick={() => setResult(null)}>
                <RefreshCw className="w-4 h-4" /> Reset and Try Again
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}