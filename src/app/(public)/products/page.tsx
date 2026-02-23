import { Suspense } from "react";
import type { Metadata } from "next";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilter from "@/components/products/CategoryFilter";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our full range of eco-friendly cleaning products including dishwash, body wash, fabric softener, disinfectants, and more.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await dbConnect();

  const { category } = await searchParams;
  const categories = await Category.find().sort({ order: 1 }).lean();

  let query: Record<string, unknown> = { isActive: true };
  if (category) {
    const cat = await Category.findOne({ slug: category }).lean();
    if (cat) {
      query = { ...query, category: cat._id };
    }
  }

  const products = await Product.find(query).populate("category").lean();

  const serializedCategories = JSON.parse(JSON.stringify(categories));
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-3">
          Our Products
        </h1>
        <p className="text-muted max-w-2xl">
          Explore our complete range of high-quality, eco-friendly cleaning and
          hygiene products.
        </p>
      </div>
      <Suspense fallback={<div className="h-12" />}>
        <CategoryFilter categories={serializedCategories} />
      </Suspense>
      <ProductGrid products={serializedProducts} />
    </div>
  );
}
