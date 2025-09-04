import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const FavoritesPage = () => {
  const { items, clearFavorites } = useFavorites();

  useEffect(() => {
    document.title = "Favorites | NEON Luxury";
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Your favorite luxury products at NEON - watches, jewelry, accessories and more premium items you love.');
    }
    // Canonical tag
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.href;
  }, []);

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-md mx-auto">
              <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h1 className="text-3xl font-display font-bold mb-4">No Favorites Yet</h1>
              <p className="text-muted-foreground mb-8">
                Start browsing our luxury collection and add items to your favorites by clicking the heart icon.
              </p>
              <Link to="/">
                <Button className="btn-luxury">Explore Products</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">Your Favorites</h1>
              <p className="text-muted-foreground">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your favorites
              </p>
            </div>
            {items.length > 0 && (
              <Button 
                variant="outline" 
                onClick={clearFavorites}
                className="text-destructive hover:text-destructive"
              >
                Clear All
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;