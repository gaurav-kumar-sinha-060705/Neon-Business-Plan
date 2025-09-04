import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

const ShippingReturns = () => {
  useEffect(() => {
    document.title = "Shipping & Returns - NEON";
    const desc = "Learn about NEON's shipping timelines, delivery, and return/exchange policies.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = desc;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = window.location.origin + "/legal/shipping-returns";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Shipping & Returns</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">Our detailed shipping and returns policy will be published here. We aim for fast, reliable delivery and a hassle-free returns experience.</p>
        </section>
      </main>
    </div>
  );
};

export default ShippingReturns;
