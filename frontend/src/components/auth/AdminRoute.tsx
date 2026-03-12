import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminRoute() {
  const { dbUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (dbUser?.role !== "ADMIN") {
    // Redirect unauthorized users to the home page (or a dedicated 403 page)
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
