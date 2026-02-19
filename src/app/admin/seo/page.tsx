"use client";

import { useEffect, useState, FormEvent } from "react";

export default function AdminSeoPage() {
  const [settings, setSettings] = useState({
    siteTitle: "",
    siteDescription: "",
    ogImage: "",
    metaKeywords: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((r) => r.json())
      .then((data) => {
        setSettings({
          siteTitle: data.siteTitle || "",
          siteDescription: data.siteDescription || "",
          ogImage: data.ogImage || "",
          metaKeywords: data.metaKeywords || "",
        });
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">SEO Settings</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="bg-white rounded-xl border border-border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Site Title
            </label>
            <input
              value={settings.siteTitle}
              onChange={(e) =>
                setSettings((s) => ({ ...s, siteTitle: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
              placeholder="EcoGlow Soap Solutions"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Site Description
            </label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) =>
                setSettings((s) => ({
                  ...s,
                  siteDescription: e.target.value,
                }))
              }
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
              placeholder="Description for search engines..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              OG Image URL
            </label>
            <input
              value={settings.ogImage}
              onChange={(e) =>
                setSettings((s) => ({ ...s, ogImage: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
              placeholder="/images/og-image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Meta Keywords
            </label>
            <input
              value={settings.metaKeywords}
              onChange={(e) =>
                setSettings((s) => ({ ...s, metaKeywords: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-lg border border-border focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none text-sm"
              placeholder="eco-friendly, cleaning products, kenya, soap"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-light transition-colors text-sm font-medium disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {saved && (
            <span className="text-sm text-green-600 font-medium">
              Settings saved!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
