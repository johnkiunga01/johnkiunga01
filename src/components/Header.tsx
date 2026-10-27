import { Search, ShoppingCart, User, MapPin, Phone, HelpCircle, Globe, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageKey } from "@/types";
import { motion } from "motion/react";

interface HeaderProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
}

export function Header({ currentPage, onNavigate, searchQuery, setSearchQuery, cartCount }: HeaderProps) {
  const isSearchPage = currentPage === "search";

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-1.5 uppercase font-bold">
              <Smartphone className="w-3 h-3" /> Sell on NairoMarket
            </a>
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-1.5 uppercase font-bold">
              <Globe className="w-3 h-3" /> Download App
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-1.5 uppercase font-bold">
              <HelpCircle className="w-3 h-3" /> Help Center
            </a>
            <a href="#" className="hover:text-accent transition-colors flex items-center gap-1.5 uppercase font-bold">
              <MapPin className="w-3 h-3" /> Track Order
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100 py-4 px-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-8">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            onClick={() => onNavigate("home")}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
              N
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-secondary hidden sm:block">
              NAIRO<span className="text-primary">MARKET</span>
            </h1>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-2xl relative group">
            <motion.div 
              layoutId="searchBar"
              className="flex"
              animate={isSearchPage ? { opacity: 0, y: -20, pointerEvents: "none" } : { opacity: 1, y: 0, pointerEvents: "auto" }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative flex-1">
                <Input 
                  placeholder="Search for products, brands and categories..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => onNavigate("search")}
                  className="w-full pl-12 pr-4 py-6 rounded-l-full border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary transition-all bg-gray-50/50"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
              </div>
              <Button 
                className="rounded-r-full px-8 py-6 bg-primary hover:bg-primary-dark text-white font-bold shadow-lg shadow-primary/20"
                onClick={() => onNavigate("search")}
              >
                SEARCH
              </Button>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button 
              variant="ghost" 
              className="flex flex-col items-center gap-0.5 h-auto py-2 px-4 hover:bg-primary-light hover:text-primary group"
              onClick={() => onNavigate("account")}
            >
              <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase">Account</span>
            </Button>
            
            <Button 
              variant="ghost" 
              className="flex flex-col items-center gap-0.5 h-auto py-2 px-4 hover:bg-primary-light hover:text-primary group relative"
              onClick={() => onNavigate("cart")}
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold uppercase">Cart</span>
              <Badge className="absolute top-1 right-2 bg-primary text-white border-none min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[10px]">
                {cartCount}
              </Badge>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
