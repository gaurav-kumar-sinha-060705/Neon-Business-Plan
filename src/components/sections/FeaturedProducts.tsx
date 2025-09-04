import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { generateProducts } from "@/data/products";

// Get featured products from different categories
const getFeaturedProducts = () => {
  const categories = ['watches', 'jewelry', 'bags', 'perfume'];
  const featuredProducts = [];
  
  categories.forEach(category => {
    const products = generateProducts(category, 1);
    if (products.length > 0) {
      featuredProducts.push(products[0]);
    }
  });
  
  return featuredProducts;
};

const featuredProducts = getFeaturedProducts();

export const FeaturedProducts = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-transparent to-muted/20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="bg-gradient-luxury bg-clip-text text-transparent">Products</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Handpicked luxury items from our exclusive collection
            </p>
          </div>
          
          <Link to="/category/all">
            <Button className="btn-outline-luxury hidden md:flex">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link to="/category/all">
            <Button className="btn-luxury">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};