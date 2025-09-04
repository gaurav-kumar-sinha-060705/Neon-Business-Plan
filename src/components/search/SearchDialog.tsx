import { useState } from "react";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { generateProducts } from "@/data/products";

const allCategories = ["watches", "bags", "shoes", "accessories", "perfume", "apparel", "eyewear", "jewelry", "techgadgets", "homedecor"];

export const SearchDialog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Generate search results based on query
  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    
    const results: any[] = [];
    const query = searchQuery.toLowerCase();
    
    allCategories.forEach(category => {
      const products = generateProducts(category, 15);
      const matchingProducts = products.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query) ||
        product.type.toLowerCase().includes(query)
      );
      results.push(...matchingProducts);
    });
    
    return results.slice(0, 8); // Limit to 8 results
  };

  const searchResults = getSearchResults();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Products
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder="Search for watches, bags, jewelry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          
          {searchQuery && (
            <div className="max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="grid gap-3">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      to={`/category/${product.category.toLowerCase()}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">₹{product.price.toLocaleString()}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No products found for "{searchQuery}"</p>
                  <p className="text-sm mt-1">Try searching for watches, bags, jewelry, or other categories</p>
                </div>
              )}
            </div>
          )}
          
          {!searchQuery && (
            <div className="text-center py-8 text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search our luxury collection</p>
              <p className="text-sm mt-1">Search by product name, category, or material</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};