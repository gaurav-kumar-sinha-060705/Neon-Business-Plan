import { useEffect } from "react";
import { Header } from "@/components/layout/Header";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact NEON - We're here to help";
    const desc = "Get in touch with NEON: contact form, email, phone number, and business address.";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = desc;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = window.location.origin + "/contact";
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-6">Have a question? Reach out via email at support@neon.example, call +91-00000-00000, or visit our studio in Delhi, India.</p>
        </section>
      </main>
    </div>
  );
};

export default Contact;
