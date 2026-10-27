import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { History } from "lucide-react";

interface RecentlyViewedProps {
  products: Product[];
  onProductPress: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export function RecentlyViewed({ products, onProductPress, onQuickView, onAddToCart }: RecentlyViewedProps) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
          <History className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onPress={onProductPress} 
            onQuickView={onQuickView} 
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
