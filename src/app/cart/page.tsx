"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <ShoppingBag className="h-12 w-12 text-gray-300 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-500 text-center mb-8 max-w-sm">
          Looks like you haven&apos;t added any minimalist creations to your
          cart yet.
        </p>
        <Link
          href="/store"
          className="bg-gray-900 text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-[70vh]">
      <h1 className="text-3xl font-semibold tracking-tight text-gray-900 mb-10">
        Your Bag
      </h1>

      <div className="bg-white border text-gray-900 border-gray-100 rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm">
        {/* Cart Items */}
        <div className="w-full md:w-2/3 divide-y divide-gray-100">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="p-6 flex items-center space-x-6">
              <div className="relative h-32 w-24 flex-shrink-0 bg-gray-50 rounded-md overflow-hidden">
                <Image
                  src={product.primaryImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-grow flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 text-lg mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-gray-400 hover:text-gray-800 transition-colors p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center border border-gray-200 rounded-md">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-medium text-gray-900">
                    A${(product.price * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-8 border-t md:border-t-0 md:border-l border-gray-100 flex flex-col">
          <h2 className="text-lg font-medium text-gray-900 mb-6 border-b border-gray-200 pb-4">
            Order Summary
          </h2>

          <div className="space-y-4 mb-8 flex-grow">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>A${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax (GST included)</span>
              <span>A${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-semibold tracking-tight text-gray-900">
                A${getCartTotal().toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-gray-500 text-right">AUD</p>
          </div>

          <button className="w-full bg-gray-900 text-white py-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest shadow-md">
            Checkout
          </button>

          <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
            <span>Secure checkout powered by</span>
            <span className="font-semibold">Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
