import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">CVForge AI</span>
            </div>
            <p className="text-muted-foreground max-w-sm">
              The premium career weapon for professionals. Tailor your CV to any job listing with precision AI in seconds.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">CV Optimizer</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">LinkedIn Profile</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">Get the latest career tips and AI updates.</p>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" className="bg-white" />
              <Button size="sm">Join</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border/60 mt-16 pt-8 flex flex-col md:row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 CVForge AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <a href="#" className="hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}