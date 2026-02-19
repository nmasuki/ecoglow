import Link from "next/link";
import Image from "next/image";
import { SITE_TAGLINE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark-green via-brand-green to-brand-teal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-4">
              {SITE_TAGLINE}
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-lg">
              High-quality, eco-friendly cleaning and hygiene solutions for
              every home and business in Kenya.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3 bg-white text-brand-dark-green font-semibold rounded-lg hover:bg-white/90 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <Image
                src="/images/hero/products-composite.jpg"
                alt="EcoGlow product range"
                fill
                className="object-contain rounded-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
