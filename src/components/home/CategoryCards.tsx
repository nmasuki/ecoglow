import Link from "next/link";
import { ICategory } from "@/types";

const categoryIcons: Record<string, string> = {
  homecare: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  silkcare: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
  fabricare: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  proclean: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
};

export default function CategoryCards({
  categories,
}: {
  categories: ICategory[];
}) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-3">
            Our Product Lines
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            From sparkling kitchens to fresh laundry, we have the right solution
            for every cleaning need.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative p-6 rounded-xl border border-border bg-white hover:shadow-lg transition-all duration-200"
              style={{ borderTopColor: cat.accentColor, borderTopWidth: "3px" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: `${cat.accentColor}15` }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: cat.accentColor }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={categoryIcons[cat.slug] || categoryIcons.homecare}
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-brand-dark-green font-[family-name:var(--font-heading)] mb-2">
                {cat.name}
              </h3>
              <p className="text-sm text-muted">{cat.description}</p>
              <span
                className="mt-4 inline-flex items-center text-sm font-medium group-hover:gap-2 transition-all"
                style={{ color: cat.accentColor }}
              >
                View Products
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
