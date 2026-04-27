/**
 * KALRT Landing Page - Full Featured Shopify App Design
 * Inspired by Notify Me! - Comprehensive navigation, Shopify-focused
 */

import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "KALRT - #1 Back in Stock App for Shopify | Restock Alerts, PreOrder, Wishlist" },
    { name: "description", content: "Turn out-of-stock into sales. KALRT sends instant restock alerts via email & SMS. Free Klaviyo integration. Trusted by 5,000+ Shopify stores. Install free today." },
  ];
};

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeModule, setActiveModule] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentLogos, setCurrentLogos] = useState(0);
  const [liveNotifications, setLiveNotifications] = useState([
    { id: 1, type: "signup", email: "sarah@...", product: "Classic Tee", time: "2s ago" },
    { id: 2, type: "notified", email: "mike@...", product: "Denim Jacket", time: "15s ago" },
    { id: 3, type: "purchased", email: "emma@...", product: "Running Shoes", time: "1m ago" },
  ]);

  // Live demo widget state
  const [demoEmail, setDemoEmail] = useState("");
  const [demoStatus, setDemoStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleDemoSubmit = () => {
    if (!demoEmail || !demoEmail.includes("@")) return;
    setDemoStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setDemoStatus("success");
      // Add to live notifications feed
      setLiveNotifications(prev => [{
        id: Date.now(),
        type: "signup",
        email: demoEmail.split("@")[0] + "@...",
        product: "Classic Tee",
        time: "just now",
      }, ...prev.slice(0, 2)]);
    }, 1200);
  };

  const resetDemo = () => {
    setDemoEmail("");
    setDemoStatus("idle");
  };

  // Simulate live notifications
  useEffect(() => {
    const names = ["alex@...", "jordan@...", "casey@...", "taylor@...", "morgan@..."];
    const products = ["Summer Dress", "Sneakers", "Hoodie", "Watch", "Backpack"];
    const types = ["signup", "notified", "purchased"];

    const timer = setInterval(() => {
      const newNotif = {
        id: Date.now(),
        type: types[Math.floor(Math.random() * types.length)],
        email: names[Math.floor(Math.random() * names.length)],
        product: products[Math.floor(Math.random() * products.length)],
        time: "just now",
      };
      setLiveNotifications(prev => [newNotif, ...prev.slice(0, 2)]);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal animations using Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navItems = {
    product: {
      title: "Product",
      sections: [
        {
          title: "Platform",
          items: [
            { name: "Platform Overview", desc: "See everything KALRT offers", href: "#features" },
            { name: "KALRT vs Competitors", desc: "Why stores switch to us", href: "#comparison" },
            { name: "Easy Setup", desc: "Install in under 5 minutes", href: "#how-it-works" },
          ]
        },
        {
          title: "Features",
          items: [
            { name: "Back in Stock", desc: "Instant restock alerts", href: "#back-in-stock" },
            { name: "PreOrder", desc: "Sell before you stock", href: "#preorder" },
            { name: "Wishlist", desc: "Save for later", href: "#wishlist" },
            { name: "Low Stock Alerts", desc: "FOMO that converts", href: "#low-stock" },
          ]
        },
        {
          title: "Capabilities",
          items: [
            { name: "Customizable Widgets", desc: "Match your brand", href: "#widgets" },
            { name: "Multi-Language", desc: "Reach global customers", href: "#features" },
            { name: "Analytics & Reports", desc: "Track performance", href: "#features" },
            { name: "KALRT AI", desc: "Smart recommendations", href: "#ai" },
          ]
        },
      ]
    },
    integrations: {
      title: "Integrations",
      sections: [
        {
          title: "Email Marketing",
          items: [
            { name: "Klaviyo", desc: "Free integration", href: "#integrations" },
            { name: "Mailchimp", desc: "Free integration", href: "#integrations" },
            { name: "Omnisend", desc: "Free integration", href: "#integrations" },
          ]
        },
        {
          title: "SMS & Push",
          items: [
            { name: "Twilio", desc: "SMS notifications", href: "#integrations" },
            { name: "Postscript", desc: "SMS marketing", href: "#integrations" },
            { name: "PushOwl", desc: "Push notifications", href: "#integrations" },
          ]
        },
        {
          title: "Other Tools",
          items: [
            { name: "Zapier", desc: "Connect 5000+ apps", href: "#integrations" },
            { name: "SendGrid", desc: "Email delivery", href: "#integrations" },
            { name: "View All →", desc: "20+ integrations", href: "#integrations" },
          ]
        },
      ]
    },
    platforms: {
      title: "Platforms",
      sections: [
        {
          title: "Supported Platforms",
          items: [
            { name: "Shopify", desc: "Full integration", href: "#shopify", badge: "Popular" },
            { name: "Shopify Plus", desc: "Enterprise features", href: "#shopify" },
            { name: "BigCommerce", desc: "Coming soon", href: "#", badge: "Soon" },
          ]
        },
        {
          title: "By Industry",
          items: [
            { name: "Fashion & Apparel", desc: "Trending styles", href: "#" },
            { name: "Beauty & Cosmetics", desc: "Limited editions", href: "#" },
            { name: "Electronics", desc: "High-demand items", href: "#" },
            { name: "Food & Beverage", desc: "Seasonal products", href: "#" },
          ]
        },
        {
          title: "By Size",
          items: [
            { name: "Enterprise", desc: "Custom solutions", href: "#" },
            { name: "Growing Stores", desc: "Scale with ease", href: "#" },
            { name: "Startups", desc: "Start free", href: "#" },
          ]
        },
      ]
    },
    resources: {
      title: "Resources",
      sections: [
        {
          title: "Learn",
          items: [
            { name: "Help Center", desc: "Guides & tutorials", href: "/app/help" },
            { name: "Blog", desc: "Tips & strategies", href: "#" },
            { name: "Case Studies", desc: "Success stories", href: "#testimonials" },
          ]
        },
        {
          title: "Developers",
          items: [
            { name: "API Documentation", desc: "Build integrations", href: "#" },
            { name: "Webhooks", desc: "Real-time events", href: "#" },
            { name: "Status Page", desc: "System uptime", href: "#" },
          ]
        },
        {
          title: "Company",
          items: [
            { name: "About Us", desc: "Our story", href: "#" },
            { name: "Contact", desc: "Get in touch", href: "#" },
            { name: "Partners", desc: "Agency program", href: "#" },
          ]
        },
      ]
    },
  };

  const modules = [
    {
      id: "back-in-stock",
      title: "Back in Stock",
      subtitle: "Instant restock alerts",
      description: "Automatically notify customers the moment products are back. Email, SMS, or push - delivered in under 60 seconds.",
      features: ["Email & SMS alerts", "Variant-level tracking", "<60 second delivery", "Custom templates", "Unlimited subscribers"],
      metric: "23% conversion rate",
      color: "#ff6b4a",
      steps: [
        { title: "Customer Signs Up", desc: "Enters email when product is out of stock" },
        { title: "We Monitor Inventory", desc: "Real-time Shopify webhook tracking" },
        { title: "Product Restocks", desc: "Inventory updates in your store" },
        { title: "Instant Alert Sent", desc: "Email/SMS delivered in <60 seconds" },
        { title: "Customer Purchases", desc: "Direct link to buy now" },
        { title: "Revenue Recovered", desc: "Sale completed, you profit" },
      ]
    },
    {
      id: "preorder",
      title: "PreOrder",
      subtitle: "Sell before you stock",
      description: "Accept orders for out-of-stock items. Full payment or deposits. Zero transaction fees, unlike competitors.",
      features: ["0% transaction fees", "Deposit or full payment", "Auto-switch when OOS", "Shipping notifications", "B2B support"],
      metric: "$0 fees vs 3% others",
      color: "#4f8cff",
      steps: [
        { title: "Product Goes OOS", desc: "Automatically switches to preorder" },
        { title: "Customer Pre-Orders", desc: "Full payment or deposit option" },
        { title: "Order Confirmed", desc: "Customer receives confirmation" },
        { title: "Product Ships", desc: "You fulfill when stock arrives" },
        { title: "Customer Notified", desc: "Shipping update sent" },
        { title: "Zero Fees Charged", desc: "You keep 100% of revenue" },
      ]
    },
    {
      id: "wishlist",
      title: "Wishlist",
      subtitle: "Save for later",
      description: "Let customers bookmark favorites without logging in. Send reminders and price drop alerts automatically.",
      features: ["No login required", "Price drop alerts", "Shareable lists", "Weekly reminders", "Engagement analytics"],
      metric: "3.2x more engagement",
      color: "#a855f7",
      steps: [
        { title: "Customer Adds Item", desc: "One-click save, no login needed" },
        { title: "List Syncs", desc: "Saved across devices" },
        { title: "Price Drops", desc: "Automatic alert sent" },
        { title: "Weekly Reminder", desc: "Gentle nudge to purchase" },
        { title: "Customer Returns", desc: "Ready to buy" },
        { title: "Conversion Tracked", desc: "Analytics show ROI" },
      ]
    },
    {
      id: "low-stock",
      title: "Low Stock",
      subtitle: "Urgency that converts",
      description: "Show 'Only X left!' badges when inventory runs low. Create real urgency without fake countdown timers.",
      features: ["Dynamic stock badges", "Custom thresholds", "Merchant alerts", "Exclude by tag", "Conversion tracking"],
      metric: "+31% conversion lift",
      color: "#10b981",
      steps: [
        { title: "Set Threshold", desc: "Define low stock level (e.g., 5 units)" },
        { title: "Stock Drops", desc: "Inventory falls below threshold" },
        { title: "Badge Appears", desc: "'Only X left!' shown on product" },
        { title: "Urgency Created", desc: "Customers motivated to buy now" },
        { title: "Conversions Increase", desc: "Average +31% lift" },
        { title: "You Get Alerted", desc: "Know when to reorder" },
      ]
    },
  ];

  const integrations = [
    { name: "Klaviyo", color: "#000000", icon: "📧", popular: true },
    { name: "Mailchimp", color: "#FFE01B", icon: "🐵", popular: true },
    { name: "Omnisend", color: "#1F2937", icon: "📨", popular: false },
    { name: "SendGrid", color: "#1A82E2", icon: "✉️", popular: false },
    { name: "Twilio", color: "#F22F46", icon: "📱", popular: true },
    { name: "Zapier", color: "#FF4A00", icon: "⚡", popular: false },
    { name: "Postscript", color: "#6366F1", icon: "💬", popular: false },
    { name: "PushOwl", color: "#FF6B4A", icon: "🔔", popular: false },
    { name: "Attentive", color: "#000000", icon: "📲", popular: false },
    { name: "Gorgias", color: "#1F2937", icon: "🎧", popular: false },
    { name: "Rebuy", color: "#00D4AA", icon: "🛒", popular: false },
    { name: "Judge.me", color: "#15BD76", icon: "⭐", popular: false },
  ];

  const testimonials = [
    {
      quote: "KALRT recovered $12,400 in our first month. The ROI is unreal. We switched from Notify Me! and couldn't be happier.",
      author: "Sarah Chen",
      role: "Founder",
      company: "Modern Threads",
      metric: "$12,400 recovered",
      avatar: "SC",
      avatarBg: "linear-gradient(135deg, #ff6b4a, #ff8a6a)",
      duration: "2 years",
      location: "USA",
    },
    {
      quote: "The Klaviyo integration being free saved us $240/year. Same features as competitors, honest pricing. Support is incredible.",
      author: "Marcus Rodriguez",
      role: "E-commerce Director",
      company: "Urban Athletics",
      metric: "$240/yr saved",
      avatar: "MR",
      avatarBg: "linear-gradient(135deg, #4f8cff, #6ba3ff)",
      duration: "1.5 years",
      location: "Canada",
    },
    {
      quote: "Setup took 4 minutes. First notification sent in under a minute. Our conversion rate on restock alerts is 31%.",
      author: "Emma Thompson",
      role: "Owner",
      company: "Glow Beauty Co",
      metric: "31% conversion",
      avatar: "ET",
      avatarBg: "linear-gradient(135deg, #a855f7, #c084fc)",
      duration: "1 year",
      location: "UK",
    },
    {
      quote: "We process 500+ preorders monthly with zero transaction fees. That's $1,500/month we keep vs other apps.",
      author: "David Park",
      role: "Operations Manager",
      company: "Seoul Streetwear",
      metric: "$1,500/mo saved",
      avatar: "DP",
      avatarBg: "linear-gradient(135deg, #10b981, #34d399)",
      duration: "8 months",
      location: "South Korea",
    },
    {
      quote: "The low stock badges increased our conversion by 27%. Real urgency, not fake countdown timers. Love it.",
      author: "Lisa Martinez",
      role: "Marketing Lead",
      company: "Casa Bonita Home",
      metric: "+27% conversions",
      avatar: "LM",
      avatarBg: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      duration: "1 year",
      location: "Mexico",
    },
  ];

  const customerLogos = [
    "ALLBIRDS", "GYMSHARK", "MVMT", "BROOKLINEN", "ROTHYS",
    "PARADE", "SKIMS", "FIGS", "AWAY", "GLOSSIER",
    "OUTDOOR VOICES", "CASPER", "WARBY PARKER", "BOMBAS"
  ];

  const faqs = [
    {
      q: "How do I install KALRT on my Shopify store?",
      a: "Click 'Install on Shopify' and you'll be redirected to the Shopify App Store. One click to install, then our setup wizard guides you through configuration in under 5 minutes. No coding required."
    },
    {
      q: "Is the Klaviyo integration really free?",
      a: "Yes, completely free on all paid plans. We believe integrations should be included, not upsold. Connect Klaviyo, Mailchimp, Omnisend, and 10+ other tools at no extra cost."
    },
    {
      q: "How is KALRT different from Notify Me!?",
      a: "Three key differences: 1) Transparent pricing with no bait-and-switch, 2) Free Klaviyo/Mailchimp integration (competitors charge $15-20/month extra), 3) Zero transaction fees on preorders (others charge up to 3%). Plus notifications send in under 60 seconds vs 5+ minutes."
    },
    {
      q: "What happens when I hit my notification limit?",
      a: "We use soft caps with a 20% grace period. You'll get warnings at 80% usage. We never cut off service mid-campaign. Your customers always get notified."
    },
    {
      q: "Do you support multiple languages?",
      a: "Yes! KALRT supports 12+ languages including English, Spanish, French, German, Portuguese, Italian, Dutch, and more. Emails and widgets automatically display in your customer's language."
    },
    {
      q: "Can I migrate from another back-in-stock app?",
      a: "Yes, free migration with unlimited imports. Export your subscriber list from your current app and import into KALRT. Most migrations complete in under 30 minutes. We'll help you every step."
    },
    {
      q: "Do you have an API for custom integrations?",
      a: "Yes, full REST API available on Growth and Scale plans. Documentation includes endpoints for subscribers, notifications, products, and webhooks. Build custom workflows with ease."
    },
    {
      q: "What's your uptime guarantee?",
      a: "99.9% uptime SLA on all paid plans. We use redundant infrastructure across multiple regions. Check our public status page anytime for real-time system health."
    },
  ];

  const comparisonData = [
    { feature: "Free notifications/month", kalrt: "50", competitor: "10" },
    { feature: "Klaviyo/Mailchimp integration", kalrt: "Free", competitor: "$20/mo extra" },
    { feature: "PreOrder transaction fees", kalrt: "0%", competitor: "Up to 3%" },
    { feature: "Notification speed", kalrt: "<60 seconds", competitor: "5-30 minutes" },
    { feature: "SMS included", kalrt: "Yes", competitor: "Extra cost" },
    { feature: "Multi-language support", kalrt: "12+ languages", competitor: "Limited" },
    { feature: "API access", kalrt: "Included", competitor: "Enterprise only" },
    { feature: "Plan downgrade", kalrt: "Anytime", competitor: "Often blocked" },
  ];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      background: "#ffffff",
      color: "#1a1a2e",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* Micro Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes ripple {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInNotification {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255, 107, 74, 0.3); }
          50% { box-shadow: 0 0 20px rgba(255, 107, 74, 0.6); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.6s ease-out forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-pulse { animation: pulse 2s ease-in-out infinite; }
        .animate-bounce { animation: bounce 2s ease-in-out infinite; }
        .animate-glow { animation: glow 2s ease-in-out infinite; }

        /* Scroll Reveal Animations */
        .scroll-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .scroll-reveal-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .scroll-reveal-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .scroll-reveal-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .scroll-reveal-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .scroll-reveal-scale {
          opacity: 0;
          transform: scale(0.95);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .scroll-reveal-scale.visible {
          opacity: 1;
          transform: scale(1);
        }
        /* Staggered delays for child elements */
        .scroll-reveal.delay-1 { transition-delay: 0.1s; }
        .scroll-reveal.delay-2 { transition-delay: 0.2s; }
        .scroll-reveal.delay-3 { transition-delay: 0.3s; }
        .scroll-reveal.delay-4 { transition-delay: 0.4s; }

        .hover-lift { transition: transform 0.3s, box-shadow 0.3s; }
        .hover-lift:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }

        .hover-scale { transition: transform 0.2s; }
        .hover-scale:hover { transform: scale(1.02); }

        .hover-glow { transition: box-shadow 0.3s; }
        .hover-glow:hover { box-shadow: 0 0 30px rgba(255, 107, 74, 0.3); }

        .shimmer-bg {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }

        .notification-animate {
          animation: slideInNotification 0.5s ease-out forwards;
        }

        .typing-effect {
          overflow: hidden;
          white-space: nowrap;
          animation: typing 2s steps(30) forwards;
        }

        .play-button {
          position: relative;
          cursor: pointer;
          transition: transform 0.3s;
        }
        .play-button:hover { transform: scale(1.1); }
        .play-button::after {
          content: '';
          position: absolute;
          inset: -10px;
          border: 2px solid rgba(255,107,74,0.5);
          border-radius: 50%;
          animation: ripple 1.5s ease-out infinite;
        }

        .btn-primary {
          background: linear-gradient(135deg, #ff6b4a 0%, #ff8a6a 100%);
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-size: 15px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 107, 74, 0.3);
        }

        .btn-shopify {
          background: #5c6ac4;
          color: white;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-size: 15px;
        }
        .btn-shopify:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(92, 106, 196, 0.3);
          background: #4a58b5;
        }

        .btn-secondary {
          background: white;
          color: #1a1a2e;
          padding: 14px 28px;
          border-radius: 8px;
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          font-size: 15px;
        }
        .btn-secondary:hover {
          border-color: #1a1a2e;
          background: #f9fafb;
        }

        .card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 32px;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .section-gray { background: #f8f9fa; }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #ecfdf5;
          color: #059669;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 500;
        }

        .badge-shopify {
          background: #5c6ac4;
          color: white;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .nav-item {
          color: #4b5563;
          text-decoration: none;
          font-weight: 500;
          padding: 8px 16px;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 15px;
        }
        .nav-item:hover {
          color: #1a1a2e;
          background: #f3f4f6;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.15);
          display: grid;
          grid-template-columns: repeat(3, 220px);
          gap: 32px;
          z-index: 1000;
          margin-top: 8px;
        }

        .dropdown-section h4 {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #9ca3af;
          margin-bottom: 12px;
          font-weight: 600;
        }

        .dropdown-item {
          display: block;
          padding: 10px 12px;
          border-radius: 8px;
          text-decoration: none;
          color: #1a1a2e;
          transition: background 0.2s;
          margin-bottom: 4px;
        }
        .dropdown-item:hover {
          background: #f3f4f6;
        }
        .dropdown-item-name {
          font-weight: 600;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .dropdown-item-desc {
          font-size: 12px;
          color: #6b7280;
          margin-top: 2px;
        }

        .step-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          position: relative;
        }
        .step-number {
          width: 32px;
          height: 32px;
          background: #ff6b4a;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 14px;
          margin: 0 auto 12px;
        }
        .step-connector {
          position: absolute;
          top: 36px;
          right: -20px;
          width: 40px;
          height: 2px;
          background: #e5e7eb;
        }

        .logo-carousel {
          display: flex;
          gap: 48px;
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .testimonial-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          padding: 32px;
          min-width: 400px;
        }

        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-btn { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-content { align-items: center !important; }
          .hero-buttons { justify-content: center !important; flex-wrap: wrap; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .modules-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .testimonial-card { min-width: 300px; }
          .pricing-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .integration-grid { grid-template-columns: repeat(4, 1fr) !important; }
          .comparison-grid { grid-template-columns: 2fr 1fr 1fr !important; }
        }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .step-connector { display: none; }
          .features-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .integration-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .section-padding { padding: 60px 16px !important; }
          .hero-section { padding: 60px 16px 80px !important; }
        }

        @media (max-width: 480px) {
          .integration-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-buttons { flex-direction: column; width: 100%; }
          .hero-buttons a, .hero-buttons button { width: 100%; justify-content: center; }
        }
      `}</style>

      {/* Top Bar */}
      <div style={{
        background: "#1a1a2e",
        color: "white",
        padding: "10px 24px",
        fontSize: 13,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}>
        <span>🎉 Free for Shopify stores - 50 notifications/month forever</span>
        <Link to="/app" style={{ color: "#ff6b4a", fontWeight: 600, textDecoration: "none" }}>
          Install Free →
        </Link>
      </div>

      {/* Navigation */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e5e7eb",
      }}>
        <div style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 38,
              height: 38,
              background: "linear-gradient(135deg, #ff6b4a, #ff8a6a)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: 18,
            }}>K</div>
            <span style={{ fontWeight: 700, fontSize: 22 }}>KALRT</span>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {Object.entries(navItems).map(([key, nav]) => (
              <div
                key={key}
                style={{ position: "relative" }}
                onMouseEnter={() => setActiveDropdown(key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <div className="nav-item">
                  {nav.title}
                  <span style={{ fontSize: 10, opacity: 0.5 }}>▼</span>
                </div>
                {activeDropdown === key && (
                  <div className="dropdown-menu">
                    {nav.sections.map((section, i) => (
                      <div key={i} className="dropdown-section">
                        <h4>{section.title}</h4>
                        {section.items.map((item, j) => (
                          <a key={j} href={item.href} className="dropdown-item">
                            <div className="dropdown-item-name">
                              {item.name}
                              {(item as any).badge && (
                                <span style={{
                                  background: (item as any).badge === "Popular" ? "#ecfdf5" : "#fef3c7",
                                  color: (item as any).badge === "Popular" ? "#059669" : "#d97706",
                                  padding: "2px 8px",
                                  borderRadius: 50,
                                  fontSize: 10,
                                  fontWeight: 600,
                                }}>{(item as any).badge}</span>
                              )}
                            </div>
                            <div className="dropdown-item-desc">{item.desc}</div>
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a href="#pricing" className="nav-item">Pricing</a>
            <Link to="/app" className="nav-item">Login</Link>
            <a href="https://apps.shopify.com" target="_blank" rel="noopener noreferrer" className="btn-shopify" style={{ marginLeft: 8, padding: "10px 18px" }}>
              <svg width="20" height="20" viewBox="0 0 256 292" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644 0 118.85 0c-37.54 0-55.53 46.835-61.182 70.63-14.724 4.544-25.19 7.762-26.54 8.203-8.183 2.553-8.429 2.807-9.5 10.503C20.514 95.962 0 260.288 0 260.288l175.898 32.96 96.107-24.258S224.076 58.8 223.774 57.34zM156.9 40.848l-14.56 4.505c0-3.063-.064-6.143-.437-9.07l-9.96 1.86c2.035 6.618 3.004 14.053 3.004 21.672l-21.263 6.578c5.804-22.25 16.702-33.04 26.478-37.12 4.488 3.166 10.31 7.07 16.738 11.575zm-24.91-24.63c1.5 0 2.986.204 4.444.602-12.474 5.876-25.808 20.66-31.403 50.212l-16.806 5.196C96.307 48.296 108.819 16.218 131.99 16.218zm-8.996 113.017c.637 10.407 28.09 12.668 29.636 37.044 1.213 19.171-10.15 32.256-26.52 33.27-19.678 1.222-30.522-10.372-30.522-10.372l4.17-17.722s10.9 8.217 19.63 7.673c5.694-.355 7.738-4.99 7.538-8.258-0.83-13.573-23.18-12.77-24.612-35.076-1.2-18.77 11.14-37.79 38.357-39.51 10.51-.664 15.87 2.006 15.87 2.006l-6.21 23.212s-6.92-3.18-15.14-2.55c-12.02.926-12.126 8.324-12.026 10.24l.829.043z" fill="currentColor"/>
              </svg>
              Install on Shopify
            </a>
            <Link to="/app" className="btn-secondary" style={{ padding: "10px 18px" }}>
              Book Demo
            </Link>
          </div>

          {/* Mobile Nav Button */}
          <button
            className="mobile-nav-btn"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              padding: 8,
            }}
          >
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileNavOpen && (
          <div style={{
            background: "white",
            borderTop: "1px solid #e5e7eb",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}>
            <a href="#features" onClick={() => setMobileNavOpen(false)} style={{ padding: "12px 0", color: "#1a1a2e", textDecoration: "none", fontWeight: 500 }}>Features</a>
            <a href="#integrations" onClick={() => setMobileNavOpen(false)} style={{ padding: "12px 0", color: "#1a1a2e", textDecoration: "none", fontWeight: 500 }}>Integrations</a>
            <a href="#how-it-works" onClick={() => setMobileNavOpen(false)} style={{ padding: "12px 0", color: "#1a1a2e", textDecoration: "none", fontWeight: 500 }}>How It Works</a>
            <a href="#pricing" onClick={() => setMobileNavOpen(false)} style={{ padding: "12px 0", color: "#1a1a2e", textDecoration: "none", fontWeight: 500 }}>Pricing</a>
            <a href="#faq" onClick={() => setMobileNavOpen(false)} style={{ padding: "12px 0", color: "#1a1a2e", textDecoration: "none", fontWeight: 500 }}>FAQ</a>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <a href="https://apps.shopify.com" target="_blank" rel="noopener noreferrer" className="btn-shopify" style={{ flex: 1, justifyContent: "center" }}>
                Install on Shopify
              </a>
              <Link to="/app" className="btn-secondary" onClick={() => setMobileNavOpen(false)} style={{ flex: 1, justifyContent: "center" }}>
                Book Demo
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="hero-section" style={{ padding: "80px 24px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}>
            {/* Left Content */}
            <div className="hero-content" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div className="badge-shopify">
                  <svg width="16" height="16" viewBox="0 0 256 292" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644 0 118.85 0c-37.54 0-55.53 46.835-61.182 70.63-14.724 4.544-25.19 7.762-26.54 8.203-8.183 2.553-8.429 2.807-9.5 10.503C20.514 95.962 0 260.288 0 260.288l175.898 32.96 96.107-24.258S224.076 58.8 223.774 57.34z" fill="currentColor"/>
                  </svg>
                  Shopify App
                </div>
                <div className="badge">
                  <span style={{ color: "#fbbf24" }}>★</span> 4.9/5 (500+ reviews)
                </div>
              </div>

              <h1 style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: 20,
                color: "#1a1a2e",
              }}>
                Turn "Out of Stock" Into Your Best Sales Channel
              </h1>

              <p style={{
                fontSize: 18,
                color: "#4b5563",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 520,
              }}>
                KALRT notifies customers instantly when products restock. Recover lost sales with email, SMS, and push alerts - all in under 60 seconds. Trusted by 5,000+ Shopify stores.
              </p>

              <div className="hero-buttons" style={{ display: "flex", gap: 16, marginBottom: 32 }}>
                <a href="https://apps.shopify.com" target="_blank" rel="noopener noreferrer" className="btn-shopify" style={{ padding: "16px 28px" }}>
                  <svg width="22" height="22" viewBox="0 0 256 292" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644 0 118.85 0c-37.54 0-55.53 46.835-61.182 70.63-14.724 4.544-25.19 7.762-26.54 8.203-8.183 2.553-8.429 2.807-9.5 10.503C20.514 95.962 0 260.288 0 260.288l175.898 32.96 96.107-24.258S224.076 58.8 223.774 57.34zM156.9 40.848l-14.56 4.505c0-3.063-.064-6.143-.437-9.07l-9.96 1.86c2.035 6.618 3.004 14.053 3.004 21.672l-21.263 6.578c5.804-22.25 16.702-33.04 26.478-37.12 4.488 3.166 10.31 7.07 16.738 11.575zm-24.91-24.63c1.5 0 2.986.204 4.444.602-12.474 5.876-25.808 20.66-31.403 50.212l-16.806 5.196C96.307 48.296 108.819 16.218 131.99 16.218zm-8.996 113.017c.637 10.407 28.09 12.668 29.636 37.044 1.213 19.171-10.15 32.256-26.52 33.27-19.678 1.222-30.522-10.372-30.522-10.372l4.17-17.722s10.9 8.217 19.63 7.673c5.694-.355 7.738-4.99 7.538-8.258-0.83-13.573-23.18-12.77-24.612-35.076-1.2-18.77 11.14-37.79 38.357-39.51 10.51-.664 15.87 2.006 15.87 2.006l-6.21 23.212s-6.92-3.18-15.14-2.55c-12.02.926-12.126 8.324-12.026 10.24l.829.043z" fill="currentColor"/>
                  </svg>
                  Install Free on Shopify
                </a>
                <Link to="/app" className="btn-secondary" style={{ padding: "16px 28px" }}>
                  <span>▶</span>
                  Watch Demo
                </Link>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#10b981", fontSize: 18 }}>✓</span>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>Free forever plan</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#10b981", fontSize: 18 }}>✓</span>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>No credit card required</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "#10b981", fontSize: 18 }}>✓</span>
                  <span style={{ color: "#6b7280", fontSize: 14 }}>5-minute setup</span>
                </div>
              </div>
            </div>

            {/* Right: Hero Illustration - Real Dashboard GIF */}
            <div style={{ position: "relative" }}>
              {/* Browser Chrome Frame */}
              <div className="animate-fadeInRight hover-lift" style={{
                background: "white",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: "0 25px 80px rgba(0,0,0,0.15)",
              }}>
                {/* Browser Header */}
                <div style={{
                  background: "#f8f9fa",
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  borderBottom: "1px solid #e5e7eb",
                }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
                  </div>
                  <div style={{
                    flex: 1,
                    background: "white",
                    borderRadius: 6,
                    padding: "6px 12px",
                    fontSize: 12,
                    color: "#6b7280",
                    marginLeft: 12,
                  }}>
                    app.kalrt.com/dashboard
                  </div>
                </div>
                {/* Dashboard GIF */}
                <img
                  src="/images/kalrt-dashboard-demo.gif"
                  alt="KALRT Dashboard Demo"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>

              {/* Floating Stats Cards */}
              <div className="animate-float" style={{
                position: "absolute",
                bottom: -20,
                left: -30,
                background: "white",
                borderRadius: 12,
                padding: "16px 20px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
              }}>
                <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>Conversion Rate</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: "#10b981" }}>23.4%</span>
                  <span style={{ fontSize: 12, color: "#10b981" }}>↑ 12%</span>
                </div>
              </div>

              <div className="animate-float" style={{
                position: "absolute",
                top: 20,
                right: -20,
                background: "#1a1a2e",
                borderRadius: 12,
                padding: "14px 18px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                animationDelay: "0.5s",
              }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Notification Speed</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#10b981" }}>&lt;60 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Logo Carousel */}
      <section style={{
        padding: "40px 0",
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
        overflow: "hidden",
      }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <p style={{ color: "#9ca3af", fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Trusted by 5,000+ Shopify brands worldwide
          </p>
        </div>
        <div style={{ overflow: "hidden" }}>
          <div className="logo-carousel" style={{ display: "flex", gap: 48 }}>
            {[...customerLogos, ...customerLogos].map((brand, i) => (
              <span key={i} style={{
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: 2,
                color: "#9ca3af",
                whiteSpace: "nowrap",
              }}>{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* See It In Action - Demo Video Section */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="badge" style={{ marginBottom: 16 }}>See it in action</div>
            <h2 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>
              From "Out of Stock" to "Sold" in Seconds
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563", maxWidth: 700, margin: "0 auto" }}>
              Watch how KALRT captures customer interest and converts it into sales the moment products restock.
              No complex setup — it just works.
            </p>
          </div>

          {/* Demo GIF with Browser Chrome */}
          <div className="scroll-reveal-scale" style={{
            maxWidth: 900,
            margin: "0 auto",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(0,0,0,0.15)",
          }}>
            <img
              src="/images/kalrt-widget-demo.gif"
              alt="KALRT widget demo - customer signs up for restock notification"
              style={{ width: "100%", display: "block" }}
            />
          </div>

          {/* Stats below demo */}
          <div className="scroll-reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
            marginTop: 60,
            textAlign: "center",
          }}>
            <div>
              <div style={{ fontSize: 48, fontWeight: 800, color: "#ff6b4a", marginBottom: 8 }}>23%</div>
              <div style={{ fontSize: 16, color: "#4b5563" }}>Average conversion rate on restock alerts</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 800, color: "#4f8cff", marginBottom: 8 }}>&lt;60s</div>
              <div style={{ fontSize: 16, color: "#4b5563" }}>Notification delivered after restock</div>
            </div>
            <div>
              <div style={{ fontSize: 48, fontWeight: 800, color: "#10b981", marginBottom: 8 }}>$0</div>
              <div style={{ fontSize: 16, color: "#4b5563" }}>Transaction fees on all plans</div>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Showcase - Real Store Examples */}
      <section style={{ padding: "80px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Works everywhere</div>
            <h2 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>
              Seamless on Any Shopify Theme
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563", maxWidth: 700, margin: "0 auto" }}>
              Our widget automatically adapts to your store's design. No coding required — just install and go.
            </p>
          </div>

          {/* Store Theme Showcase Grid */}
          <div className="scroll-reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}>
            {/* Fashion Store */}
            <div className="hover-lift" style={{
              background: "#fafafa",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
            }}>
              <div style={{ padding: 12, background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ marginLeft: 12, fontSize: 12, color: "#6b7280" }}>luxe-fashion.myshopify.com</span>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 120, height: 150, background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 40 }}>👗</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1 }}>Designer Collection</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Silk Evening Dress</div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>$349.00</div>
                    <div style={{ marginTop: 8, padding: "6px 0", background: "#f3f4f6", color: "#6b7280", fontSize: 12, textAlign: "center", borderRadius: 4 }}>Sold Out</div>
                    <button style={{ marginTop: 8, width: "100%", padding: "10px 16px", background: "#1a1a2e", color: "white", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      ✉️ Notify When Available
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "12px 20px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 12, color: "#059669", fontWeight: 500 }}>✓ 847 waiting • 23% convert</div>
              </div>
            </div>

            {/* Electronics Store */}
            <div className="hover-lift" style={{
              background: "#fafafa",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
            }}>
              <div style={{ padding: 12, background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ marginLeft: 12, fontSize: 12, color: "#6b7280" }}>techgear-store.myshopify.com</span>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 120, height: 150, background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 40 }}>🎧</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1 }}>Audio</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Pro Wireless Headphones</div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>$299.00</div>
                    <div style={{ marginTop: 8, padding: "6px 0", background: "#fef2f2", color: "#dc2626", fontSize: 12, textAlign: "center", borderRadius: 4 }}>Out of Stock</div>
                    <button style={{ marginTop: 8, width: "100%", padding: "10px 16px", background: "#0ea5e9", color: "white", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      🔔 Get Restock Alert
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "12px 20px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 12, color: "#059669", fontWeight: 500 }}>✓ 1,234 waiting • 31% convert</div>
              </div>
            </div>

            {/* Beauty Store */}
            <div className="hover-lift" style={{
              background: "#fafafa",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
            }}>
              <div style={{ padding: 12, background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                  <span style={{ marginLeft: 12, fontSize: 12, color: "#6b7280" }}>glow-beauty.myshopify.com</span>
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", gap: 16 }}>
                  <div style={{ width: 120, height: 150, background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 40 }}>💄</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1 }}>Skincare</div>
                    <div style={{ fontSize: 16, fontWeight: 600, marginTop: 4 }}>Vitamin C Serum</div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>$68.00</div>
                    <div style={{ marginTop: 8, padding: "6px 0", background: "#fdf4ff", color: "#a855f7", fontSize: 12, textAlign: "center", borderRadius: 4 }}>Coming Soon</div>
                    <button style={{ marginTop: 8, width: "100%", padding: "10px 16px", background: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)", color: "white", border: "none", borderRadius: 4, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                      💌 Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ padding: "12px 20px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 12, color: "#059669", fontWeight: 500 }}>✓ 2,156 waiting • 28% convert</div>
              </div>
            </div>
          </div>

          {/* Customization callout */}
          <div className="scroll-reveal" style={{
            marginTop: 50,
            padding: 32,
            background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
            borderRadius: 16,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              🎨 Fully Customizable
            </div>
            <p style={{ color: "#4b5563", marginBottom: 16 }}>
              Match your brand colors, change button text, add your logo, adjust timing — all without code
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["Custom colors", "Button text", "Email templates", "Popup timing", "Mobile-optimized"].map((feature, i) => (
                <span key={i} style={{
                  padding: "8px 16px",
                  background: "white",
                  borderRadius: 20,
                  fontSize: 14,
                  color: "#374151",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                }}>
                  ✓ {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Screenshots Gallery */}
      <section id="demo" className="section-padding" style={{ padding: "60px 24px", background: "#1a1a2e" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="badge" style={{ background: "rgba(255,107,74,0.2)", color: "#ff6b4a", marginBottom: 16 }}>
              Powerful Dashboard
            </div>
            <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, color: "white" }}>
              Everything You Need in One Place
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.7)", maxWidth: 600, margin: "0 auto" }}>
              Manage subscribers, track analytics, send notifications, and grow revenue - all from a single dashboard.
            </p>
          </div>

          {/* Screenshot Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }} className="features-grid scroll-reveal-scale">
            {[
              { img: "/images/screenshots/back-in-stock.png", title: "Back in Stock", desc: "Manage 1,247+ subscribers" },
              { img: "/images/screenshots/preorder.png", title: "PreOrder", desc: "89 orders, $7,845 revenue" },
              { img: "/images/screenshots/wishlist.png", title: "Wishlist", desc: "567 wishlists, 45 conversions" },
              { img: "/images/screenshots/analytics.png", title: "Analytics", desc: "$12,847 total revenue" },
            ].map((item, i) => (
              <Link key={i} to="/app" className="hover-lift" style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                overflow: "hidden",
                textDecoration: "none",
                display: "block",
              }}>
                <img
                  src={item.img}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    objectPosition: "top left",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <div style={{ padding: 16 }}>
                  <h4 style={{ fontWeight: 600, marginBottom: 4, color: "white", fontSize: 14 }}>{item.title}</h4>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link to="/app" className="btn-primary" style={{
              background: "#ff6b4a",
              color: "white",
              padding: "14px 32px",
              borderRadius: 8,
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}>
              Explore Full Dashboard
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 4 Core Features */}
      <section id="features" className="section-padding" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 16 }}>All features included free</div>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              Take Control of Your Inventory
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563", maxWidth: 600, margin: "0 auto" }}>
              Four powerful modules working together to maximize every sale opportunity
            </p>
          </div>

          <div className="features-grid scroll-reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}>
            {modules.map((mod, i) => (
              <div
                key={mod.id}
                className="card hover-lift"
                style={{
                  cursor: "pointer",
                  borderColor: activeModule === i ? mod.color : "#e5e7eb",
                  borderWidth: activeModule === i ? 2 : 1,
                  position: "relative",
                  overflow: "hidden",
                }}
                onClick={() => setActiveModule(i)}
              >
                {/* Mini Preview Animation */}
                <div style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${mod.color}10 0%, ${mod.color}05 100%)`,
                  borderRadius: 10,
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  {/* Widget Preview for each module */}
                  {i === 0 && (
                    <div style={{ textAlign: "center" }}>
                      <div className="animate-bounce" style={{ fontSize: 32, marginBottom: 8 }}>🔔</div>
                      <div style={{ background: mod.color, color: "white", padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                        Notify Me
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div style={{ textAlign: "center" }}>
                      <div className="animate-float" style={{ fontSize: 32, marginBottom: 8 }}>🛒</div>
                      <div style={{ background: mod.color, color: "white", padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                        Pre-Order Now
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div style={{ textAlign: "center" }}>
                      <div className="animate-pulse" style={{ fontSize: 32, marginBottom: 8 }}>❤️</div>
                      <div style={{ background: mod.color, color: "white", padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
                        Add to Wishlist
                      </div>
                    </div>
                  )}
                  {i === 3 && (
                    <div style={{ textAlign: "center" }}>
                      <div className="animate-pulse" style={{
                        background: "#fef2f2",
                        color: "#dc2626",
                        padding: "8px 14px",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 700,
                      }}>
                        🔥 Only 3 left!
                      </div>
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{mod.title}</h3>
                <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 16 }}>{mod.subtitle}</p>
                <div style={{
                  background: `${mod.color}10`,
                  color: mod.color,
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  display: "inline-block",
                }}>
                  {mod.metric}
                </div>

                {/* Active indicator */}
                {activeModule === i && (
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: mod.color,
                  }}></div>
                )}
              </div>
            ))}
          </div>

          {/* See How Button */}
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="#how-it-works" className="btn-secondary">
              See How It Works
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section id="how-it-works" className="section-gray section-padding" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              How {modules[activeModule].title} Works
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563" }}>
              {modules[activeModule].description}
            </p>
          </div>

          {/* Module Tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 50, flexWrap: "wrap" }}>
            {modules.map((mod, i) => (
              <button
                key={mod.id}
                onClick={() => setActiveModule(i)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: activeModule === i ? mod.color : "white",
                  color: activeModule === i ? "white" : "#4b5563",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 14,
                  boxShadow: activeModule === i ? "none" : "0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                {mod.title}
              </button>
            ))}
          </div>

          {/* Steps Grid */}
          <div className="steps-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}>
            {modules[activeModule].steps.map((step, i) => (
              <div key={i} className="step-card">
                {i < 5 && <div className="step-connector"></div>}
                <div className="step-number" style={{ background: modules[activeModule].color }}>
                  {i + 1}
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{step.title}</h4>
                <p style={{ fontSize: 12, color: "#6b7280" }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Feature List */}
          <div style={{
            marginTop: 50,
            background: "white",
            border: "1px solid #e5e7eb",
            borderRadius: 16,
            padding: 32,
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 24,
          }} className="features-grid">
            {modules[activeModule].features.map((feature, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: modules[activeModule].color, fontSize: 18 }}>✓</span>
                <span style={{ fontSize: 14 }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Widget & Email Preview Section */}
      <section id="widgets" className="section-padding" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Fully customizable</div>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              Widgets That Match Your Brand
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563" }}>
              Customize colors, text, and style to blend seamlessly with your store
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }} className="modules-grid">
            {/* Storefront Widget Preview */}
            <div className="animate-fadeInLeft" style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
            }}>
              {/* Browser Chrome */}
              <div style={{
                background: "#f3f4f6",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                borderBottom: "1px solid #e5e7eb",
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 12, height: 12, background: "#ef4444", borderRadius: "50%" }}></div>
                  <div style={{ width: 12, height: 12, background: "#f59e0b", borderRadius: "50%" }}></div>
                  <div style={{ width: 12, height: 12, background: "#10b981", borderRadius: "50%" }}></div>
                </div>
                <div style={{
                  flex: 1,
                  background: "white",
                  borderRadius: 6,
                  padding: "6px 12px",
                  fontSize: 12,
                  color: "#6b7280",
                  marginLeft: 12,
                }}>
                  yourstore.myshopify.com/products/classic-tee
                </div>
              </div>

              {/* Product Page Mockup */}
              <div style={{ padding: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  {/* Product Image */}
                  <div style={{
                    background: "linear-gradient(135deg, #f8f9fa, #e5e7eb)",
                    borderRadius: 12,
                    aspectRatio: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <div style={{ fontSize: 48 }}>👕</div>
                  </div>

                  {/* Product Info */}
                  <div>
                    <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>YOUR BRAND</div>
                    <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Classic White Tee</h3>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>$49.00</div>

                    {/* Size Selector */}
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ fontSize: 13, marginBottom: 8 }}>Size: <strong>Medium</strong></div>
                      <div style={{ display: "flex", gap: 8 }}>
                        {["XS", "S", "M", "L", "XL"].map((size, i) => (
                          <div key={i} style={{
                            width: 36,
                            height: 36,
                            border: i === 2 ? "2px solid #1a1a2e" : "1px solid #e5e7eb",
                            borderRadius: 6,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: i === 2 ? 600 : 400,
                          }}>{size}</div>
                        ))}
                      </div>
                    </div>

                    {/* Out of Stock Badge */}
                    <div style={{
                      background: "#fef2f2",
                      color: "#dc2626",
                      padding: "8px 16px",
                      borderRadius: 8,
                      fontSize: 14,
                      fontWeight: 600,
                      marginBottom: 16,
                      textAlign: "center",
                    }}>
                      Out of Stock
                    </div>

                    {/* KALRT Widget - Interactive Demo */}
                    <div className={demoStatus === "idle" ? "animate-glow" : ""} style={{
                      background: demoStatus === "success" ? "#f0fdf4" : "#f8f9fa",
                      border: `2px solid ${demoStatus === "success" ? "#10b981" : "#ff6b4a"}`,
                      borderRadius: 12,
                      padding: 16,
                      transition: "all 0.3s ease",
                    }}>
                      {demoStatus === "success" ? (
                        // Success State
                        <div style={{ textAlign: "center" }}>
                          <div style={{
                            width: 48,
                            height: 48,
                            background: "#10b981",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            margin: "0 auto 12px",
                            animation: "pulse 0.5s ease-out",
                          }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                          <div style={{ fontSize: 16, fontWeight: 700, color: "#10b981", marginBottom: 4 }}>
                            You're on the list!
                          </div>
                          <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 12 }}>
                            We'll email you when it's back
                          </div>
                          <button
                            onClick={resetDemo}
                            style={{
                              background: "none",
                              border: "1px solid #e5e7eb",
                              borderRadius: 6,
                              padding: "8px 16px",
                              fontSize: 12,
                              color: "#6b7280",
                              cursor: "pointer",
                            }}
                          >
                            Try again
                          </button>
                        </div>
                      ) : (
                        // Input State
                        <>
                          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, textAlign: "center" }}>
                            👋 Try it! Enter your email
                          </div>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            value={demoEmail}
                            onChange={(e) => setDemoEmail(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleDemoSubmit()}
                            disabled={demoStatus === "submitting"}
                            style={{
                              width: "100%",
                              padding: "12px 14px",
                              border: "1px solid #e5e7eb",
                              borderRadius: 8,
                              marginBottom: 10,
                              fontSize: 14,
                              boxSizing: "border-box",
                              opacity: demoStatus === "submitting" ? 0.7 : 1,
                            }}
                          />
                          <button
                            onClick={handleDemoSubmit}
                            disabled={demoStatus === "submitting" || !demoEmail.includes("@")}
                            style={{
                              width: "100%",
                              padding: "12px",
                              background: demoStatus === "submitting"
                                ? "#ccc"
                                : "linear-gradient(135deg, #ff6b4a, #ff8a6a)",
                              color: "white",
                              border: "none",
                              borderRadius: 8,
                              fontWeight: 600,
                              fontSize: 14,
                              cursor: demoStatus === "submitting" ? "wait" : "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 8,
                            }}
                          >
                            {demoStatus === "submitting" ? (
                              <>
                                <div style={{
                                  width: 16,
                                  height: 16,
                                  border: "2px solid white",
                                  borderTopColor: "transparent",
                                  borderRadius: "50%",
                                  animation: "spin 0.8s linear infinite",
                                }} />
                                Signing up...
                              </>
                            ) : (
                              "Notify Me"
                            )}
                          </button>
                          <div style={{ fontSize: 11, color: "#6b7280", textAlign: "center", marginTop: 8 }}>
                            Powered by KALRT • This is a live demo
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Preview */}
            <div className="animate-fadeInRight" style={{
              background: "white",
              border: "1px solid #e5e7eb",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
            }}>
              {/* Email Header */}
              <div style={{
                background: "#f8f9fa",
                padding: "16px 20px",
                borderBottom: "1px solid #e5e7eb",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 40,
                    height: 40,
                    background: "linear-gradient(135deg, #ff6b4a, #ff8a6a)",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontWeight: 700,
                  }}>YB</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Your Brand</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>noreply@yourbrand.com</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, fontSize: 16, fontWeight: 600 }}>
                  🎉 Great news! Classic White Tee is back in stock
                </div>
              </div>

              {/* Email Body */}
              <div style={{ padding: 24 }}>
                <div style={{ fontSize: 15, color: "#4b5563", marginBottom: 20, lineHeight: 1.6 }}>
                  Hi Sarah,<br /><br />
                  The item you've been waiting for is finally back! Don't miss out - grab it before it sells out again.
                </div>

                {/* Product Card */}
                <div style={{
                  background: "#f8f9fa",
                  borderRadius: 12,
                  padding: 16,
                  display: "flex",
                  gap: 16,
                  marginBottom: 20,
                }}>
                  <div style={{
                    width: 80,
                    height: 80,
                    background: "#e5e7eb",
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                  }}>👕</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>Classic White Tee</div>
                    <div style={{ fontSize: 14, color: "#6b7280", marginBottom: 4 }}>Size: Medium</div>
                    <div style={{ fontWeight: 700, color: "#10b981" }}>$49.00 - In Stock!</div>
                  </div>
                </div>

                <button className="hover-scale" style={{
                  width: "100%",
                  padding: "16px",
                  background: "linear-gradient(135deg, #ff6b4a, #ff8a6a)",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: "pointer",
                  marginBottom: 16,
                }}>
                  Shop Now →
                </button>

                <div style={{ fontSize: 12, color: "#9ca3af", textAlign: "center" }}>
                  Free shipping on orders over $75
                </div>
              </div>
            </div>
          </div>

          {/* Customization Options */}
          <div style={{
            marginTop: 60,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }} className="features-grid">
            {[
              { icon: "🎨", title: "Custom Colors", desc: "Match your brand palette" },
              { icon: "✏️", title: "Edit Text", desc: "Your voice, your message" },
              { icon: "📱", title: "Mobile Optimized", desc: "Perfect on every device" },
              { icon: "🌐", title: "Multi-Language", desc: "12+ languages supported" },
            ].map((item, i) => (
              <div key={i} className="card hover-lift" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <h4 style={{ fontWeight: 600, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: "#6b7280" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="integrations" className="section-padding section-gray" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div className="scroll-reveal">
            <div className="badge" style={{ marginBottom: 16 }}>All integrations free</div>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              Works With Your Stack
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563", marginBottom: 50 }}>
              Free integrations with 20+ tools - no extra fees, no upsells
            </p>
          </div>

          <div className="integration-grid scroll-reveal-scale" style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 16,
          }}>
            {integrations.map((int, i) => (
              <div key={i} style={{
                background: "#f8f9fa",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 10,
                position: "relative",
              }}>
                {int.popular && (
                  <span style={{
                    position: "absolute",
                    top: -8,
                    right: -8,
                    background: "#10b981",
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: 50,
                    fontSize: 10,
                    fontWeight: 600,
                  }}>Popular</span>
                )}
                <div style={{
                  width: 48,
                  height: 48,
                  background: `linear-gradient(135deg, ${int.color}, ${int.color}dd)`,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  boxShadow: `0 4px 12px ${int.color}33`,
                }}>
                  {int.icon}
                </div>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{int.name}</span>
              </div>
            ))}
          </div>

          <p style={{ marginTop: 30, color: "#6b7280", fontSize: 14 }}>
            Competitors charge $15-20/month extra for Klaviyo. We include it free.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section id="comparison" className="section-gray section-padding" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              KALRT vs The Competition
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563" }}>
              See why 5,000+ stores switched to KALRT
            </p>
          </div>

          <div className="card scroll-reveal" style={{ overflow: "hidden", padding: 0 }}>
            <div className="comparison-grid" style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              background: "#f8f9fa",
              borderBottom: "1px solid #e5e7eb",
            }}>
              <div style={{ padding: 20, fontWeight: 600 }}>Feature</div>
              <div style={{ padding: 20, textAlign: "center" }}>
                <div style={{ fontWeight: 700, color: "#ff6b4a" }}>KALRT</div>
                <div style={{ fontSize: 11, color: "#10b981" }}>RECOMMENDED</div>
              </div>
              <div style={{ padding: 20, textAlign: "center", fontWeight: 600, color: "#9ca3af" }}>Others</div>
            </div>
            {comparisonData.map((row, i) => (
              <div key={i} className="comparison-grid" style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                borderBottom: i < comparisonData.length - 1 ? "1px solid #e5e7eb" : "none",
              }}>
                <div style={{ padding: 16, paddingLeft: 20 }}>{row.feature}</div>
                <div style={{ padding: 16, textAlign: "center", color: "#10b981", fontWeight: 600 }}>{row.kalrt}</div>
                <div style={{ padding: 16, textAlign: "center", color: "#9ca3af" }}>{row.competitor}</div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 30,
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 14, color: "#059669", marginBottom: 8 }}>Average annual savings vs competitors</div>
            <div style={{ fontSize: 40, fontWeight: 800, color: "#059669" }}>$2,400/year</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="badge" style={{ marginBottom: 16 }}>Customer Success Stories</div>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              Real Results From Real Stores
            </h2>
          </div>

          {/* Featured Testimonial */}
          <div className="card scroll-reveal-scale" style={{ marginBottom: 40, textAlign: "center", maxWidth: 800, margin: "0 auto 40px" }}>
            <div style={{ fontSize: 24, marginBottom: 20 }}>⭐⭐⭐⭐⭐</div>
            <p style={{ fontSize: 22, lineHeight: 1.6, marginBottom: 24, color: "#1a1a2e" }}>
              "{testimonials[currentTestimonial].quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
              <div style={{
                width: 56,
                height: 56,
                background: testimonials[currentTestimonial].avatarBg,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                color: "white",
                fontSize: 18,
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              }}>{testimonials[currentTestimonial].avatar}</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600 }}>{testimonials[currentTestimonial].author}</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>
                  {testimonials[currentTestimonial].role}, {testimonials[currentTestimonial].company}
                </div>
              </div>
              <div style={{ marginLeft: 24, display: "flex", gap: 12 }}>
                <div style={{
                  background: "#ecfdf5",
                  color: "#059669",
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                }}>{testimonials[currentTestimonial].metric}</div>
                <div style={{
                  background: "#f3f4f6",
                  color: "#6b7280",
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                }}>{testimonials[currentTestimonial].duration}</div>
                <div style={{
                  background: "#f3f4f6",
                  color: "#6b7280",
                  padding: "6px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                }}>{testimonials[currentTestimonial].location}</div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    border: "none",
                    background: currentTestimonial === i ? "#ff6b4a" : "#e5e7eb",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost of Inaction - Psychological Trigger Section */}
      <section style={{ padding: "80px 24px", background: "linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="badge" style={{ background: "rgba(239,68,68,0.2)", color: "#ef4444", marginBottom: 16 }}>
              The hard truth
            </div>
            <h2 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16, color: "white" }}>
              Every "Sold Out" Costs You Real Money
            </h2>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.7)", maxWidth: 700, margin: "0 auto" }}>
              Without back-in-stock alerts, 95% of customers who see "Sold Out" never return. Here's what that means for your store.
            </p>
          </div>

          {/* Loss Calculator Visual */}
          <div className="scroll-reveal-scale" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
            alignItems: "center",
          }}>
            {/* Left: Without KALRT */}
            <div style={{
              background: "rgba(239,68,68,0.1)",
              border: "2px solid rgba(239,68,68,0.3)",
              borderRadius: 16,
              padding: 32,
            }}>
              <div style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1, color: "#ef4444", marginBottom: 16 }}>
                ❌ Without KALRT
              </div>
              <div style={{ color: "white" }}>
                <div style={{ fontSize: 18, marginBottom: 12 }}>
                  Customer sees <span style={{ fontWeight: 700 }}>"Sold Out"</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>→</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>Leaves your store</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>→</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>Forgets about you</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>→</span>
                  <span style={{ color: "#ef4444", fontWeight: 600 }}>Buys from competitor</span>
                </div>
                <div style={{ marginTop: 24, padding: 16, background: "rgba(0,0,0,0.3)", borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Lost per month</div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#ef4444" }}>-$2,340</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>based on avg 78 lost sales × $30 AOV</div>
                </div>
              </div>
            </div>

            {/* Right: With KALRT */}
            <div style={{
              background: "rgba(16,185,129,0.1)",
              border: "2px solid rgba(16,185,129,0.3)",
              borderRadius: 16,
              padding: 32,
            }}>
              <div style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1, color: "#10b981", marginBottom: 16 }}>
                ✓ With KALRT
              </div>
              <div style={{ color: "white" }}>
                <div style={{ fontSize: 18, marginBottom: 12 }}>
                  Customer sees <span style={{ fontWeight: 700 }}>"Notify Me"</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>→</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>Signs up in 5 seconds</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 24 }}>→</span>
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>Gets alert &lt;60 seconds after restock</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 24 }}>→</span>
                  <span style={{ color: "#10b981", fontWeight: 600 }}>23% complete purchase</span>
                </div>
                <div style={{ marginTop: 24, padding: 16, background: "rgba(0,0,0,0.3)", borderRadius: 8, textAlign: "center" }}>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}>Recovered per month</div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: "#10b981" }}>+$538</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>avg recovered from back-in-stock alerts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Urgency Stats Row */}
          <div className="scroll-reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            marginTop: 50,
          }}>
            {[
              { stat: "95%", label: "of visitors never return after seeing 'Sold Out'" },
              { stat: "72%", label: "will buy from a competitor within 24 hours" },
              { stat: "$50B", label: "lost annually by retailers due to stockouts" },
              { stat: "3x", label: "higher intent to buy vs cold traffic" },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "#ff6b4a", marginBottom: 8 }}>{item.stat}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>{item.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="scroll-reveal" style={{ textAlign: "center", marginTop: 50 }}>
            <a href="#pricing" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 32px",
              background: "linear-gradient(135deg, #ff6b4a 0%, #ff5733 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              boxShadow: "0 4px 20px rgba(255,107,74,0.4)",
            }}>
              Stop Losing Sales Today
              <span style={{ fontSize: 20 }}>→</span>
            </a>
            <div style={{ marginTop: 12, fontSize: 14, color: "rgba(255,255,255,0.5)" }}>
              5-minute setup • No credit card required • Free plan available
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="section-gray section-padding" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 50 }}>
            <div className="badge" style={{ marginBottom: 16 }}>14-day free trial on all plans</div>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              Simple, Honest Pricing
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563" }}>
              No hidden fees. No surprise charges. Cancel anytime.
            </p>
          </div>

          <div className="pricing-grid scroll-reveal" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}>
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                description: "Try before you buy",
                features: ["50 notifications/mo", "Email alerts", "Basic widget", "Shopify integration"],
                cta: "Install Free",
                highlighted: false,
              },
              {
                name: "Starter",
                price: "$9",
                period: "/month",
                description: "For growing stores",
                features: ["500 notifications/mo", "Email + SMS", "All integrations FREE", "PreOrder + Wishlist", "Remove branding", "Email support"],
                cta: "Start Trial",
                highlighted: false,
              },
              {
                name: "Growth",
                price: "$29",
                period: "/month",
                description: "Most popular",
                features: ["2,500 notifications/mo", "All channels", "Low Stock FOMO", "Priority support", "API access", "Advanced analytics", "Multi-language"],
                cta: "Start Trial",
                highlighted: true,
              },
              {
                name: "Scale",
                price: "$79",
                period: "/month",
                description: "High volume",
                features: ["10,000 notifications/mo", "Everything unlimited", "Dedicated manager", "Custom integrations", "Phone support", "99.9% SLA"],
                cta: "Contact Sales",
                highlighted: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className="card"
                style={{
                  background: plan.highlighted ? "linear-gradient(180deg, #fff7ed 0%, #ffffff 100%)" : "white",
                  border: plan.highlighted ? "2px solid #ff6b4a" : "1px solid #e5e7eb",
                  position: "relative",
                }}
              >
                {plan.highlighted && (
                  <div style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: "#ff6b4a",
                    color: "white",
                    padding: "4px 16px",
                    borderRadius: 50,
                    fontSize: 12,
                    fontWeight: 600,
                  }}>BEST VALUE</div>
                )}
                <div style={{ color: "#6b7280", fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
                  {plan.name}
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontSize: 36, fontWeight: 800 }}>{plan.price}</span>
                  <span style={{ color: "#6b7280" }}>{plan.period}</span>
                </div>
                <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 24 }}>{plan.description}</div>
                <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 10,
                      fontSize: 14,
                    }}>
                      <span style={{ color: "#10b981" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.name === "Free" ? "https://apps.shopify.com" : "/app"}
                  className={plan.highlighted ? "btn-primary" : "btn-secondary"}
                  style={{ width: "100%", justifyContent: "center", textAlign: "center" }}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO-Rich Feature Deep Dive */}
      <section style={{ padding: "80px 24px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontSize: 42, fontWeight: 700, marginBottom: 16 }}>
              The Complete Back-in-Stock Solution for Shopify
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563", maxWidth: 700, margin: "0 auto" }}>
              KALRT combines everything you need to capture lost sales and turn out-of-stock products into revenue opportunities.
            </p>
          </div>

          {/* Feature 1: Back in Stock Notifications */}
          <div className="scroll-reveal" style={{ marginBottom: 60 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-block", padding: "6px 14px", background: "#fef3f2", color: "#dc2626", borderRadius: 20, fontSize: 14, fontWeight: 500, marginBottom: 16 }}>
                  Core Feature
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                  Instant Back-in-Stock Notifications
                </h3>
                <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: 20 }}>
                  When a product sells out, customers can sign up for restock alerts with a single click. The moment inventory updates in Shopify, KALRT automatically sends notifications via email or SMS — typically within 60 seconds. No manual work required.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Real-time Shopify webhook monitoring", "Email and SMS delivery channels", "Variant-level tracking (size, color, etc.)", "23% average conversion rate on alerts", "Unlimited subscribers on all plans"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontSize: 15, color: "#374151" }}>
                      <span style={{ color: "#10b981" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#f8fafc", borderRadius: 16, padding: 32, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 16 }}>How it works:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { step: "1", title: "Customer signs up", desc: "Enters email on your product page" },
                    { step: "2", title: "We monitor inventory", desc: "Real-time Shopify webhook tracking" },
                    { step: "3", title: "Product restocks", desc: "Any inventory added triggers alerts" },
                    { step: "4", title: "Notification sent", desc: "Email/SMS delivered in <60 seconds" },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#ff6b4a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 14, flexShrink: 0 }}>{item.step}</div>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 2 }}>{item.title}</div>
                        <div style={{ fontSize: 14, color: "#64748b" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feature 2: PreOrder */}
          <div className="scroll-reveal" style={{ marginBottom: 60 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div style={{ order: 2 }}>
                <div style={{ display: "inline-block", padding: "6px 14px", background: "#fef9c3", color: "#a16207", borderRadius: 20, fontSize: 14, fontWeight: 500, marginBottom: 16 }}>
                  Included Free
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                  PreOrder Management
                </h3>
                <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: 20 }}>
                  Don't just capture interest — capture revenue. Let customers pre-order out-of-stock items with full payment or deposits. Perfect for product launches, limited editions, or managing demand for popular items.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Full payment or deposit options", "Automatic fulfillment when stock arrives", "Estimated shipping date display", "Order management dashboard", "No transaction fees"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontSize: 15, color: "#374151" }}>
                      <span style={{ color: "#10b981" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ order: 1, background: "#fefce8", borderRadius: 16, padding: 32, border: "1px solid #fef08a" }}>
                <div style={{ fontSize: 14, color: "#a16207", marginBottom: 16 }}>PreOrder vs Back-in-Stock:</div>
                <div style={{ background: "white", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 13, fontWeight: 600, borderBottom: "1px solid #fef08a" }}>
                    <div style={{ padding: 12, background: "#fef3c7" }}>Back-in-Stock</div>
                    <div style={{ padding: 12, background: "#ecfccb" }}>PreOrder</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 13 }}>
                    <div style={{ padding: 12, borderBottom: "1px solid #f3f4f6" }}>Captures email</div>
                    <div style={{ padding: 12, borderBottom: "1px solid #f3f4f6" }}>Captures payment</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 13 }}>
                    <div style={{ padding: 12, borderBottom: "1px solid #f3f4f6" }}>Free to customer</div>
                    <div style={{ padding: 12, borderBottom: "1px solid #f3f4f6" }}>Commitment secured</div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", fontSize: 13 }}>
                    <div style={{ padding: 12 }}>23% convert on restock</div>
                    <div style={{ padding: 12 }}>85%+ fulfill orders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Integrations */}
          <div className="scroll-reveal" style={{ marginBottom: 60 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
              <div>
                <div style={{ display: "inline-block", padding: "6px 14px", background: "#f0fdf4", color: "#16a34a", borderRadius: 20, fontSize: 14, fontWeight: 500, marginBottom: 16 }}>
                  No Extra Cost
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
                  Free Klaviyo & Email Marketing Integration
                </h3>
                <p style={{ fontSize: 16, color: "#4b5563", lineHeight: 1.7, marginBottom: 20 }}>
                  Unlike competitors who charge $15-20/month extra for Klaviyo, KALRT includes all integrations free. Sync subscribers directly to your email marketing platform, trigger custom flows, and maintain a single source of truth for customer data.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {["Klaviyo, Mailchimp, Omnisend", "Twilio, Postscript, Attentive for SMS", "Zapier for 3,000+ apps", "Gorgias for support tickets", "Custom webhooks for developers"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10, fontSize: 15, color: "#374151" }}>
                      <span style={{ color: "#10b981" }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "#f0fdf4", borderRadius: 16, padding: 32, border: "1px solid #bbf7d0" }}>
                <div style={{ fontSize: 14, color: "#16a34a", marginBottom: 16 }}>Competitor pricing for Klaviyo:</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {[
                    { name: "Notify Me!", price: "$19.99/mo", extra: true },
                    { name: "STOQ", price: "$15/mo", extra: true },
                    { name: "Appikon", price: "$20/mo", extra: true },
                    { name: "KALRT", price: "FREE", extra: false },
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: "white", borderRadius: 8, border: item.extra ? "1px solid #e5e7eb" : "2px solid #10b981" }}>
                      <span style={{ fontWeight: 500 }}>{item.name}</span>
                      <span style={{ fontWeight: 700, color: item.extra ? "#6b7280" : "#10b981" }}>{item.price}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, fontSize: 14, color: "#16a34a", fontWeight: 500, textAlign: "center" }}>
                  Save $240/year on integrations alone
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="scroll-reveal" style={{ textAlign: "center", marginTop: 60, padding: 40, background: "#f8fafc", borderRadius: 16 }}>
            <h3 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
              Ready to recover lost sales?
            </h3>
            <p style={{ color: "#4b5563", marginBottom: 24 }}>
              Join 5,000+ Shopify merchants already using KALRT
            </p>
            <a href="https://apps.shopify.com" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "#ff6b4a",
              color: "white",
              textDecoration: "none",
              borderRadius: 8,
              fontWeight: 600,
            }}>
              <svg width="20" height="23" viewBox="0 0 256 292" fill="currentColor">
                <path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644 0 118.85 0 71.701 0 48.748 58.871 41.946 88.723c-16.758 5.203-28.719 8.911-30.158 9.399-9.373 2.938-9.664 3.232-10.887 12.015C0 117.062 0 225.572 0 225.572l176.109 33.14 94.206-20.417s-46.341-179.508-46.54-180.955"/>
              </svg>
              Install Free on Shopify
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-padding" style={{ padding: "70px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="scroll-reveal" style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 18, color: "#4b5563" }}>
              Can't find your answer? <a href="#" style={{ color: "#ff6b4a" }}>Contact support</a>
            </p>
          </div>

          <div className="scroll-reveal" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: 20,
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#1a1a2e",
                  }}
                >
                  {faq.q}
                  <span style={{
                    transform: activeFaq === i ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                    color: "#9ca3af",
                  }}>▼</span>
                </button>
                {activeFaq === i && (
                  <div style={{
                    padding: "0 20px 20px",
                    color: "#4b5563",
                    lineHeight: 1.7,
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{
        padding: "70px 24px",
        background: "linear-gradient(135deg, #5c6ac4 0%, #4a58b5 100%)",
        color: "white",
        textAlign: "center",
      }}>
        <div className="scroll-reveal" style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.15)",
            padding: "8px 16px",
            borderRadius: 50,
            marginBottom: 24,
          }}>
            <svg width="20" height="20" viewBox="0 0 256 292" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644 0 118.85 0c-37.54 0-55.53 46.835-61.182 70.63-14.724 4.544-25.19 7.762-26.54 8.203-8.183 2.553-8.429 2.807-9.5 10.503C20.514 95.962 0 260.288 0 260.288l175.898 32.96 96.107-24.258S224.076 58.8 223.774 57.34z" fill="currentColor"/>
            </svg>
            <span style={{ fontWeight: 500 }}>Official Shopify Partner App</span>
          </div>
          <h2 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
            Ready to Recover Lost Sales?
          </h2>
          <p style={{ fontSize: 18, opacity: 0.9, marginBottom: 32 }}>
            Join 5,000+ Shopify stores using KALRT to turn "out of stock" into revenue
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="https://apps.shopify.com" target="_blank" rel="noopener noreferrer" style={{
              background: "white",
              color: "#5c6ac4",
              padding: "18px 36px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}>
              <svg width="22" height="22" viewBox="0 0 256 292" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M223.774 57.34c-.201-1.46-1.48-2.268-2.537-2.357-1.055-.088-23.383-1.743-23.383-1.743s-15.507-15.395-17.209-17.099c-1.703-1.703-5.029-1.185-6.32-.805-.19.056-3.388 1.043-8.678 2.68-5.18-14.906-14.322-28.604-30.405-28.604-.444 0-.901.018-1.358.044C129.31 3.407 123.644 0 118.85 0c-37.54 0-55.53 46.835-61.182 70.63-14.724 4.544-25.19 7.762-26.54 8.203-8.183 2.553-8.429 2.807-9.5 10.503C20.514 95.962 0 260.288 0 260.288l175.898 32.96 96.107-24.258S224.076 58.8 223.774 57.34zM156.9 40.848l-14.56 4.505c0-3.063-.064-6.143-.437-9.07l-9.96 1.86c2.035 6.618 3.004 14.053 3.004 21.672l-21.263 6.578c5.804-22.25 16.702-33.04 26.478-37.12 4.488 3.166 10.31 7.07 16.738 11.575zm-24.91-24.63c1.5 0 2.986.204 4.444.602-12.474 5.876-25.808 20.66-31.403 50.212l-16.806 5.196C96.307 48.296 108.819 16.218 131.99 16.218zm-8.996 113.017c.637 10.407 28.09 12.668 29.636 37.044 1.213 19.171-10.15 32.256-26.52 33.27-19.678 1.222-30.522-10.372-30.522-10.372l4.17-17.722s10.9 8.217 19.63 7.673c5.694-.355 7.738-4.99 7.538-8.258-0.83-13.573-23.18-12.77-24.612-35.076-1.2-18.77 11.14-37.79 38.357-39.51 10.51-.664 15.87 2.006 15.87 2.006l-6.21 23.212s-6.92-3.18-15.14-2.55c-12.02.926-12.126 8.324-12.026 10.24l.829.043z" fill="currentColor"/>
              </svg>
              Install Free on Shopify
            </a>
            <Link to="/app" style={{
              background: "transparent",
              color: "white",
              padding: "18px 36px",
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 16,
              textDecoration: "none",
              border: "2px solid rgba(255,255,255,0.3)",
            }}>
              Book a Demo
            </Link>
          </div>
          <p style={{ marginTop: 24, fontSize: 14, opacity: 0.7 }}>
            Free forever plan • No credit card required • 5-minute setup
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "60px 24px 30px", background: "#1a1a2e", color: "white" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="footer-grid" style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 40,
          }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  background: "linear-gradient(135deg, #ff6b4a, #ff8a6a)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 700,
                }}>K</div>
                <span style={{ fontWeight: 700, fontSize: 18 }}>KALRT</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.6, fontSize: 14, marginBottom: 16 }}>
                The #1 back-in-stock app for Shopify. Honest pricing, reliable notifications, zero BS.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{
                  background: "#5c6ac4",
                  padding: "4px 10px",
                  borderRadius: 4,
                  fontSize: 11,
                  fontWeight: 600,
                }}>SHOPIFY PARTNER</div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                support@kalrt.com
              </p>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Product</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="#features" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Features</a>
                <a href="#pricing" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Pricing</a>
                <a href="#integrations" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Integrations</a>
                <a href="#comparison" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Compare</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Resources</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <Link to="/app/help" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Help Center</Link>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>API Docs</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Status</a>
                <a href="#faq" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>FAQ</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Company</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>About</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Blog</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Careers</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Partners</a>
              </div>
            </div>

            <div>
              <h4 style={{ fontWeight: 600, marginBottom: 16, fontSize: 14 }}>Legal</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Privacy</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Terms</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>GDPR</a>
                <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: 14 }}>Security</a>
              </div>
            </div>
          </div>

          <div style={{
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
              © 2026 KALRT. All rights reserved.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>🌐 English</span>
              <a href="#" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>Twitter</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>LinkedIn</a>
              <a href="#" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, textDecoration: "none" }}>YouTube</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
