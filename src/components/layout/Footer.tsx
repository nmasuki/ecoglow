import Link from "next/link";
import Logo from "@/components/brand/Logo";
import { CONTACT, NAV_LINKS, SITE_TAGLINE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-brand-dark-green text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                width={36}
                height={36}
                viewBox="0 0 100 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 8 C50 8, 15 55, 15 72 C15 92, 30 108, 50 108 C70 108, 85 92, 85 72 C85 55, 50 8, 50 8Z"
                  fill="#26A69A"
                />
                <path
                  d="M50 16 C50 16, 22 57, 22 72 C22 88, 34 100, 50 100 C66 100, 78 88, 78 72 C78 57, 50 16, 50 16Z"
                  fill="white"
                />
                <path
                  d="M50 45 C38 52, 32 65, 38 78 C44 91, 50 85, 50 85 C50 85, 42 75, 45 65 C48 55, 58 50, 50 45Z"
                  fill="#4CAF50"
                />
                <path
                  d="M50 55 C58 58, 65 68, 62 78 C59 88, 50 85, 50 85 C50 85, 56 78, 55 70 C54 62, 50 55, 50 55Z"
                  fill="#2E7D32"
                />
              </svg>
              <span className="text-xl font-bold font-[family-name:var(--font-heading)]">
                EcoGlow
              </span>
            </div>
            <p className="text-white/70 text-sm mb-2">{SITE_TAGLINE}</p>
            <p className="text-white/60 text-sm">
              High-quality, eco-friendly cleaning solutions made in Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 font-[family-name:var(--font-heading)]">
              Products
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/products"
                  className="text-white/70 text-sm hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 font-[family-name:var(--font-heading)]">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{CONTACT.phonePrimary} / {CONTACT.phoneSecondary}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>{CONTACT.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{CONTACT.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20 text-center text-sm text-white/50">
          &copy; {new Date().getFullYear()} EcoGlow Soap Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
