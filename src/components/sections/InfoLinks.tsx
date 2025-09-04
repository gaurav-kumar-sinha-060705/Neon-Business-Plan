import { Link } from "react-router-dom";

const InfoLinks = () => {
  return (
    <section className="py-16 border-t border-border/20" aria-labelledby="neon-info-heading">
      <div className="container mx-auto px-4">
        <h2 id="neon-info-heading" className="text-2xl md:text-3xl font-display font-bold mb-8 text-center">NEON Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <article className="text-center">
            <h3 className="font-semibold mb-4 text-primary">Company</h3>
            <ul className="space-y-3 text-foreground/80">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </article>
          <article className="text-center">
            <h3 className="font-semibold mb-4 text-primary">Legal & Policy</h3>
            <ul className="space-y-3 text-foreground/80">
              <li><Link to="/legal/shipping-returns" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/legal/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </article>
        </div>
        <div className="text-center mt-12 pt-8 border-t border-border/10">
          <p className="text-lg text-muted-foreground italic">Elevating luxury with timeless design and modern innovation.</p>
        </div>
      </div>
    </section>
  );
};

export default InfoLinks;
