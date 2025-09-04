import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

const FAQ = () => {
  useEffect(() => {
    document.title = "NEON FAQ - Answers to common questions";
    const desc = "Find answers to common questions about NEON products, orders, shipping, and returns.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = desc;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = window.location.origin + "/faq";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">We are curating detailed FAQs. In the meantime, please contact support for any urgent queries.</p>
        </section>
      </main>
    </div>
  );
};

export default FAQ;
