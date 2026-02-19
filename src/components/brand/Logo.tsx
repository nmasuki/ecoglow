import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dimensions = {
    sm: { svg: 32, text: "text-lg" },
    md: { svg: 40, text: "text-xl" },
    lg: { svg: 56, text: "text-3xl" },
  };

  const { svg, text } = dimensions[size];

  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg
        width={svg}
        height={svg}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Water droplet */}
        <path
          d="M50 8 C50 8, 15 55, 15 72 C15 92, 30 108, 50 108 C70 108, 85 92, 85 72 C85 55, 50 8, 50 8Z"
          fill="#00897B"
        />
        <path
          d="M50 16 C50 16, 22 57, 22 72 C22 88, 34 100, 50 100 C66 100, 78 88, 78 72 C78 57, 50 16, 50 16Z"
          fill="white"
        />
        {/* Light green leaf */}
        <path
          d="M50 45 C38 52, 32 65, 38 78 C44 91, 50 85, 50 85 C50 85, 42 75, 45 65 C48 55, 58 50, 50 45Z"
          fill="#4CAF50"
        />
        {/* Dark green leaf */}
        <path
          d="M50 55 C58 58, 65 68, 62 78 C59 88, 50 85, 50 85 C50 85, 56 78, 55 70 C54 62, 50 55, 50 55Z"
          fill="#2E7D32"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={`${text} font-bold text-brand-dark-green font-[family-name:var(--font-heading)] tracking-tight`}
        >
          EcoGlow
        </span>
        {size !== "sm" && (
          <span className="text-[0.55rem] tracking-[0.15em] text-brand-green uppercase font-medium">
            Solutions
          </span>
        )}
      </div>
    </Link>
  );
}
