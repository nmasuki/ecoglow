"use client";

import { useEffect, useState } from "react";

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  accentColor: string;
  order: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Category>>({});
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    const res = await fetch("/api/admin/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const startEdit = (cat: Category) => {
    setEditing(cat._id);
    setEditData({
      name: cat.name,
      description: cat.description,
      accentColor: cat.accentColor,
      order: cat.order,
    });
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditData({});
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    await fetch("/api/admin/categories", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: id, ...editData }),
    });
    setSaving(false);
    setEditing(null);
    fetchCategories();
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Categories</h1>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-gray-50">
              <th className="text-left px-4 py-3 font-medium text-muted">
                Order
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted">
                Name
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted">
                Description
              </th>
              <th className="text-left px-4 py-3 font-medium text-muted">
                Color
              </th>
              <th className="text-right px-4 py-3 font-medium text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr
                key={cat._id}
                className="border-b border-border last:border-0 hover:bg-gray-50"
              >
                {editing === cat._id ? (
                  <>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        value={editData.order ?? 0}
                        onChange={(e) =>
                          setEditData((d) => ({
                            ...d,
                            order: parseInt(e.target.value),
                          }))
                        }
                        className="w-16 px-2 py-1 border border-border rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={editData.name ?? ""}
                        onChange={(e) =>
                          setEditData((d) => ({ ...d, name: e.target.value }))
                        }
                        className="w-full px-2 py-1 border border-border rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        value={editData.description ?? ""}
                        onChange={(e) =>
                          setEditData((d) => ({
                            ...d,
                            description: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-1 border border-border rounded text-sm"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="color"
                        value={editData.accentColor ?? "#000000"}
                        onChange={(e) =>
                          setEditData((d) => ({
                            ...d,
                            accentColor: e.target.value,
                          }))
                        }
                        className="w-10 h-8 rounded border border-border cursor-pointer"
                      />
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => saveEdit(cat._id)}
                        disabled={saving}
                        className="text-brand-teal hover:underline"
                      >
                        {saving ? "Saving..." : "Save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-muted hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-3 text-muted">{cat.order}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {cat.name}
                    </td>
                    <td className="px-4 py-3 text-muted">{cat.description}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-border"
                          style={{ backgroundColor: cat.accentColor }}
                        />
                        <span className="text-xs text-muted">
                          {cat.accentColor}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => startEdit(cat)}
                        className="text-brand-teal hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
