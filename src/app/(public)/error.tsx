"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-brand-dark-green mb-2 font-[family-name:var(--font-heading)]">
          Something went wrong
        </h2>
        <p className="text-muted mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2.5 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-light transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
