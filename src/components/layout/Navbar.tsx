"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/brand/Logo";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo size="sm" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/products"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/products"
                  ? "bg-brand-teal/10 text-brand-teal"
                  : "text-foreground/70 hover:text-brand-teal hover:bg-brand-teal/5"
              }`}
            >
              All Products
            </Link>
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-teal/10 text-brand-teal"
                      : "text-foreground/70 hover:text-brand-teal hover:bg-brand-teal/5"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/about"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/about"
                  ? "bg-brand-teal/10 text-brand-teal"
                  : "text-foreground/70 hover:text-brand-teal hover:bg-brand-teal/5"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 bg-brand-teal text-white rounded-lg text-sm font-medium hover:bg-brand-teal-light transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <div className="flex flex-col gap-1 pt-3">
              <Link
                href="/products"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/products"
                    ? "bg-brand-teal/10 text-brand-teal"
                    : "text-foreground/70 hover:bg-gray-50"
                }`}
              >
                All Products
              </Link>
              {NAV_LINKS.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-teal/10 text-brand-teal"
                        : "text-foreground/70 hover:bg-gray-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === "/about"
                    ? "bg-brand-teal/10 text-brand-teal"
                    : "text-foreground/70 hover:bg-gray-50"
                }`}
              >
                About
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 mx-4 px-5 py-3 bg-brand-teal text-white rounded-lg text-sm font-medium text-center hover:bg-brand-teal-light transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
