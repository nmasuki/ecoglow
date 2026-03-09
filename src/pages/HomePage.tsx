import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE_TAGLINE, CATEGORY_COLORS } from "@/lib/constants";
import ProductCard from "@/components/products/ProductCard";
import { ICategory, IProduct } from "@/types";

const categoryIcons: Record<string, string> = {
  homecare: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  silkcare: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  fabricare: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  proclean: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
};

export default function HomePage() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [featured, setFeatured] = useState<IProduct[]>([]);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories);
    fetch("/api/products?featured=1&limit=6").then(r => r.json()).then(setFeatured);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark-green via-brand-green to-brand-teal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-4">
                {SITE_TAGLINE}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
                High-quality, eco-friendly cleaning and hygiene solutions for every home and business in Kenya.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="px-6 py-3 bg-white text-brand-dark-green font-semibold rounded-lg hover:bg-white/90 transition-colors">Browse Products</Link>
                <Link to="/contact" className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">Contact Us</Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <img src="/images/hero/products-composite.jpg" alt="EcoGlow product range" className="w-full h-full object-contain rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none"><path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" /></svg>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-heading mb-3">Our Product Lines</h2>
            <p className="text-muted max-w-2xl mx-auto">From sparkling kitchens to fresh laundry, we have the right solution for every cleaning need.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className="group relative p-6 rounded-xl border border-border bg-white hover:shadow-lg transition-all duration-200"
                style={{ borderTopColor: cat.accentColor, borderTopWidth: "3px" }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${cat.accentColor}15` }}>
                  <svg className="w-6 h-6" style={{ color: cat.accentColor }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={categoryIcons[cat.slug] || categoryIcons.homecare} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark-green font-heading mb-2">{cat.name}</h3>
                <p className="text-sm text-muted">{cat.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-medium group-hover:gap-2 transition-all" style={{ color: cat.accentColor }}>
                  View Products
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-heading mb-3">Featured Products</h2>
              <p className="text-muted max-w-xl">Discover our most popular cleaning and care products.</p>
            </div>
            <Link to="/products" className="hidden sm:inline-flex items-center gap-1 text-brand-teal font-medium hover:gap-2 transition-all">
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center gap-1 text-brand-teal font-medium">
              View All Products
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
