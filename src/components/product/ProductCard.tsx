import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";
import { useState } from "react";

import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { addItem: addToFavorites, removeItem: removeFromFavorites, isItemFavorite } = useFavorites();
  const isFavorite = isItemFavorite(product.id);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
      toast.success(`${product.name} removed from favorites`);
    } else {
      addToFavorites({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
      toast.success(`${product.name} added to favorites!`);
    }
  };

  return (
    <div className="group card-luxury gold-glow overflow-hidden animate-fade-in">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
            onClick={handleToggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Button
            onClick={handleAddToCart}
            className="w-full btn-luxury text-sm py-2"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {product.name}
        </h3>
        <div className="space-y-2">
          <span className="text-xl font-semibold text-primary">
            ₹{product.price.toLocaleString()}
          </span>
          {product.material && (
            <div className="text-xs text-muted-foreground">
              {product.material} • {product.type}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};