import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { Package, ShoppingCart, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col">
        <div className="p-6 flex-grow">
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

            
            <div className="pt-4 mt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-start space-x-3 px-4 py-3 rounded-md transition-colors text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
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
