import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { HERO_SLIDES } from "@/constants";
import { Button } from "@/components/ui/button";

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      }, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % HERO_SLIDES.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[450px] shadow-sm group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center px-8 md:px-16"
          style={{ backgroundColor: HERO_SLIDES[currentSlide].bgColor }}
        >
          <div className="flex-1 z-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-bold text-sm uppercase tracking-widest mb-2"
              style={{ color: HERO_SLIDES[currentSlide].accentColor }}
            >
              {HERO_SLIDES[currentSlide].subtitle}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-5xl font-extrabold text-secondary mb-4 leading-tight"
            >
              {HERO_SLIDES[currentSlide].title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-8 max-w-md"
            >
              {HERO_SLIDES[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="rounded-full px-8 font-semibold shadow-lg hover:shadow-xl transition-all"
                style={{ backgroundColor: HERO_SLIDES[currentSlide].accentColor }}
              >
                {HERO_SLIDES[currentSlide].cta}
              </Button>
            </motion.div>
          </div>
          <div className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 opacity-20 text-[240px] select-none">
            {HERO_SLIDES[currentSlide].image}
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "w-2 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
