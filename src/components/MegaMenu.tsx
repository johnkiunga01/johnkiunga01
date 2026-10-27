import { useState } from "react";
import { ChevronRight, Smartphone, Tv, ShoppingBag, Home, Sparkles, Refrigerator, Baby, Dumbbell, Car, Star, Bath, Heart } from "lucide-react";
import { CATEGORY_STRUCTURE } from "@/constants";
import { cn } from "@/lib/utils";

const IconMap: Record<string, any> = {
  Smartphone, Tv, ShoppingBag, Home, Sparkles, Refrigerator, Baby, Dumbbell, Car, Star, Bath, Heart
};

interface MegaMenuProps {
  onSelectCategory: (category: string) => void;
}

export function MegaMenu({ onSelectCategory }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-visible h-full">
      <div className="py-2">
        {CATEGORY_STRUCTURE.map((category) => {
          const Icon = IconMap[category.icon] || Star;
          return (
            <div
              key={category.name}
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
              onClick={() => onSelectCategory(category.name)}
              className={cn(
                "flex items-center justify-between px-4 py-3 cursor-pointer transition-colors group",
                activeCategory === category.name ? "bg-primary-light text-primary" : "hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("w-5 h-5", activeCategory === category.name ? "text-primary" : "text-gray-400 group-hover:text-primary")} />
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4", activeCategory === category.name ? "text-primary" : "text-gray-300")} />

              {activeCategory === category.name && (
                <div className="absolute left-full top-0 ml-1 w-[600px] bg-white border border-gray-100 shadow-xl rounded-xl p-6 z-50 min-h-full animate-in fade-in slide-in-from-left-2 duration-200">
                  <h3 className="text-lg font-bold text-secondary mb-6 border-b pb-2">{category.name}</h3>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCategory(category.name);
                        }}
                        className="text-sm text-left text-muted-foreground hover:text-primary transition-colors py-1"
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 pt-4 border-t">
                    <button 
                      className="text-primary font-bold text-sm hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(category.name);
                      }}
                    >
                      Shop All {category.name} →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
