"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      className="group relative flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100 rounded-lg mb-4 cursor-pointer"
      >
        {/* Primary Image */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Hover Image */}
        <img
          src={product.hoverImage}
          alt={`Alternate view of ${product.name}`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Add to cart overlay button */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-gray-900 flex items-center justify-center space-x-2 py-3 rounded-md font-medium text-sm hover:bg-white shadow-lg transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </Link>

      <div className="flex flex-col space-y-1">
        <div className="flex justify-between items-start">
          <Link to={`/product/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-sm font-medium text-gray-900">
            A${product.price.toFixed(2)}
          </span>
        </div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {product.category}
        </p>
      </div>
    </motion.div>
  );
}
