import { Category, HeroSlide, Product } from "./types";

export const CATEGORY_STRUCTURE: Category[] = [
  {
    name: "New Arrivals",
    icon: "Star",
    subcategories: ["Bike Accessories", "Sports Gear", "Lighting", "Phone Accessories"]
  },
  {
    name: "Kitchen Essentials",
    icon: "Home",
    subcategories: ["Cookware", "Kitchen Tools", "Storage", "Dining"]
  },
  {
    name: "Bathroom Accessories",
    icon: "Bath",
    subcategories: ["Towel Racks", "Soap Dispensers", "Shower Heads", "Mats"]
  },
  {
    name: "Beauty & Health",
    icon: "Sparkles",
    subcategories: ["Skincare", "Haircare", "Personal Care", "Health Care"]
  },
  {
    name: "Sports & Outdoor",
    icon: "Dumbbell",
    subcategories: ["Fitness Equipment", "Camping Gear", "Cycling", "Outdoor Gear"]
  },
  {
    name: "Electronics",
    icon: "Tv",
    subcategories: ["TVs", "Audio", "Cameras", "Gadgets"]
  },
  {
    name: "Home Décor",
    icon: "Home",
    subcategories: ["Wall Art", "Lighting", "Mirrors", "Cushions"]
  },
  {
    name: "Sexual Wellness",
    icon: "Heart",
    subcategories: ["Enhancement", "Protection", "Toys", "Care"]
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Portable High-Pressure Bike Pump 120 PSI For Presta Schrader Valves",
    price: "KSh 1,499",
    oldPrice: "KSh 2,500",
    image: "https://picsum.photos/seed/bike-pump/800/800",
    category: "Sports & Outdoor",
    badge: "New",
    rating: 4.8,
    reviews: 124,
    discount: 40
  },
  {
    id: 2,
    name: "Elastic Compression Knee Support Bandage for Joint Protection",
    price: "KSh 850",
    oldPrice: "KSh 1,200",
    image: "https://picsum.photos/seed/knee-support/800/800",
    category: "Sports & Outdoor",
    badge: "Hot",
    rating: 4.6,
    reviews: 89,
    discount: 29
  },
  {
    id: 3,
    name: "Powerful Rechargeable LED Tactical Flashlight with Adjustable Zoom",
    price: "KSh 1,299",
    oldPrice: "KSh 1,800",
    image: "https://picsum.photos/seed/flashlight/800/800",
    category: "New Arrivals",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 210,
    discount: 28
  },
  {
    id: 4,
    name: "Magnetic Floating Levitation Globe LED World Map Lamp",
    price: "KSh 4,500",
    oldPrice: "KSh 6,500",
    image: "https://picsum.photos/seed/globe/800/800",
    category: "Home Décor",
    badge: "Unique",
    rating: 4.7,
    reviews: 45,
    discount: 31
  },
  {
    id: 5,
    name: "Titan Gel Gold – Advanced Male Enhancement Gel",
    price: "KSh 2,500",
    oldPrice: "KSh 3,500",
    image: "https://picsum.photos/seed/gel/800/800",
    category: "Sexual Wellness",
    badge: "Popular",
    rating: 4.5,
    reviews: 567,
    discount: 28
  },
  {
    id: 6,
    name: "Vintage Moroccan Hollow Iron Lantern Tea Light Hanging Candle Holder",
    price: "KSh 1,200",
    oldPrice: "KSh 1,800",
    image: "https://picsum.photos/seed/lantern/800/800",
    category: "Home Décor",
    badge: "Sale",
    rating: 4.8,
    reviews: 32,
    discount: 33
  },
  {
    id: 7,
    name: "3 in 1 Tear Drop wall mirrors, Teardrop Mirror Wall Decor",
    price: "KSh 2,800",
    oldPrice: "KSh 4,000",
    image: "https://picsum.photos/seed/mirror/800/800",
    category: "Home Décor",
    badge: "Elegant",
    rating: 4.9,
    reviews: 18,
    discount: 30
  },
  {
    id: 8,
    name: "Pheromone Perfume For Men - Long Lasting Attraction",
    price: "KSh 1,500",
    oldPrice: "KSh 2,200",
    image: "https://picsum.photos/seed/perfume/800/800",
    category: "Beauty & Health",
    badge: "Best Seller",
    rating: 4.7,
    reviews: 890,
    discount: 32
  }
];

export const HERO_SLIDES: HeroSlide[] = [
  {
    title: "Big Brand Sale",
    subtitle: "Up to 70% OFF",
    description: "Top electronics and fashion deals",
    bgColor: "#e7f3ff",
    accentColor: "#007bff",
    image: "🎉",
    cta: "Shop Now"
  },
  {
    title: "New Arrivals",
    subtitle: "Latest Tech",
    description: "Discover the newest gadgets and accessories",
    bgColor: "#E8F5E9",
    accentColor: "#4CAF50",
    image: "📱",
    cta: "Explore"
  },
  {
    title: "Free Delivery",
    subtitle: "On Orders Over KSh 2,000",
    description: "Fast shipping to your doorstep",
    bgColor: "#E3F2FD",
    accentColor: "#2196F3",
    image: "🚚",
    cta: "Learn More"
  }
];
