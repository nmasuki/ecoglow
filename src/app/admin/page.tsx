import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Category from "@/models/Category";
import ContactSubmission from "@/models/ContactSubmission";

export default async function AdminDashboard() {
  await dbConnect();

  const [productCount, categoryCount, unreadCount, totalContacts] =
    await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      ContactSubmission.countDocuments({ isRead: false }),
      ContactSubmission.countDocuments(),
    ]);

  const stats = [
    {
      label: "Products",
      value: productCount,
      href: "/admin/products",
      icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
      color: "bg-brand-teal",
    },
    {
      label: "Categories",
      value: categoryCount,
      href: "/admin/categories",
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      color: "bg-brand-leaf",
    },
    {
      label: "Unread Messages",
      value: unreadCount,
      href: "/admin/contacts",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      color: "bg-orange-500",
    },
    {
      label: "Total Messages",
      value: totalContacts,
      href: "/admin/contacts",
      icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4",
      color: "bg-brand-dark-green",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <a
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div
                className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={stat.icon}
                  />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
