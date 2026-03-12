import { Outlet, Link, useLocation } from "react-router-dom";
import { Package, ShoppingCart } from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Admin Dashboard
          </h2>
          <nav className="space-y-2">
            <Link
              to="/admin/orders"
              className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
                location.pathname.includes("/admin/orders") || location.pathname === "/admin"
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link
              to="/admin/products"
              className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors text-sm font-medium ${
                location.pathname.includes("/admin/products")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden pt-8 pb-16 px-4 sm:px-8">
        <Outlet />
      </main>
    </div>
  );
}
