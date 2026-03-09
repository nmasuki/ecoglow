import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout() {
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/admin/auth/check")
      .then((r) => {
        if (!r.ok) navigate("/admin/login", { replace: true });
        else setChecked(true);
      })
      .catch(() => navigate("/admin/login", { replace: true }));
  }, [navigate]);

  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
