import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service - NEON";
    const desc = "Review NEON's terms and conditions for using our website and purchasing products.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = desc;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = window.location.origin + "/legal/terms";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Terms of Service</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">Our detailed terms of service will be provided here. By using our site, you agree to these terms.</p>
        </section>
      </main>
    </div>
  );
};

export default TermsOfService;
