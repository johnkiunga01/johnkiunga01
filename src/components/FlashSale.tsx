import { useState, useEffect } from "react";
import { Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { motion } from "motion/react";

interface FlashSaleProps {
  products: Product[];
  onProductPress: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export function FlashSale({ products, onProductPress, onQuickView, onAddToCart }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="bg-white rounded-2xl border-2 border-primary/10 overflow-hidden shadow-sm">
      <div className="bg-primary p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white animate-pulse">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Flash Sales</h2>
            <p className="text-white/80 text-[10px] uppercase font-bold tracking-widest">Limited Time Offer</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-white/70 text-xs font-bold uppercase mr-2">Ends In:</span>
          <div className="flex gap-1.5">
            {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="bg-white text-primary w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg shadow-inner">
                  {formatTime(val)}
                </div>
                {i < 2 && <span className="text-white font-bold text-xl">:</span>}
              </div>
            ))}
          </div>
        </div>

        <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-primary font-bold gap-2">
          VIEW ALL <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <ProductCard 
                product={product} 
                onPress={onProductPress} 
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
