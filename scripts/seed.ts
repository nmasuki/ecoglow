import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../.env.local") });

const MONGODB_URI = process.env.MONGODB_URI!;

// Inline schemas to avoid module resolution issues with ts-node
const AdminUserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    accentColor: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brandLine: { type: String, required: true },
    subtitle: { type: String, default: "" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    purpose: { type: String, required: true },
    howToUse: { type: String, required: true },
    features: [{ type: String }],
    images: [{ type: String }],
    size: { type: String, default: "5 Litres" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const AdminUser = mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const categories = [
  {
    name: "Homecare",
    slug: "homecare",
    description:
      "Powerful cleaning solutions for your kitchen, floors, and every surface in your home.",
    accentColor: "#7CB342",
    order: 1,
  },
  {
    name: "Silkcare",
    slug: "silkcare",
    description:
      "Gentle, nourishing body care and hand hygiene products for silky smooth skin.",
    accentColor: "#0288D1",
    order: 2,
  },
  {
    name: "Fabricare",
    slug: "fabricare",
    description:
      "Keep your clothes soft, fresh, and easy to iron with our fabric care range.",
    accentColor: "#FF7043",
    order: 3,
  },
  {
    name: "Proclean",
    slug: "proclean",
    description:
      "Professional-grade bathroom and drainage cleaning and disinfection products.",
    accentColor: "#5C6BC0",
    order: 4,
  },
];

const products = [
  {
    name: "Multipurpose Liquid Soap",
    slug: "multipurpose-liquid-soap",
    brandLine: "HomeCare",
    subtitle: "Lemon Fresh Scent",
    categorySlug: "homecare",
    purpose:
      "Ideal for cleaning all surfaces including floors, kitchens, and bathrooms.",
    howToUse:
      "Dilute with water for general cleaning or use directly for tough stains.",
    features: ["All Surfaces", "Powerful on Stains", "Gentle on Hands"],
    images: [
      "/images/products/multipurpose-liquid-soap-bottle.jpg",
      "/images/products/multipurpose-liquid-soap.jpg",
    ],
    size: "5 Litres",
  },
  {
    name: "Dishwashing Liquid",
    slug: "dishwashing-liquid",
    brandLine: "HomeCare",
    subtitle: "Lemon Fresh",
    categorySlug: "homecare",
    purpose:
      "Cuts through grease and grime while being gentle on your hands.",
    howToUse:
      "Apply a small amount on sponge, lather, wash dishes, and rinse.",
    features: ["Cuts Grease & Grime", "Easy Rinse", "Gentle on Hands"],
    images: ["/images/products/dishwashing-liquid.jpg"],
    size: "5 Litres",
  },
  {
    name: "Hand Wash",
    slug: "hand-wash",
    brandLine: "SilkCare",
    subtitle: "Refreshing Fragrance",
    categorySlug: "silkcare",
    purpose:
      "Gentle on hands, removes dirt and bacteria while leaving a refreshing fragrance.",
    howToUse:
      "Apply a small amount on wet hands, lather, then rinse thoroughly.",
    features: ["Removes Dirt & Bacteria", "Refreshing Fragrance", "Gentle Formula"],
    images: ["/images/products/hand-wash.svg"],
    size: "5 Litres",
  },
  {
    name: "Body Wash - Ocean Breeze",
    slug: "body-wash-ocean-breeze",
    brandLine: "SilkCare",
    subtitle: "Ocean Breeze",
    categorySlug: "silkcare",
    purpose:
      "Mild and nourishing body cleanser that leaves skin soft and refreshed.",
    howToUse: "Apply directly on skin or sponge, lather, and rinse off.",
    features: ["Softens Skin", "Mild Fragrance", "Hydrating Formula"],
    images: ["/images/products/body-wash-ocean-breeze.jpg"],
    size: "5 Litres",
  },
  {
    name: "Body Wash - Premium Pearly",
    slug: "body-wash-premium-pearly",
    brandLine: "SilkCare",
    subtitle: "Premium Pearly",
    categorySlug: "silkcare",
    purpose:
      "Mild and nourishing body cleanser that leaves skin soft and refreshed.",
    howToUse: "Apply directly on skin or sponge, lather, and rinse off.",
    features: ["Softens Skin", "Long-Lasting Fragrance", "Hydrating Formula"],
    images: ["/images/products/body-wash-premium-pearly.jpg"],
    size: "5 Litres",
  },
  {
    name: "Fabric Softener",
    slug: "fabric-softener",
    brandLine: "FabriCare",
    subtitle: "Mild and Lasting Fragrance",
    categorySlug: "fabricare",
    purpose: "Keeps clothes soft, fresh, and easy to iron.",
    howToUse: "Add to the final rinse during laundry.",
    features: ["Mild and Lasting Fragrance", "Softens Clothes", "Easy to Iron"],
    images: ["/images/products/fabric-softener.jpg"],
    size: "5 Litres",
  },
  {
    name: "Toilet Cleaner",
    slug: "toilet-cleaner",
    brandLine: "ProClean",
    subtitle: "Disinfectant Cleaner",
    categorySlug: "proclean",
    purpose:
      "Clears stains, brightens your toilet, and leaves a refreshing fragrance.",
    howToUse:
      "Apply inside the toilet bowl, scrub with a brush, and flush.",
    features: ["Clears Stains", "Brightens Toilet", "Refreshing Fragrance"],
    images: [
      "/images/products/toilet-cleaner-bottle.jpg",
      "/images/products/toilet-cleaner.jpg",
    ],
    size: "5 Litres",
  },
  {
    name: "Disinfectant",
    slug: "disinfectant",
    brandLine: "ProClean",
    subtitle: "Lavender",
    categorySlug: "proclean",
    purpose:
      "Kills germs and leaves your bathroom and floors fresh and clean.",
    howToUse: "Add to your bathroom cleaning water.",
    features: ["Kills Germs", "Toilet and Drainage", "Clears Odors Immediately"],
    images: ["/images/products/disinfectant-lavender.jpg"],
    size: "5 Litres",
  },
  {
    name: "Bleach",
    slug: "bleach",
    brandLine: "ProClean",
    subtitle: "Disinfectant Cleaner",
    categorySlug: "proclean",
    purpose: "Whitens surfaces and fabrics while disinfecting.",
    howToUse: "Dilute with water for cleaning or whitening use.",
    features: ["Removes Tough Stains", "Whitens Linens"],
    images: [
      "/images/products/bleach-bottle.jpg",
      "/images/products/bleach.jpg",
    ],
    size: "5 Litres",
  },
  {
    name: "Glass Cleaner",
    slug: "glass-cleaner",
    brandLine: "ProClean",
    subtitle: "",
    categorySlug: "proclean",
    purpose:
      "Removes hard water stains and soap scum from glass and mirrors.",
    howToUse: "Spray on surface and wipe with a clean dry cloth.",
    features: ["Removes Hard Water Stains", "Removes Soap Scum", "Streak-Free Shine"],
    images: [],
    size: "5 Litres",
  },
  {
    name: "Toilet Stain Remover",
    slug: "toilet-stain-remover",
    brandLine: "ProClean",
    subtitle: "",
    categorySlug: "proclean",
    purpose:
      "Powerful cleaner for removing stains and build-up inside toilets.",
    howToUse:
      "Apply on your cleaning sponge and clean directly on the stains. Avoid contact with tiles. Handle with care.",
    features: ["Removes Stains", "Removes Build-Up", "Powerful Formula"],
    images: [],
    size: "5 Litres",
  },
  {
    name: "Drainage Cleaner",
    slug: "drainage-cleaner",
    brandLine: "ProClean",
    subtitle: "",
    categorySlug: "proclean",
    purpose: "Used for unblocking drainages and toilets.",
    howToUse:
      "Add to water, mix, and pour into blocked drainages. Avoid contact with hands.",
    features: ["Unblocks Drainages", "Unblocks Toilets", "Fast Acting"],
    images: [],
    size: "5 Litres",
  },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  // Clear existing data
  await AdminUser.deleteMany({});
  await Category.deleteMany({});
  await Product.deleteMany({});
  console.log("Cleared existing data.");

  // Create default admin user
  const passwordHash = await bcrypt.hash("admin123", 12);
  await AdminUser.create({ username: "admin", passwordHash });
  console.log("Created admin user (admin / admin123).");

  // Insert categories
  const insertedCategories = await Category.insertMany(categories);
  const categoryMap = new Map(
    insertedCategories.map((c: { slug: string; _id: mongoose.Types.ObjectId }) => [c.slug, c._id])
  );
  console.log(`Inserted ${insertedCategories.length} categories.`);

  // Insert products with resolved category refs
  const productsWithRefs = products.map(({ categorySlug, ...rest }) => ({
    ...rest,
    category: categoryMap.get(categorySlug),
    isActive: true,
  }));

  const insertedProducts = await Product.insertMany(productsWithRefs);
  console.log(`Inserted ${insertedProducts.length} products.`);

  await mongoose.disconnect();
  console.log("Done! Database seeded successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
