"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ICategory } from "@/types";

export default function CategoryFilter({
  categories,
}: {
  categories: ICategory[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";

  const handleFilter = (slug: string) => {
    if (slug === "all") {
      router.push("/products");
    } else {
      router.push(`/products?category=${slug}`);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleFilter("all")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === "all"
            ? "bg-brand-teal text-white"
            : "bg-gray-100 text-foreground/70 hover:bg-gray-200"
        }`}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleFilter(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat.slug
              ? "text-white"
              : "bg-gray-100 text-foreground/70 hover:bg-gray-200"
          }`}
          style={
            activeCategory === cat.slug
              ? { backgroundColor: cat.accentColor }
              : undefined
          }
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
