import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { MegaMenu } from "@/components/MegaMenu";
import { ProductCard } from "@/components/ProductCard";
import { FlashSale } from "@/components/FlashSale";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { BottomNav } from "@/components/BottomNav";
import { FilterSidebar } from "@/components/FilterSidebar";
import { PRODUCTS, CATEGORY_STRUCTURE } from "@/constants";
import { useState, useMemo, useEffect } from "react";
import { fetchShopifyProducts } from "@/services/shopify";
import { PageKey, Product } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Zap, TrendingUp, Heart, Star, ShoppingCart, X, Filter, ChevronRight, Search as SearchIcon, Trash2, User as UserIcon, Package, MapPin, CreditCard, Settings, Home, Bath, Sparkles, Dumbbell, Tv } from "lucide-react";

const IconMap: Record<string, any> = {
  Star, Home, Bath, Sparkles, Dumbbell, Tv, Heart
};

export default function App() {
  const [page, setPage] = useState<PageKey>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productTab, setProductTab] = useState<"description" | "specs" | "reviews">("description");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minDiscount, setMinDiscount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<Product[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load products from Shopify if available
  useEffect(() => {
    const loadShopify = async () => {
      const shopifyData = await fetchShopifyProducts();
      if (shopifyData && shopifyData.length > 0) {
        setAllProducts(shopifyData);
      }
    };
    loadShopify();
  }, []);

  // Load recently viewed and cart from localStorage
  useEffect(() => {
    const savedRecently = localStorage.getItem("recentlyViewed");
    if (savedRecently) {
      try {
        const ids = JSON.parse(savedRecently) as number[];
        const products = ids
          .map(id => allProducts.find(p => p.id === id))
          .filter((p): p is Product => !!p);
        setRecentlyViewed(products);
      } catch (e) {
        console.error("Failed to parse recently viewed", e);
      }
    }

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const ids = JSON.parse(savedCart) as number[];
        const products = ids
          .map(id => allProducts.find(p => p.id === id))
          .filter((p): p is Product => !!p);
        setCart(products);
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, [allProducts]);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart.map(p => p.id)));
  }, [cart]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const addToRecentlyViewed = (p: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== p.id);
      const updated = [p, ...filtered].slice(0, 5);
      localStorage.setItem("recentlyViewed", JSON.stringify(updated.map(item => item.id)));
      return updated;
    });
  };

  const openProduct = (p: Product) => {
    setSelectedProduct(p);
    setPage("product");
    addToRecentlyViewed(p);
  };

  const openQuickView = (p: Product) => {
    setQuickViewProduct(p);
  };

  const addToCart = (p: Product) => {
    setCart([...cart, p]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery && selectedCategories.length === 0 && minDiscount === 0) return allProducts;
    
    return allProducts.filter(p => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesDiscount = (p.discount || 0) >= minDiscount;
      
      const searchTerms = searchQuery.toLowerCase().split(" ").filter(t => t.length > 0);
      const matchesSearch = searchTerms.length === 0 || searchTerms.every(term => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term) ||
        p.badge?.toLowerCase().includes(term)
      );
      
      return matchesCategory && matchesDiscount && matchesSearch;
    });
  }, [selectedCategories, minDiscount, searchQuery, allProducts]);

  const flashSales = useMemo(() => allProducts.filter(p => p.discount && p.discount >= 30), [allProducts]);
  const trending = useMemo(() => allProducts.slice(4, 8), [allProducts]);
  const recommended = useMemo(() => allProducts.slice(0, 8), [allProducts]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header 
        currentPage={page}
        onNavigate={setPage} 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        cartCount={cart.length}
      />

      <main className="flex-1 pb-20 md:pb-0 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page + (page === 'home' ? searchQuery + selectedCategories.join(',') : '')}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {page === "home" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start mb-12">
              {/* Sidebar / MegaMenu */}
              <aside className="hidden lg:block">
                <div className="h-[450px]">
                  <MegaMenu onSelectCategory={(cat) => setSelectedCategories([cat])} />
                </div>
              </aside>

              <div className="flex flex-col">
                {selectedCategories.length === 0 && minDiscount === 0 && searchQuery === "" ? (
                  <HeroCarousel />
                ) : (
                  <div className="h-[450px] bg-slate-50 rounded-2xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                      <Badge className="bg-primary text-white mb-4 font-black">SEARCH RESULTS</Badge>
                      <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase mb-4 leading-tight">
                        Finding your <br /> perfect match
                      </h2>
                      <p className="text-muted-foreground text-lg mb-8 max-w-md">
                        We've filtered our collection to show you exactly what you're looking for.
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-2 border-primary text-primary font-bold px-8 hover:bg-primary hover:text-white transition-all"
                        onClick={() => {
                          setSelectedCategories([]);
                          setMinDiscount(0);
                          setSearchQuery("");
                        }}
                      >
                        CLEAR ALL FILTERS
                      </Button>
                    </div>
                    <div className="absolute right-0 bottom-0 opacity-5 text-[200px] translate-x-1/4 translate-y-1/4 select-none pointer-events-none">
                      🔍
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-12">
              {/* Filter Trigger & Stats */}
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <Sheet>
                  <SheetTrigger render={<Button variant="outline" size="sm" className="gap-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all" />}>
                    <Filter className="w-4 h-4" /> FILTERS
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] p-0">
                    <div className="p-6">
                      <h2 className="text-xl font-black text-secondary mb-6 uppercase">Filters</h2>
                      <FilterSidebar 
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        minDiscount={minDiscount}
                        setMinDiscount={setMinDiscount}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {filteredProducts.length} Products Found
                </span>
              </div>

              {/* Filtered Results or Sections */}
              {(selectedCategories.length > 0 || minDiscount > 0 || searchQuery !== "") ? (
                <section>
                  {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {filteredProducts.map((product, idx) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <ProductCard 
                            product={product} 
                            onPress={openProduct} 
                            onQuickView={openQuickView} 
                            onAddToCart={addToCart}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-2xl">
                      <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-bold text-secondary mb-2">No products found</h3>
                      <p className="text-muted-foreground">Try adjusting your filters or search query</p>
                    </div>
                  )}
                </section>
              ) : (
                  <>
                    {/* Categories Section */}
                    <section>
                      <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-black text-secondary uppercase tracking-tight">Shop by Category</h2>
                        <Button variant="link" className="text-primary font-bold" onClick={() => setPage("categories")}>VIEW ALL</Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {CATEGORY_STRUCTURE.slice(0, 6).map((cat) => {
                          const Icon = IconMap[cat.icon] || Star;
                          return (
                            <div 
                              key={cat.name}
                              onClick={() => setSelectedCategories([cat.name])}
                              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary transition-all cursor-pointer text-center group"
                            >
                              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-light transition-colors">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{cat.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* Flash Sales */}
                    <FlashSale 
                      products={flashSales} 
                      onProductPress={openProduct} 
                      onQuickView={openQuickView}
                      onAddToCart={addToCart}
                    />

                    {/* Banner */}
                    <div className="bg-primary-dark rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
                      <div className="relative z-10">
                        <Badge className="bg-accent text-secondary mb-4 font-black">LIMITED OFFER</Badge>
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
                          UP TO 50% OFF ON <br /> SMART HOME APPLIANCES
                        </h2>
                        <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-bold px-8">
                          SHOP NOW
                        </Button>
                      </div>
                      <div className="text-[180px] opacity-10 absolute -right-10 -bottom-10 select-none pointer-events-none">
                        🏠
                      </div>
                    </div>

                    {/* Trending */}
                    <section>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-600 p-2 rounded-lg text-white">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <h2 className="text-2xl font-black tracking-tight text-secondary uppercase">Trending Now</h2>
                        </div>
                        <Button variant="link" className="text-primary font-bold">SEE ALL →</Button>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trending.map(product => (
                          <ProductCard 
                            key={product.id} 
                            product={product} 
                            onPress={openProduct} 
                            onQuickView={openQuickView} 
                            onAddToCart={addToCart}
                          />
                        ))}
                      </div>
                    </section>

                    {/* Recently Viewed Section */}
                    <RecentlyViewed 
                      products={recentlyViewed} 
                      onProductPress={openProduct} 
                      onQuickView={openQuickView} 
                      onAddToCart={addToCart}
                    />
                  </>
                )}
            </div>
          </div>
        )}

        {page === "search" && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-black text-secondary mb-4 uppercase tracking-tight">Search</h1>
              <motion.div layoutId="searchBar" className="relative">
                <Input 
                  autoFocus
                  placeholder="What are you looking for?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-8 rounded-2xl border-2 border-primary/20 focus-visible:ring-primary focus-visible:border-primary text-lg shadow-sm"
                />
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </motion.div>
            </div>

            {searchQuery ? (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {filteredProducts.length} Results Found
                  </h2>
                  <Button 
                    variant="link" 
                    className="text-primary font-bold p-0 h-auto"
                    onClick={() => {
                      setPage("home");
                    }}
                  >
                    VIEW ON HOME PAGE →
                  </Button>
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredProducts.slice(0, 12).map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <ProductCard 
                          product={product} 
                          onPress={openProduct} 
                          onQuickView={openQuickView} 
                          onAddToCart={addToCart}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <SearchIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-secondary mb-2">No matches found</h3>
                    <p className="text-muted-foreground">Try different keywords or browse categories</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-12">
                <div>
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Popular Categories</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CATEGORY_STRUCTURE.slice(0, 4).map((cat, idx) => (
                      <motion.button 
                        key={cat.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => {
                          setSelectedCategories([cat.name]);
                          setPage("home");
                        }}
                        className="flex items-center gap-3 p-4 bg-white border border-gray-100 rounded-xl hover:border-primary hover:shadow-md transition-all text-left group"
                      >
                        <div className="w-10 h-10 bg-primary-light rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                          <Star className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-secondary text-sm">{cat.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-6">Trending Products</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {trending.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + idx * 0.1 }}
                      >
                        <ProductCard 
                          product={product} 
                          onPress={openProduct} 
                          onQuickView={openQuickView} 
                          onAddToCart={addToCart}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {page === "categories" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-black text-secondary mb-8 uppercase tracking-tight">All Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {CATEGORY_STRUCTURE.map((cat) => {
                const Icon = IconMap[cat.icon] || Star;
                return (
                  <div 
                    key={cat.name} 
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    onClick={() => {
                      setSelectedCategories([cat.name]);
                      setPage("home");
                    }}
                  >
                    <div className="w-12 h-12 bg-primary-light text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-secondary mb-2">{cat.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase font-bold">{cat.subcategories.length} Subcategories</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {page === "cart" && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-black text-secondary uppercase tracking-tight font-display">Your Shopping Cart</h1>
              <Badge variant="outline" className="font-bold border-primary text-primary">{cart.length} ITEMS</Badge>
            </div>
            
            {cart.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-6 border-b last:border-0 hover:bg-slate-50/50 transition-colors group">
                        <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                          <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-secondary line-clamp-1 text-lg mb-1">{item.name}</h3>
                          <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-2">{item.category}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-primary font-black text-xl">{item.price}</span>
                            {item.oldPrice && <span className="text-sm text-muted-foreground line-through">{item.oldPrice}</span>}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-full" 
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                          <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden bg-white">
                            <button className="px-2 py-1 hover:bg-gray-50 text-xs font-bold">-</button>
                            <span className="px-3 py-1 text-xs font-black border-x border-gray-100">1</span>
                            <button className="px-2 py-1 hover:bg-gray-50 text-xs font-bold">+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    className="text-primary font-bold gap-2 hover:bg-primary/5"
                    onClick={() => setPage("home")}
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    CONTINUE SHOPPING
                  </Button>
                </div>

                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-black text-secondary uppercase mb-6 font-display">Order Summary</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Subtotal</span>
                        <span className="font-bold text-secondary">KSh {cart.reduce((acc, item) => acc + parseInt(item.price.replace(/\D/g, "")), 0).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Shipping</span>
                        <span className="font-bold text-green-600 uppercase">Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground font-medium">Tax</span>
                        <span className="font-bold text-secondary">KSh 0</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-lg font-black text-secondary uppercase font-display">Total</span>
                        <span className="text-2xl font-black text-primary">KSh {cart.reduce((acc, item) => acc + parseInt(item.price.replace(/\D/g, "")), 0).toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary-dark text-white font-black py-8 text-lg rounded-xl shadow-xl shadow-primary/20 gap-2">
                      CHECKOUT NOW
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                    <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase font-bold tracking-widest">Secure SSL Encryption</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-4 h-4 text-primary fill-current" />
                      <span className="text-xs font-black text-secondary uppercase">Express Delivery</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      Eligible for same-day delivery in Nairobi if ordered within the next 2 hours.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-gray-200">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-black text-secondary mb-2 uppercase">Your cart is empty</h2>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
                <Button className="bg-primary hover:bg-primary-dark text-white font-bold px-8" onClick={() => setPage("home")}>
                  START SHOPPING
                </Button>
              </div>
            )}
          </div>
        )}

        {page === "account" && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
              <div className="bg-secondary p-8 md:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className="w-32 h-32 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white border-4 border-white/20 shadow-2xl">
                    <UserIcon className="w-16 h-16" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                      <h1 className="text-4xl font-black font-display uppercase tracking-tight">John Doe</h1>
                      <Badge className="bg-primary text-white font-black text-[10px] px-3 py-1 rounded-full shadow-lg shadow-primary/20">PREMIUM</Badge>
                    </div>
                    <p className="text-white/60 font-medium text-lg mb-4">jkyunger@gmail.com</p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                      <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                        <span className="block text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Total Orders</span>
                        <span className="text-xl font-black">12</span>
                      </div>
                      <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                        <span className="block text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">Wallet Balance</span>
                        <span className="text-xl font-black">KSh 2,450</span>
                      </div>
                    </div>
                  </div>
                  <Button className="md:ml-auto bg-white text-secondary hover:bg-gray-100 font-black px-8 py-6 rounded-2xl shadow-xl">
                    EDIT PROFILE
                  </Button>
                </div>
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Package, label: "My Orders", desc: "Track, return or buy things again", count: 12 },
                  { icon: Heart, label: "Wishlist", desc: "Your saved items", count: 5 },
                  { icon: CreditCard, label: "Payments", desc: "Manage payment methods", count: 2 },
                  { icon: MapPin, label: "Addresses", desc: "Edit addresses for orders", count: 1 },
                  { icon: Sparkles, label: "Rewards", desc: "Your loyalty points", count: "450 pts" },
                  { icon: Settings, label: "Settings", desc: "Account preferences" },
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-gray-50 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer group relative">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-secondary mb-4 group-hover:scale-110 transition-transform group-hover:bg-white group-hover:shadow-md">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-secondary uppercase tracking-tight mb-1 font-display">{item.label}</h3>
                    <p className="text-xs text-muted-foreground leading-tight">{item.desc}</p>
                    {'count' in item && (
                      <span className="absolute top-6 right-6 text-xs font-black text-primary bg-primary/10 px-2 py-1 rounded-lg">
                        {item.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-8 bg-slate-50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                    <X className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-secondary">Danger Zone</h4>
                    <p className="text-xs text-muted-foreground">Manage sensitive account actions</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 font-black gap-2">
                  SIGN OUT OF ACCOUNT
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {page === "product" && selectedProduct && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
              <button onClick={() => setPage("home")} className="hover:text-primary transition-colors">Home</button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={() => { setSelectedCategories([selectedProduct.category]); setPage("home"); }} className="hover:text-primary transition-colors">{selectedProduct.category}</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-secondary font-bold truncate">{selectedProduct.name}</span>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
                {/* Left Column: Images */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="aspect-square rounded-xl bg-slate-50 overflow-hidden border border-gray-100 group relative">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {selectedProduct.discount && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-black text-sm shadow-lg">
                        -{selectedProduct.discount}%
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={cn(
                        "aspect-square rounded-lg bg-slate-50 border cursor-pointer transition-all overflow-hidden",
                        i === 1 ? "border-primary ring-2 ring-primary/20" : "border-gray-100 hover:border-primary"
                      )}>
                        <img src={selectedProduct.image} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="lg:col-span-7 flex flex-col">
                  <div className="mb-6">
                    <h1 className="text-lg md:text-xl font-bold text-secondary leading-tight mb-3">
                      {selectedProduct.name}
                    </h1>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-1 text-yellow-500">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} className={`w-4 h-4 ${i <= Math.floor(selectedProduct.rating || 0) ? "fill-current" : ""}`} />
                        ))}
                        <span className="text-sm font-bold text-secondary ml-1">{selectedProduct.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">|</span>
                      <span className="text-sm text-primary font-bold hover:underline cursor-pointer">{selectedProduct.reviews} Verified Reviews</span>
                      <span className="text-sm text-muted-foreground">|</span>
                      <span className="text-sm text-muted-foreground uppercase font-bold tracking-tighter">SKU: NM-{selectedProduct.id}</span>
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-6">
                    <div className="flex items-baseline gap-4 mb-2">
                      <span className="text-2xl font-bold text-primary">{selectedProduct.price}</span>
                      {selectedProduct.oldPrice && (
                        <span className="text-lg text-muted-foreground line-through decoration-red-500/50">{selectedProduct.oldPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white border-none font-bold">IN STOCK</Badge>
                      {selectedProduct.discount && (
                        <span className="text-xs font-bold text-green-600 uppercase">Save {selectedProduct.discount}% right now</span>
                      )}
                    </div>
                  </div>

                  {/* Shipping Block (Kilimall Style) */}
                  <div className="space-y-4 mb-8 p-4 border border-gray-100 rounded-xl bg-white shadow-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-bold text-secondary">Delivery to Nairobi</span>
                          <Button variant="link" size="sm" className="h-auto p-0 text-primary font-bold">CHANGE</Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Standard Delivery: Get it by tomorrow</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-secondary"><span className="font-bold">Shipping Fee:</span> <span className="text-green-600 font-bold">FREE</span></p>
                    </div>
                  </div>

                  {/* Variations (Placeholder) */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-sm font-black text-secondary uppercase mb-3 tracking-wider">Color</h3>
                      <div className="flex gap-3">
                        {['Black', 'White', 'Blue'].map((color, idx) => (
                          <button 
                            key={color} 
                            className={cn(
                              "px-4 py-2 rounded-lg border-2 text-sm font-bold transition-all",
                              idx === 0 ? "border-primary bg-primary/5 text-primary" : "border-gray-100 hover:border-primary/50"
                            )}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-black text-secondary uppercase mb-3 tracking-wider">Quantity</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                          <button className="px-4 py-2 hover:bg-gray-50 font-bold text-xl">-</button>
                          <input type="text" value="1" readOnly className="w-12 text-center font-black text-secondary border-x-2 border-gray-100" />
                          <button className="px-4 py-2 hover:bg-gray-50 font-bold text-xl">+</button>
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">99+ pieces available</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <Button 
                      size="lg" 
                      className="flex-1 bg-primary hover:bg-primary-dark text-white font-black py-8 text-lg shadow-xl shadow-primary/20 gap-3"
                      onClick={() => addToCart(selectedProduct)}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      ADD TO CART
                    </Button>
                    <Button 
                      size="lg" 
                      className="flex-1 bg-secondary hover:bg-black text-white font-black py-8 text-lg shadow-xl shadow-secondary/20"
                    >
                      BUY NOW
                    </Button>
                    <Button size="lg" variant="outline" className="py-8 px-6 border-2 hover:text-red-500 hover:border-red-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </Button>
                  </div>

                  {/* Service Block */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Zap className="w-3 h-3 fill-current" />
                      </div>
                      <span className="text-[10px] font-bold text-secondary uppercase">Fast Delivery</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <TrendingUp className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] font-bold text-secondary uppercase">7 Days Return</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Sparkles className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] font-bold text-secondary uppercase">Authentic Only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Heart className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] font-bold text-secondary uppercase">NairoMarket Care</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Tabs (Description/Reviews) */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="flex border-b border-gray-100">
                    <button 
                      onClick={() => setProductTab("description")}
                      className={cn(
                        "px-8 py-4 text-sm font-black uppercase tracking-wider transition-all border-b-2",
                        productTab === "description" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-secondary"
                      )}
                    >
                      Description
                    </button>
                    <button 
                      onClick={() => setProductTab("specs")}
                      className={cn(
                        "px-8 py-4 text-sm font-black uppercase tracking-wider transition-all border-b-2",
                        productTab === "specs" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-secondary"
                      )}
                    >
                      Specifications
                    </button>
                    <button 
                      onClick={() => setProductTab("reviews")}
                      className={cn(
                        "px-8 py-4 text-sm font-black uppercase tracking-wider transition-all border-b-2",
                        productTab === "reviews" ? "text-primary border-primary" : "text-muted-foreground border-transparent hover:text-secondary"
                      )}
                    >
                      Reviews ({selectedProduct.reviews})
                    </button>
                  </div>
                  <div className="p-8">
                    <AnimatePresence mode="wait">
                      {productTab === "description" && (
                        <motion.div
                          key="description"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h3 className="text-xl font-black text-secondary mb-4 uppercase">Product Details</h3>
                          <p className="text-muted-foreground leading-relaxed mb-6">
                            Experience the pinnacle of quality with the {selectedProduct.name}. This premium product is meticulously crafted to meet the highest standards of performance and durability. Whether you're looking for style, functionality, or both, this is the perfect choice for your needs.
                          </p>
                          <ul className="space-y-3">
                            {['High-quality materials', 'Ergonomic design', 'Durable and long-lasting', 'Easy to use and maintain'].map((item, i) => (
                              <li key={i} className="flex items-center gap-3 text-sm text-secondary">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}

                      {productTab === "specs" && (
                        <motion.div
                          key="specs"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h3 className="text-xl font-black text-secondary mb-6 uppercase">Technical Specifications</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { label: 'Brand', value: 'NairoMarket Premium' },
                              { label: 'Model', value: `NM-${selectedProduct.id}` },
                              { label: 'Category', value: selectedProduct.category },
                              { label: 'Warranty', value: '1 Year Local Warranty' },
                              { label: 'Material', value: 'Premium Grade' },
                              { label: 'Origin', value: 'Imported' }
                            ].map((spec, i) => (
                              <div key={i} className="flex justify-between p-3 border-b border-gray-50">
                                <span className="text-sm font-bold text-muted-foreground uppercase tracking-tighter">{spec.label}</span>
                                <span className="text-sm font-bold text-secondary">{spec.value}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {productTab === "reviews" && (
                        <motion.div
                          key="reviews"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-black text-secondary uppercase">Customer Reviews</h3>
                            <Button className="bg-primary hover:bg-primary-dark font-bold">WRITE A REVIEW</Button>
                          </div>
                          <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                              <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-secondary">JD</div>
                                    <span className="font-bold text-secondary text-sm">John Doe</span>
                                    <Badge className="bg-green-100 text-green-700 border-none text-[10px] font-bold">Verified Purchase</Badge>
                                  </div>
                                  <span className="text-xs text-muted-foreground">2 days ago</span>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                                  {[1,2,3,4,5].map(star => <Star key={star} className="w-3 h-3 fill-current" />)}
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  Excellent product! Exceeded my expectations in every way. The quality is top-notch and the delivery was incredibly fast. Highly recommended!
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="text-lg font-black text-secondary mb-4 uppercase">Seller Information</h3>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl">N</div>
                    <div>
                      <h4 className="font-bold text-secondary">NairoMarket Official</h4>
                      <p className="text-xs text-muted-foreground">Premium Seller | 98% Positive</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full font-bold border-primary text-primary hover:bg-primary hover:text-white">FOLLOW STORE</Button>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <section className="mt-16">
              <h2 className="text-2xl font-black text-secondary mb-8 uppercase tracking-tight">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {allProducts.slice(0, 4).map(p => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onPress={openProduct} 
                    onQuickView={openQuickView} 
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            </section>

            {/* Recently Viewed Section */}
            <RecentlyViewed 
              products={recentlyViewed.filter(p => p.id !== selectedProduct.id)} 
              onProductPress={openProduct} 
              onQuickView={openQuickView} 
              onAddToCart={addToCart}
            />
          </div>
        )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
      
      <BottomNav currentPage={page} onNavigate={setPage} cartCount={cart.length} />

      {/* Quick View Modal */}
      <Dialog open={!!quickViewProduct} onOpenChange={(open) => !open && setQuickViewProduct(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
          {quickViewProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="aspect-square bg-slate-50">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col">
                <div className="mb-6">
                  <Badge className="bg-primary-light text-primary border-none mb-2 font-bold">
                    {quickViewProduct.category}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-secondary leading-tight text-left">
                      {quickViewProduct.name}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} className={`w-4 h-4 ${i <= Math.floor(quickViewProduct.rating || 0) ? "fill-current" : ""}`} />
                      ))}
                      <span className="text-sm font-bold text-secondary ml-1">{quickViewProduct.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({quickViewProduct.reviews} reviews)</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-primary">{quickViewProduct.price}</span>
                    {quickViewProduct.oldPrice && (
                      <span className="text-base text-muted-foreground line-through">{quickViewProduct.oldPrice}</span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-8 line-clamp-3">
                  Experience the best of {quickViewProduct.category} with this premium {quickViewProduct.name}. 
                  Designed for performance and style, it's the perfect addition to your collection.
                </p>

                <div className="flex gap-4 mt-auto">
                  <Button 
                    className="flex-1 bg-primary hover:bg-primary-dark text-white font-black py-6 shadow-lg shadow-primary/20 gap-2"
                    onClick={() => addToCart(quickViewProduct)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    ADD TO CART
                  </Button>
                  <Button variant="outline" className="py-6 px-4 border-2">
                    <Heart className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button 
                  variant="link" 
                  className="mt-4 text-primary font-bold text-sm"
                  onClick={() => {
                    openProduct(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                >
                  View Full Details →
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
