import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../lib/api";

type Tab = "profile" | "address" | "orders";

interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  product: { name: string; primaryImage: string };
}
interface Order {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export default function Account() {
  const { dbUser, refreshDbUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  // Profile Form State
  const [displayName, setDisplayName] = useState(dbUser?.displayName || "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");

  // Address Form State
  const [address, setAddress] = useState({
    name: dbUser?.address?.name || "",
    line1: dbUser?.address?.line1 || "",
    line2: dbUser?.address?.line2 || "",
    city: dbUser?.address?.city || "",
    state: dbUser?.address?.state || "",
    postalCode: dbUser?.address?.postalCode || "",
    country: dbUser?.address?.country || "Australia",
  });
  const [savingAddress, setSavingAddress] = useState(false);
  const [addressMessage, setAddressMessage] = useState("");

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (activeTab === "orders") {
      loadOrders();
    }
  }, [activeTab]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await apiFetch<Order[]>("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMessage("");
    try {
      await apiFetch("/me/profile", {
        method: "PUT",
        data: { displayName },
      });
      await refreshDbUser();
      setProfileMessage("Profile updated successfully.");
    } catch {
      setProfileMessage("Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingAddress(true);
    setAddressMessage("");
    try {
      await apiFetch("/me/address", {
        method: "PUT",
        data: address,
      });
      await refreshDbUser();
      setAddressMessage("Address saved successfully.");
    } catch {
      setAddressMessage("Failed to save address.");
    } finally {
      setSavingAddress(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-24 pb-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full">
        <header className="mb-12 flex justify-between items-end border-b border-gray-100 pb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tighter text-gray-900 mb-2">
              My Account
            </h1>
            <p className="text-gray-500 font-light">
              Welcome back, {dbUser?.displayName || "friend"}.
            </p>
          </div>
          <button
            onClick={logout}
            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider"
          >
            Log out
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Nav */}
          <nav className="flex md:flex-col gap-6 md:w-48 overflow-x-auto pb-4 md:pb-0">
            <button
              onClick={() => setActiveTab("profile")}
              className={`text-left text-sm font-medium transition-colors uppercase tracking-wider whitespace-nowrap ${
                activeTab === "profile" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("address")}
              className={`text-left text-sm font-medium transition-colors uppercase tracking-wider whitespace-nowrap ${
                activeTab === "address" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Saved Address
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`text-left text-sm font-medium transition-colors uppercase tracking-wider whitespace-nowrap ${
                activeTab === "orders" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Order History
            </button>
          </nav>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === "profile" && (
              <div className="max-w-md">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Profile</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      disabled
                      value={dbUser?.email || ""}
                      className="w-full px-4 py-3 border border-gray-100 bg-gray-50 rounded-md text-gray-500 sm:text-sm cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray-400">
                      Email cannot be changed online.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Display Name
                    </label>
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm transition-colors"
                    />
                  </div>

                  {profileMessage && (
                    <p className={`text-sm ${profileMessage.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
                      {profileMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="bg-gray-900 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest disabled:opacity-50"
                  >
                    {savingProfile ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "address" && (
              <div className="max-w-md">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Default Shipping</h2>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      required
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                    <input
                      required
                      value={address.line1}
                      onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc (optional)</label>
                    <input
                      value={address.line2}
                      onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State / Territory</label>
                      <input
                        required
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                      <input
                        required
                        value={address.postalCode}
                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <input
                        required
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                      />
                    </div>
                  </div>

                  {addressMessage && (
                    <p className={`text-sm pt-2 ${addressMessage.includes("Failed") ? "text-red-500" : "text-green-600"}`}>
                      {addressMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={savingAddress}
                    className="mt-4 bg-gray-900 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest disabled:opacity-50"
                  >
                    {savingAddress ? "Saving..." : "Save Address"}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order History</h2>
                {loadingOrders ? (
                  <p className="text-gray-500">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center whitespace-nowrap overflow-x-auto gap-8">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order Placed</p>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                            <p className="text-sm font-medium text-gray-900">A${order.total.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {order.status}
                            </span>
                          </div>
                          <div className="text-right flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Order ID</p>
                            <p className="text-sm font-medium text-gray-900 font-mono">#{order.id.slice(-8)}</p>
                          </div>
                        </div>
                        <div className="px-6 py-4">
                          <ul className="divide-y divide-gray-100">
                            {order.items.map((item) => (
                              <li key={item.id} className="py-4 flex gap-4">
                                <img
                                  src={item.product.primaryImage}
                                  alt={item.product.name}
                                  className="w-16 h-20 object-cover rounded bg-gray-100 shrink-0"
                                />
                                <div className="flex-1 min-w-0 flex justify-between items-start">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-900 truncate">
                                      {item.product.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 mt-1">Qty: {item.quantity}</p>
                                  </div>
                                  <p className="text-sm font-medium text-gray-900">
                                    A${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
