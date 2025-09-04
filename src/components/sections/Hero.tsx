import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-luxury.jpg";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury Neon Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 animate-fade-in">
        <div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">FW24 Collection</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-slide-up">
          Luxury Redefined
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up [animation-delay:200ms]">
          The FW24 Collection by NEON. Where elegance meets innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-slide-up [animation-delay:400ms]">
          <Link to="/category/watches">
            <Button className="btn-luxury text-lg px-8 py-4">
              Shop Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          
          <Link to="/category/jewelry">
            <Button variant="outline" className="btn-outline-luxury text-lg px-8 py-4">
              Explore Jewelry
            </Button>
          </Link>
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