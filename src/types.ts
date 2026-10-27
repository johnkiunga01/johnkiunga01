export type PageKey = "home" | "categories" | "search" | "product" | "cart" | "account" | "subcategory";

export type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  image: string;
  category: string;
  badge?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
};

export type Category = {
  name: string;
  icon: string;
  subcategories: string[];
};

export type HeroSlide = {
  title: string;
  subtitle: string;
  description: string;
  bgColor: string;
  accentColor: string;
  image: string;
  cta: string;
};
