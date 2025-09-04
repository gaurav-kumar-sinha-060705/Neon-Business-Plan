import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy - NEON";
    const desc = "Read how NEON collects, uses, and protects your personal information.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = desc;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = window.location.origin + "/legal/privacy";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">Our full privacy policy will be available here to detail data usage and your rights.</p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
