import React from "react";
import { motion } from "motion/react";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
  onPress: (p: Product) => void;
  onQuickView?: (p: Product) => void;
  onAddToCart?: (p: Product) => void;
  key?: React.Key;
}

export function ProductCard({ product, onPress, onQuickView, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <Card 
        className="overflow-hidden h-full cursor-pointer border-none shadow-sm hover:shadow-md transition-shadow group"
        onClick={() => onPress(product)}
      >
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Quick View & Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-32 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation();
                onQuickView?.(product);
              }}
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Button>
            <Button
              variant="default"
              size="sm"
              className="w-32 rounded-full font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75 bg-primary hover:bg-primary-dark"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart?.(product);
              }}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>

          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.badge && (
              <Badge className="bg-primary hover:bg-primary-dark text-white border-none px-2 py-0.5 text-[10px] uppercase font-bold">
                {product.badge}
              </Badge>
            )}
            {product.discount && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white border-none px-2 py-0.5 text-[10px] uppercase font-bold">
                -{product.discount}%
              </Badge>
            )}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              // Add to wishlist logic
            }}
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </Button>
        </div>

        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-secondary line-clamp-2 min-h-[40px] mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold ml-1 text-secondary">{product.rating}</span>
            </div>
            <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-primary">{product.price}</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">{product.oldPrice}</span>
            )}
          </div>
          
          <Button 
            className="w-full mt-4 bg-secondary hover:bg-primary text-white transition-colors gap-2"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart?.(product);
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
