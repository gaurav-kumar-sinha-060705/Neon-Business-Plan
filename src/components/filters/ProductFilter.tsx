import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FilterOptions {
  priceRange: [number, number];
  materials: string[];
  types: string[];
}

interface ProductFilterProps {
  category: string;
  onFiltersChange: (filters: FilterOptions) => void;
  children: React.ReactNode;
}

const categoryFilters: Record<string, { materials: string[]; types: string[] }> = {
  watches: {
    materials: ["Steel", "Gold", "Titanium", "Leather", "Metal"],
    types: ["Automatic", "Quartz", "Digital", "Chronograph"]
  },
  bags: {
    materials: ["Leather", "Canvas", "Suede", "Synthetic"],
    types: ["Handbag", "Backpack", "Tote", "Clutch"]
  },
  jewelry: {
    materials: ["Gold", "Silver", "Platinum", "Diamond"],
    types: ["Necklace", "Ring", "Bracelet", "Earrings"]
  },
  perfume: {
    materials: ["Eau de Parfum", "Eau de Toilette", "Cologne"],
    types: ["Floral", "Woody", "Oriental", "Fresh"]
  },
  shoes: {
    materials: ["Leather", "Suede", "Canvas", "Synthetic"],
    types: ["Sneakers", "Formal", "Boots", "Sandals"]
  },
  accessories: {
    materials: ["Leather", "Metal", "Fabric", "Plastic"],
    types: ["Belt", "Wallet", "Sunglasses", "Scarf"]
  },
  apparel: {
    materials: ["Cotton", "Wool", "Silk", "Polyester"],
    types: ["Shirt", "Pants", "Dress", "Jacket"]
  },
  eyewear: {
    materials: ["Metal", "Plastic", "Titanium", "Acetate"],
    types: ["Sunglasses", "Optical", "Reading", "Blue Light"]
  },
  tech: {
    materials: ["Metal", "Plastic", "Glass", "Carbon Fiber"],
    types: ["Smartphone", "Laptop", "Headphones", "Watch"]
  },
  home: {
    materials: ["Wood", "Metal", "Glass", "Ceramic"],
    types: ["Decor", "Lighting", "Furniture", "Textiles"]
  }
};

export const ProductFilter = ({ category, onFiltersChange, children }: ProductFilterProps) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const filters = categoryFilters[category.toLowerCase()] || { materials: [], types: [] };

  const handleMaterialToggle = (material: string) => {
    const updated = selectedMaterials.includes(material)
      ? selectedMaterials.filter(m => m !== material)
      : [...selectedMaterials, material];
    setSelectedMaterials(updated);
    onFiltersChange({ priceRange, materials: updated, types: selectedTypes });
  };

  const handleTypeToggle = (type: string) => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    setSelectedTypes(updated);
    onFiltersChange({ priceRange, materials: selectedMaterials, types: updated });
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    onFiltersChange({ priceRange: range, materials: selectedMaterials, types: selectedTypes });
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedMaterials([]);
    setSelectedTypes([]);
    onFiltersChange({ priceRange: [0, 200000], materials: [], types: [] });
  };

  const hasActiveFilters = selectedMaterials.length > 0 || selectedTypes.length > 0 || priceRange[0] > 0 || priceRange[1] < 200000;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-80 bg-card border-border/20">
        <SheetHeader>
          <SheetTitle className="font-display text-xl">Filter Products</SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect luxury items
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="w-full btn-outline-luxury"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          )}

          {/* Price Range */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Price Range</h3>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={200000}
                min={0}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Materials */}
          {filters.materials.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Material</h3>
              <div className="space-y-2">
                {filters.materials.map((material) => (
                  <label key={material} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => handleMaterialToggle(material)}
                      className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-foreground">{material}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Types */}
          {filters.types.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Type</h3>
              <div className="space-y-2">
                {filters.types.map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
                    />
                    <span className="text-sm text-foreground">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};