import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/useCart";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export const CheckoutPage = () => {
  const { items, getTotalPrice, clearCart } = useCart();

  const subtotal = useMemo(() => getTotalPrice(), [getTotalPrice]);
  const tax = Math.round(subtotal * 0.1);
  const deliveryCharge = subtotal > 5000 ? 0 : 99;
  const total = subtotal + tax + deliveryCharge;

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    payment_method: "UPI",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Checkout | NEON Luxury";
    // Canonical tag
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = window.location.href;
  }, []);


  const cartItems = items.map((i) => ({
    sku: i.id,
    name: i.name,
    qty: i.quantity,
    unit_price: i.price,
    line_total: i.price * i.quantity,
  }));

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'customer_email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
      case 'customer_phone':
        const phoneRegex = /^[6-9]\d{9}$/;
        return value && !phoneRegex.test(value) ? 'Please enter a valid 10-digit mobile number' : '';
      case 'pincode':
        const pincodeRegex = /^\d{6}$/;
        return value && !pincodeRegex.test(value) ? 'Please enter a valid 6-digit pincode' : '';
      case 'customer_name':
        return value.trim().length < 2 ? 'Name must be at least 2 characters' : '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    
    // Clear existing error and validate
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const orderId = useMemo(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const id = `NEON-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(
      now.getHours()
    )}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    return id;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    // Required field validation
    if (!form.customer_name.trim()) newErrors.customer_name = 'Name is required';
    if (!form.customer_email.trim()) newErrors.customer_email = 'Email is required';
    if (!form.customer_phone.trim()) newErrors.customer_phone = 'Mobile number is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';

    // Field format validation
    Object.keys(form).forEach(key => {
      const value = form[key as keyof typeof form];
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Create flat payload structure as requested
      const payload = {
        order_id: orderId,
        customer_name: form.customer_name,
        email: form.customer_email,
        phone: form.customer_phone,
        address_line: form.address,
        city: form.city,
        state: form.state,
        country: form.country,
        pincode: form.pincode,
        payment_method: form.payment_method,
        order_notes: form.notes,
        currency: "INR",
        order_status: "order placed",
        All_Item_names: items.map(item => item.name).join(", "),
        total_quantity: items.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: subtotal,
        tax: tax,
        shipping: deliveryCharge,
        discount: 0,
        grand_total: total,
        delivery_charge: deliveryCharge,
        delivery_location: form.city || form.pincode || "",
        timestamp: new Date().toISOString(),
        source: "NEON - Luxury E-Commerce"
      };

      const response = await fetch(
        "https://gauravone.app.n8n.cloud/webhook/2b92c76d-5105-4d4e-a469-99674b6a5e98",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Order submitted successfully");

      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Checkout error", err);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h1 className="text-4xl font-display font-bold mb-4">Thank you for shopping with Neon!</h1>
            <p className="text-muted-foreground mb-8">Your order has been placed.</p>
            <Link to="/">
              <Button className="btn-luxury">Continue Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-bold mb-4">Your cart is empty</h1>
            <Link to="/">
              <Button className="btn-luxury">Return to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-display font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
              <section className="card-luxury">
                <h2 className="text-xl font-display font-bold mb-4">Customer Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customer_name">Full Name*</Label>
                    <Input
                      id="customer_name"
                      name="customer_name"
                      value={form.customer_name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className={errors.customer_name ? "border-red-500" : ""}
                    />
                    {errors.customer_name && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="customer_email">Email*</Label>
                    <Input
                      id="customer_email"
                      name="customer_email"
                      type="email"
                      value={form.customer_email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className={errors.customer_email ? "border-red-500" : ""}
                    />
                    {errors.customer_email && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="customer_phone">Mobile Number*</Label>
                    <Input
                      id="customer_phone"
                      name="customer_phone"
                      value={form.customer_phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      required
                      className={errors.customer_phone ? "border-red-500" : ""}
                    />
                    {errors.customer_phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                    )}
                  </div>
                </div>
              </section>

              <section className="card-luxury">
                <h2 className="text-xl font-display font-bold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address Line (Street, Area)*</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Enter your street address and area"
                      required
                      className={errors.address ? "border-red-500" : ""}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="city">City*</Label>
                    <Input 
                      id="city" 
                      name="city" 
                      value={form.city} 
                      onChange={handleChange}
                      placeholder="City"
                      required
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="state">State*</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      value={form.state} 
                      onChange={handleChange}
                      placeholder="State"
                      required
                      className={errors.state ? "border-red-500" : ""}
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="country">Country*</Label>
                    <Input 
                      id="country" 
                      name="country" 
                      value={form.country} 
                      onChange={handleChange}
                      placeholder="Country"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode*</Label>
                    <Input 
                      id="pincode" 
                      name="pincode" 
                      value={form.pincode} 
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      required
                      className={errors.pincode ? "border-red-500" : ""}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </section>

              <section className="card-luxury">
                <h2 className="text-xl font-display font-bold mb-4">Payment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="payment_method">Payment Method</Label>
                    <select
                      id="payment_method"
                      name="payment_method"
                      value={form.payment_method}
                      onChange={handleChange}
                      className="w-full bg-card border border-border/20 rounded px-3 py-2"
                    >
                      <option value="UPI">UPI</option>
                      <option value="Card">Card</option>
                      <option value="COD">Cash on Delivery</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea id="notes" name="notes" value={form.notes} onChange={handleChange} />
                  </div>
                </div>
              </section>

              <div className="flex justify-end">
                <Button type="submit" className="btn-luxury px-8" disabled={isSubmitting}>
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </Button>
              </div>
            </form>

            {/* Summary */}
            <aside className="lg:col-span-1">
              <div className="card-luxury sticky top-24">
                <h2 className="text-xl font-display font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.quantity} × ₹{item.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={deliveryCharge === 0 ? "text-green-500" : ""}>
                      {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                    </span>
                  </div>
                  <div className="border-t border-border/20 pt-3 flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
