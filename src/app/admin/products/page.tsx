"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  brandLine: string;
  category: { _id: string; name: string } | null;
  isActive: boolean;
  size: string;
  images: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleActive = async (id: string, isActive: boolean) => {
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    fetchProducts();
  };

  const deleteProduct = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-light transition-colors text-sm font-medium"
        >
          + Add Product
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-muted">
                Product
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted">
                Category
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted">
                Size
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted">
                Status
              </th>
              <th className="text-right px-4 py-3 font-medium text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-border last:border-0 hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-muted text-xs">
                        N/A
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-gray-900">
                        {product.name}
                      </p>
                      <p className="text-xs text-muted">{product.brandLine}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">
                  {product.category?.name || "—"}
                </td>
                <td className="px-4 py-3 text-muted">{product.size}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() =>
                      toggleActive(product._id, product.isActive)
                    }
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {product.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    className="text-brand-teal hover:underline mr-3"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product._id, product.name)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
