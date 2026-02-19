import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <svg
        width={80}
        height={80}
        viewBox="0 0 100 120"
        fill="none"
        className="mx-auto mb-6 opacity-20"
      >
        <path
          d="M50 8 C50 8, 15 55, 15 72 C15 92, 30 108, 50 108 C70 108, 85 92, 85 72 C85 55, 50 8, 50 8Z"
          fill="#00897B"
        />
      </svg>
      <h1 className="text-4xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-3">
        Page Not Found
      </h1>
      <p className="text-muted mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-light transition-colors"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 border-2 border-brand-teal text-brand-teal font-semibold rounded-lg hover:bg-brand-teal hover:text-white transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
