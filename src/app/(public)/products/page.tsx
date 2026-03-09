import { Suspense } from "react";
import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import ProductGrid from "@/components/products/ProductGrid";
import CategoryFilter from "@/components/products/CategoryFilter";
import { ICategory, IProduct } from "@/types";

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
  const { category } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });

  const where: { isActive: boolean; categoryId?: string } = { isActive: true };
  if (category) {
    const cat = await prisma.category.findUnique({
      where: { slug: category },
    });
    if (cat) where.categoryId = cat.id;
  }

  const products = await prisma.product.findMany({
    where,
    include: { category: true },
  });

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
        <CategoryFilter categories={categories as ICategory[]} />
      </Suspense>
      <ProductGrid products={products as unknown as IProduct[]} />
    </div>
  );
}
