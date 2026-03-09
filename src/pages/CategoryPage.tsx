import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductGrid from "@/components/products/ProductGrid";
import { ICategory, IProduct } from "@/types";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(`/api/categories/${slug}`).then(r => r.ok ? r.json() : null),
      fetch(`/api/products?category=${slug}`).then(r => r.json()),
    ]).then(([cat, prods]) => {
      setCategory(cat);
      setProducts(prods);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal" /></div>;
  }

  if (!category) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-4xl font-bold text-brand-dark-green font-heading mb-3">Category Not Found</h1>
        <Link to="/products" className="px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-light transition-colors">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link to="/products" className="hover:text-brand-teal transition-colors">Products</Link>
          <span>/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>
        <div className="border-l-4 pl-4" style={{ borderColor: category.accentColor }}>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-heading mb-2">{category.name}</h1>
          <p className="text-muted max-w-2xl">{category.description}</p>
        </div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
