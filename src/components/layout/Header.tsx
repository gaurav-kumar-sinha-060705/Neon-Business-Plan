import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { SearchDialog } from "@/components/search/SearchDialog";

const categories = [
  { name: "Watches", slug: "watches" },
  { name: "Bags", slug: "bags" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessories", slug: "accessories" },
  { name: "Perfume", slug: "perfume" },
  { name: "Apparel", slug: "apparel" },
  { name: "Eyewear", slug: "eyewear" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Tech Gadgets", slug: "techgadgets" },
  { name: "Home Decor", slug: "homedecor" },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const { getTotalFavorites } = useFavorites();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalFavorites = getTotalFavorites();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-luxury rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">N</span>
            </div>
            <span className="text-2xl font-display font-bold bg-gradient-luxury bg-clip-text text-transparent">
              NEON
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.slice(0, 5).map(({ name, slug }) => (
              <Link
                key={slug}
                to={`/category/${slug}`}
                className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium"
              >
                {name}
              </Link>
            ))}
            <div className="relative group">
              <span className="text-foreground/80 hover:text-primary transition-colors duration-300 font-medium cursor-pointer">
                More
              </span>
              <div className="absolute top-full left-0 mt-2 w-48 bg-card border border-border/20 rounded-lg shadow-dark opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {categories.slice(5).map(({ name, slug }) => (
                  <Link
                    key={slug}
                    to={`/category/${slug}`}
                    className="block px-4 py-2 text-foreground/80 hover:text-primary hover:bg-muted/50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <SearchDialog />
            
            <Link to="/favorites">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {totalFavorites > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalFavorites}
                  </span>
                )}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border/20 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              {categories.map(({ name, slug }) => (
                <Link
                  key={slug}
                  to={`/category/${slug}`}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 py-2 px-2 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};