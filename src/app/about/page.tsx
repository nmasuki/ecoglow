import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about EcoGlow Soap Solutions - a leading Kenyan manufacturer of high-quality, eco-friendly cleaning and hygiene products.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-dark-green to-brand-teal text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-heading)] mb-4">
            About EcoGlow
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">{SITE_TAGLINE}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-6">
                Who We Are
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  EcoGlow Soap Solutions is a leading manufacturer of
                  high-quality cleaning and hygiene products based in Nairobi,
                  Kenya. We are dedicated to creating eco-friendly and effective
                  cleaning solutions that promote health, freshness, and
                  sustainability in every home and business.
                </p>
                <p>
                  Our product range spans four specialized lines — HomeCare for
                  kitchen and surface cleaning, SilkCare for gentle body and
                  hand care, FabriCare for fabric softening, and ProClean for
                  professional-grade bathroom and drainage solutions.
                </p>
                <p>
                  Every EcoGlow product is formulated with care, blending
                  effectiveness with gentleness to deliver a cleaning experience
                  that is powerful yet safe for your family and the environment.
                </p>
              </div>
            </div>
            <div className="relative aspect-square max-w-md mx-auto w-full">
              <Image
                src="/images/hero/products-composite.jpg"
                alt="EcoGlow product range"
                fill
                className="object-contain rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Eco-Friendly",
                description:
                  "We formulate products that are effective yet gentle on the environment, promoting sustainability in every drop.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Quality First",
                description:
                  "Every product undergoes rigorous quality checks to ensure it meets our high standards of effectiveness and safety.",
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
              },
              {
                title: "Made in Kenya",
                description:
                  "Proudly manufactured locally, supporting the Kenyan economy and ensuring our products are accessible to every home.",
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-xl border border-border"
              >
                <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-brand-teal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={value.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-muted mb-8">
            Browse our product range and discover why Kenyan homes and
            businesses trust EcoGlow for their cleaning needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-light transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border-2 border-brand-teal text-brand-teal font-semibold rounded-lg hover:bg-brand-teal hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
