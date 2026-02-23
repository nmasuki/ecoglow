import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import "@/models/Category"; // Register schema for populate
import { WHATSAPP_URL, SITE_NAME } from "@/lib/constants";
import { IProduct } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await dbConnect();
  const { slug } = await params;
  const product = await Product.findOne({ slug, isActive: true })
    .populate("category")
    .lean();

  if (!product) return { title: "Product Not Found" };

  const p = product as unknown as IProduct;
  return {
    title: `${p.name}${p.subtitle ? ` - ${p.subtitle}` : ""}`,
    description: p.purpose,
    openGraph: {
      title: `${p.name} | ${SITE_NAME}`,
      description: p.purpose,
      images: p.images[0] ? [p.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await dbConnect();
  const { slug } = await params;
  const product = await Product.findOne({ slug, isActive: true })
    .populate("category")
    .lean();

  if (!product) notFound();

  const p = JSON.parse(JSON.stringify(product)) as IProduct;
  const whatsappMsg = encodeURIComponent(
    `Hello EcoGlow! I'd like to order ${p.name}${p.subtitle ? ` (${p.subtitle})` : ""}. Please share pricing and availability.`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-8">
        <Link href="/products" className="hover:text-brand-teal transition-colors">
          Products
        </Link>
        <span>/</span>
        {p.category && (
          <>
            <Link
              href={`/category/${p.category.slug}`}
              className="hover:text-brand-teal transition-colors"
            >
              {p.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground">{p.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {p.images.length > 0 ? (
            <>
              <div className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {p.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {p.images.slice(1).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden"
                    >
                      <Image
                        src={img}
                        alt={`${p.name} - view ${i + 2}`}
                        fill
                        className="object-contain"
                        sizes="20vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square bg-gradient-to-br from-brand-teal/10 to-brand-leaf/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg
                  width={80}
                  height={80}
                  viewBox="0 0 100 120"
                  fill="none"
                  className="mx-auto opacity-30 mb-3"
                >
                  <path
                    d="M50 8 C50 8, 15 55, 15 72 C15 92, 30 108, 50 108 C70 108, 85 92, 85 72 C85 55, 50 8, 50 8Z"
                    fill="#00897B"
                  />
                </svg>
                <p className="text-muted">Image coming soon</p>
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {p.category && (
            <span
              className="inline-block px-3 py-1 text-xs font-medium text-white rounded-full mb-4"
              style={{ backgroundColor: p.category.accentColor }}
            >
              {p.brandLine}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-2">
            {p.name}
          </h1>
          {p.subtitle && (
            <p className="text-lg text-muted mb-4">{p.subtitle}</p>
          )}
          <p className="text-sm text-muted mb-6">{p.size}</p>

          {/* Features */}
          {p.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {p.features.map((f) => (
                <span
                  key={f}
                  className="px-3 py-1.5 bg-brand-teal/10 text-brand-teal text-sm rounded-full font-medium"
                >
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* Purpose */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-brand-dark-green font-[family-name:var(--font-heading)] mb-2">
              Purpose
            </h2>
            <p className="text-foreground/80">{p.purpose}</p>
          </div>

          {/* How to Use */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-brand-dark-green font-[family-name:var(--font-heading)] mb-2">
              How to Use
            </h2>
            <p className="text-foreground/80">{p.howToUse}</p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`${WHATSAPP_URL}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#20BD5A] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Order via WhatsApp
            </a>
            <Link
              href="/contact"
              className="flex items-center justify-center px-6 py-3 border-2 border-brand-teal text-brand-teal font-semibold rounded-lg hover:bg-brand-teal hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
