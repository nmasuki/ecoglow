"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.error || "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <svg
            width={48}
            height={48}
            viewBox="0 0 100 120"
            fill="none"
            className="mx-auto mb-4"
          >
            <path
              d="M50 8 C50 8, 15 55, 15 72 C15 92, 30 108, 50 108 C70 108, 85 92, 85 72 C85 55, 50 8, 50 8Z"
              fill="#00897B"
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
          <h1 className="text-2xl font-bold text-brand-dark-green font-[family-name:var(--font-heading)]">
            Admin Login
          </h1>
          <p className="text-sm text-muted mt-1">EcoGlow Soap Solutions</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl border border-border p-6 space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1.5"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
              placeholder="admin"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
              placeholder="Enter password"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-brand-teal text-white font-semibold rounded-lg hover:bg-brand-teal-light transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
