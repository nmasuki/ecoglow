import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ProductGrid from "@/components/products/ProductGrid";
import { ICategory, IProduct } from "@/types";
import { SITE_NAME } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) return { title: "Category Not Found" };

  const cat = category as ICategory;
  return {
    title: cat.name,
    description: cat.description,
    openGraph: {
      title: `${cat.name} | ${SITE_NAME}`,
      description: cat.description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({ where: { slug } });

  if (!category) notFound();

  const cat = category as ICategory;
  const products = await prisma.product.findMany({
    where: { categoryId: category.id, isActive: true },
    include: { category: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <nav className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link
            href="/products"
            className="hover:text-brand-teal transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">{cat.name}</span>
        </nav>
        <div
          className="border-l-4 pl-4"
          style={{ borderColor: cat.accentColor }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-2">
            {cat.name}
          </h1>
          <p className="text-muted max-w-2xl">{cat.description}</p>
        </div>
      </div>

      <ProductGrid products={products as unknown as IProduct[]} />
    </div>
  );
}
