import { Home, Menu, Search, ShoppingCart, User, Heart, Zap } from "lucide-react";
import { PageKey } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface BottomNavProps {
  currentPage: PageKey;
  onNavigate: (page: PageKey) => void;
  cartCount: number;
}

export function BottomNav({ currentPage, onNavigate, cartCount }: BottomNavProps) {
  const navItems = [
    { label: "Home", page: "home" as PageKey, icon: Home },
    { label: "Categories", page: "categories" as PageKey, icon: Menu },
    { label: "Search", page: "search" as PageKey, icon: Search },
    { label: "Cart", page: "cart" as PageKey, icon: ShoppingCart },
    { label: "Account", page: "account" as PageKey, icon: User },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-gray-100 px-2 py-2 flex justify-around items-center z-[100] shadow-[0_-8px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPage === item.page;
        return (
          <button
            key={item.label}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(item.page);
            }}
            className={cn(
              "flex flex-col items-center gap-1 transition-all relative py-2 px-4 rounded-xl",
              isActive ? "text-primary" : "text-gray-400"
            )}
          >
            <motion.div
              animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative"
            >
              <Icon className={cn("w-6 h-6", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              {item.page === "cart" && cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </motion.div>
            <span className={cn(
              "text-[9px] font-black uppercase tracking-wider transition-all",
              isActive ? "opacity-100" : "opacity-0 h-0"
            )}>
              {item.label}
            </span>
            {isActive && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-primary/5 rounded-xl -z-10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
