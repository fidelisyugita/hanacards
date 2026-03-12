"use client";

import { Link } from "react-router-dom";
import { ShoppingBag, Menu } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative h-12 w-32 md:h-14 md:w-36 transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/logo.jpeg"
                  alt="Hana Cards Logo"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              About
            </Link>
            <Link
              to="/store"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Store
            </Link>
            <Link
              to="/services"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Services
            </Link>
            <Link
              to="/packs"
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
            >
              Packs
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link
              to="/cart"
              className="relative text-gray-900 hover:text-gray-600 transition-colors flex items-center group"
            >
              <ShoppingBag className="h-5 w-5 stroke-[1.5]" />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gray-900 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                  {cartCount}
                </span>
              )}
            </Link>
            <button className="md:hidden text-gray-900">
              <Menu className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
