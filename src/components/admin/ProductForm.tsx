"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
}

interface ProductData {
  name: string;
  slug: string;
  brandLine: string;
  subtitle: string;
  category: string;
  purpose: string;
  howToUse: string;
  features: string[];
  images: string[];
  size: string;
  isActive: boolean;
}

const emptyProduct: ProductData = {
  name: "",
  slug: "",
  brandLine: "",
  subtitle: "",
  category: "",
  purpose: "",
  howToUse: "",
  features: [],
  images: [],
  size: "5 Litres",
  isActive: true,
};

export default function ProductForm({
  productId,
}: {
  productId?: string;
}) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductData>(emptyProduct);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuresText, setFeaturesText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then(setCategories);

    if (productId) {
      fetch(`/api/admin/products/${productId}`)
        .then((r) => r.json())
        .then((data) => {
          setProduct({
            name: data.name || "",
            slug: data.slug || "",
            brandLine: data.brandLine || "",
            subtitle: data.subtitle || "",
            category: data.category?._id || data.category || "",
            purpose: data.purpose || "",
            howToUse: data.howToUse || "",
            features: data.features || [],
            images: data.images || [],
            size: data.size || "5 Litres",
            isActive: data.isActive ?? true,
          });
          setFeaturesText((data.features || []).join("\n"));
        });
    }
  }, [productId]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "name" && !productId) {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setProduct((prev) => ({ ...prev, images: [...prev.images, data.url] }));
      }
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...product,
      features: featuresText
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    try {
      const url = productId
        ? `/api/admin/products/${productId}`
        : "/api/admin/products";
      const method = productId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        setError(data.error || "Failed to save product.");
      }
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </p>
      )}

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              name="name"
              value={product.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              name="slug"
              value={product.slug}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Brand Line
            </label>
            <input
              name="brandLine"
              value={product.brandLine}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              name="subtitle"
              value={product.subtitle}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <input
              name="size"
              value={product.size}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={product.isActive}
              onChange={(e) =>
                setProduct((prev) => ({ ...prev, isActive: e.target.checked }))
              }
              className="rounded border-border text-brand-teal focus:ring-brand-teal"
            />
            Active (visible on site)
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Details</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Purpose</label>
          <textarea
            name="purpose"
            value={product.purpose}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">How to Use</label>
          <textarea
            name="howToUse"
            value={product.howToUse}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Features (one per line)
          </label>
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
            placeholder="Kills 99.9% of germs&#10;Pleasant fragrance&#10;Safe for all surfaces"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border p-6 space-y-4">
        <h2 className="font-semibold text-gray-900">Images</h2>

        <div className="flex flex-wrap gap-3">
          {product.images.map((img, i) => (
            <div key={i} className="relative group">
              <img
                src={img}
                alt=""
                className="w-24 h-24 rounded-lg object-cover border border-border"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                x
              </button>
            </div>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg cursor-pointer hover:bg-gray-50 text-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-light transition-colors text-sm font-medium disabled:opacity-50"
        >
          {saving ? "Saving..." : productId ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-6 py-2.5 border border-border rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
