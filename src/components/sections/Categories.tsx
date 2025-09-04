import { Link } from "react-router-dom";
import { Watch, ShoppingBag, Glasses, Gem, Shirt, Zap, Home, SprayCan, Sparkles, Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const categories = [
  { name: "Watches", icon: Watch, href: "/category/watches", color: "from-yellow-500 to-yellow-600" },
  { name: "Bags", icon: ShoppingBag, href: "/category/bags", color: "from-amber-500 to-amber-600" },
  { name: "Eyewear", icon: Glasses, href: "/category/eyewear", color: "from-orange-500 to-orange-600" },
  { name: "Jewelry", icon: Gem, href: "/category/jewelry", color: "from-yellow-600 to-yellow-700" },
  { name: "Apparel", icon: Shirt, href: "/category/apparel", color: "from-amber-600 to-amber-700" },
  { name: "Tech Gadgets", icon: Zap, href: "/category/techgadgets", color: "from-yellow-500 to-amber-500" },
  { name: "Shoes", icon: Star, href: "/category/shoes", color: "from-yellow-400 to-amber-500" },
  { name: "Accessories", icon: Sparkles, href: "/category/accessories", color: "from-amber-400 to-yellow-500" },
  { name: "Perfume", icon: SprayCan, href: "/category/perfume", color: "from-yellow-700 to-amber-700" },
  { name: "Home Decor", icon: Home, href: "/category/homedecor", color: "from-amber-700 to-yellow-700" },
];

export const Categories = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Explore Our <span className="bg-gradient-luxury bg-clip-text text-transparent">Collections</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover luxury across every category, from timeless watches to cutting-edge technology
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <CarouselItem key={category.name} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                    <Link
                      to={category.href}
                      className="group relative p-6 md:p-8 text-center card-luxury gold-glow transition-all duration-500 hover:scale-105 animate-fade-in block"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </h3>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12" />
            <CarouselNext className="hidden md:flex -right-12" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};