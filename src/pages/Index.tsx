import { Header } from "@/components/layout/Header";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Categories } from "@/components/sections/Categories";
import InfoLinks from "@/components/sections/InfoLinks";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <HeroCarousel />
        <Categories />
        <FeaturedProducts />
        <InfoLinks />
      </main>
    </div>
  );
};

export default Index;
