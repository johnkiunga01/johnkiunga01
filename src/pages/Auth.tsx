import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get("mode") === "signup";
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ name: "Alex Johnson", email: "alex@example.com" }));
      setIsLoading(false);
      onLogin();
      toast.success(isSignup ? "Account created successfully!" : "Welcome back!");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="mb-8 flex flex-col items-center">
        <Link to="/" className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">CVForge AI</span>
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-2xl border-none ring-1 ring-border/50">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isSignup ? "Create an account" : "Welcome back"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSignup 
              ? "Start building ATS-optimized CVs today" 
              : "Enter your credentials to access your dashboard"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" placeholder="name@example.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignup && (
                  <button type="button" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <Input id="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full h-11" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                isSignup ? "Create Account" : "Sign In"
              )}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <Link to="/auth" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link to="/auth?mode=signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>

      <Link to="/" className="mt-8 flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to home
      </Link>
    </div>
  );
}