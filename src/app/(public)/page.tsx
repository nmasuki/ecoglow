import prisma from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { ICategory, IProduct } from "@/types";

export default async function HomePage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
  });
  const featuredProducts = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true },
    take: 6,
  });

  return (
    <>
      <Hero />
      <CategoryCards categories={categories as ICategory[]} />
      <FeaturedProducts products={featuredProducts as unknown as IProduct[]} />
    </>
  );
}
