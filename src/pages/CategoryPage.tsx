import { useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List } from "lucide-react";
import { useState, useMemo } from "react";
import { ProductFilter } from "@/components/filters/ProductFilter";
import { generateProducts, Product } from "@/data/products";

interface FilterOptions {
  priceRange: [number, number];
  materials: string[];
  types: string[];
}

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 200000],
    materials: [],
    types: []
  });

  const rawCategory = (category || 'all').toLowerCase();
  const normalizeSlug = (slug: string) => {
    const s = slug.replace(/\s|-/g, '');
    switch (s) {
      case 'techgadgets':
        return 'tech';
      case 'homedecor':
        return 'home';
      case 'all':
        return 'all';
      default:
        return s;
    }
  };
  const normalizedKey = normalizeSlug(rawCategory);
  const displayNameMap: Record<string, string> = { tech: 'Tech Gadgets', home: 'Home Decor' };
  const categoryName = normalizedKey === 'all'
    ? 'All Products'
    : displayNameMap[normalizedKey] || (normalizedKey.charAt(0).toUpperCase() + normalizedKey.slice(1));

  const baseCategories = ['watches','bags','jewelry','perfume','shoes','accessories','apparel','eyewear','tech','home'];

  const allProducts = normalizedKey === 'all'
    ? baseCategories.flatMap(cat => generateProducts(cat, 15))
    : generateProducts(normalizedKey, 15);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Price filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Material filter
      if (filters.materials.length > 0 && product.material && !filters.materials.includes(product.material)) {
        return false;
      }
      
      // Type filter
      if (filters.types.length > 0 && product.type && !filters.types.includes(product.type)) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.reverse();
        break;
      default:
        // Keep original order for featured
        break;
    }

    return filtered;
  }, [allProducts, filters, sortBy]);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              {categoryName}
            </h1>
            <p className="text-xl text-muted-foreground mb-2">
              Discover our premium collection of {categoryName.toLowerCase()}
            </p>
            <p className="text-sm text-muted-foreground">
              Showing {filteredProducts.length} of {allProducts.length} results
            </p>
          </div>

          {/* Filters and Controls */}
          <div className="flex items-center justify-between mb-8 p-4 bg-card/50 backdrop-blur-sm border border-border/20 rounded-lg">
            <div className="flex items-center space-x-4">
              <ProductFilter category={normalizedKey} onFiltersChange={setFilters}>
                <Button variant="outline" className="btn-outline-luxury">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </ProductFilter>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-card border border-border/20 rounded px-3 py-2 text-foreground"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
            
            {/* More Styles Coming Soon Card */}
            <div className="animate-fade-in" style={{ animationDelay: `${filteredProducts.length * 50}ms` }}>
              <div className="h-full bg-card/50 backdrop-blur-sm border border-border/20 rounded-lg p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
                <div className="text-primary/60 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-semibold mb-2">More Styles Coming Soon</h3>
                <p className="text-muted-foreground text-sm">
                  We're curating additional premium pieces for this collection. Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};