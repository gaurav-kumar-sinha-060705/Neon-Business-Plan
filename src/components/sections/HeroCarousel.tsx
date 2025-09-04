import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import watch1 from "@/assets/watch-1.jpg";
import bag1 from "@/assets/bag-1.jpg";
import jewelry1 from "@/assets/jewelry-1.jpg";
import perfume1 from "@/assets/perfume-1.jpg";
import shoes1 from "@/assets/shoes-1.jpg";
import accessories1 from "@/assets/accessories-1.jpg";
import apparel1 from "@/assets/apparel-1.jpg";
import eyewear1 from "@/assets/eyewear-1.jpg";
import tech1 from "@/assets/tech-1.jpg";
import home1 from "@/assets/home-1.jpg";

const heroSlides = [
  {
    id: 1,
    image: watch1,
    category: "watches",
    title: "Timepiece Excellence",
    subtitle: "Precision Crafted Luxury Watches",
    description: "Discover our exclusive collection of Swiss-made timepieces",
  },
  {
    id: 2,
    image: bag1,
    category: "bags",
    title: "Artisan Leather",
    subtitle: "Handcrafted Luxury Bags",
    description: "Premium leather goods crafted by master artisans",
  },
  {
    id: 3,
    image: jewelry1,
    category: "jewelry",
    title: "Eternal Brilliance",
    subtitle: "Fine Jewelry Collection",
    description: "Exquisite pieces featuring precious metals and stones",
  },
  {
    id: 4,
    image: perfume1,
    category: "perfume",
    title: "Signature Scents",
    subtitle: "Luxury Fragrance Collection",
    description: "Captivating fragrances crafted by renowned perfumers",
  },
  {
    id: 5,
    image: shoes1,
    category: "shoes",
    title: "Executive Footwear",
    subtitle: "Luxury Shoes Collection",
    description: "Premium footwear crafted from finest materials",
  },
  {
    id: 6,
    image: accessories1,
    category: "accessories",
    title: "Distinguished Details",
    subtitle: "Luxury Accessories Collection",
    description: "Refined accessories that complete your sophisticated look",
  },
  {
    id: 7,
    image: apparel1,
    category: "apparel",
    title: "Couture Excellence",
    subtitle: "Luxury Apparel Collection",
    description: "Tailored perfection in every stitch and silhouette",
  },
  {
    id: 8,
    image: eyewear1,
    category: "eyewear",
    title: "Visionary Style",
    subtitle: "Luxury Eyewear Collection",
    description: "Designer frames that define sophisticated vision",
  },
  {
    id: 9,
    image: tech1,
    category: "techgadgets",
    title: "Innovation Refined",
    subtitle: "Luxury Tech Collection",
    description: "Where cutting-edge technology meets timeless elegance",
  },
  {
    id: 10,
    image: home1,
    category: "homedecor",
    title: "Living Luxuriously",
    subtitle: "Luxury Home Collection",
    description: "Transform your space with our curated home essentials",
  },
];

export const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm border border-border/20 text-foreground hover:bg-background/40 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-background/20 backdrop-blur-sm border border-border/20 text-foreground hover:bg-background/40 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-sm font-medium text-primary">The FW24 Collection</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
            Luxury Redefined
          </h1>

          <div className="mb-8 space-y-2">
            <h2 className="text-2xl md:text-3xl font-display text-primary animate-slide-up">
              {heroSlides[currentSlide].title}
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground animate-slide-up [animation-delay:200ms]">
              {heroSlides[currentSlide].description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to={`/category/${heroSlides[currentSlide].category}`}>
              <Button className="btn-luxury text-lg px-8 py-4">
                Shop {heroSlides[currentSlide].subtitle}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Link to="/category/all">
              <Button variant="outline" className="btn-outline-luxury text-lg px-8 py-4">
                View All Collections
              </Button>
            </Link>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-12">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-primary scale-125'
                  : 'bg-border hover:bg-primary/50'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 animate-fade-in [animation-delay:600ms]">
          <div className="grid grid-cols-3 gap-8 p-6 bg-card/60 backdrop-blur-sm border border-border/20 rounded-xl">
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Premium Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary mb-2">50K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-display font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-gold-glow rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-gold-glow rounded-full blur-2xl opacity-30 animate-pulse [animation-delay:1s]" />
    </section>
  );
};