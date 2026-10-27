import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">CVForge AI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          <div className="flex items-center gap-3 pl-4 border-l border-border/60">
            <Link to="/auth">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-b border-border bg-background p-4 flex flex-col gap-4"
          >
            <a href="#features" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#pricing" className="px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>Pricing</a>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/auth?mode=signup" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}