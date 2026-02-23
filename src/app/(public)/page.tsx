import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import Product from "@/models/Product";
import Hero from "@/components/home/Hero";
import CategoryCards from "@/components/home/CategoryCards";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default async function HomePage() {
  await dbConnect();

  const categories = await Category.find().sort({ order: 1 }).lean();
  const featuredProducts = await Product.find({ isActive: true })
    .populate("category")
    .limit(6)
    .lean();

  const serializedCategories = JSON.parse(JSON.stringify(categories));
  const serializedProducts = JSON.parse(JSON.stringify(featuredProducts));

  return (
    <>
      <Hero />
      <CategoryCards categories={serializedCategories} />
      <FeaturedProducts products={serializedProducts} />
    </>
  );
}
