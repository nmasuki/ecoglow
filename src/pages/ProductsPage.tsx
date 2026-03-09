import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilter from "@/components/products/CategoryFilter";
import { ICategory, IProduct } from "@/types";

export default function ProductsPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories").then(r => r.json()).then(setCategories);
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = category ? `/api/products?category=${category}` : "/api/products";
    fetch(url).then(r => r.json()).then(data => { setProducts(data); setLoading(false); });
  }, [category]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-heading mb-3">Our Products</h1>
        <p className="text-muted max-w-2xl">Explore our complete range of high-quality, eco-friendly cleaning and hygiene products.</p>
      </div>
      <CategoryFilter categories={categories} />
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal" />
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
