import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

const About = () => {
  useEffect(() => {
    document.title = "About NEON - Luxury Brand Story";
    const desc = "Discover NEON's brand story, mission, and commitment to luxury.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = desc;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = window.location.origin + "/about";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">About NEON</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">NEON blends timeless craftsmanship with modern innovation to deliver a refined luxury experience across watches, bags, jewelry, apparel, eyewear, tech gadgets, and home decor.</p>
        </section>
      </main>
    </div>
  );
};

export default About;
