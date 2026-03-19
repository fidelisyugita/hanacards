import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { products as staticProducts } from "@/data/products";
import { apiFetch } from "@/lib/api";
import { Category } from "@/components/admin/CategoryModal";

export default function Store() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Category[]>("/categories")
      .then(data => setCategories(data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const displayedProducts = selectedCategory
    ? staticProducts.filter(p => p.category === selectedCategory)
    : staticProducts;

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter text-gray-900 mb-4">
            The Collection
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Discover our full range of minimalist greeting cards and
            thoughtfully curated bundles.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-4 py-8 mb-12 border-y border-gray-100">
          <button 
            className={`text-sm font-medium pb-1 px-2 transition-colors border-b-2 ${selectedCategory === null ? "text-gray-900 border-gray-900" : "text-gray-500 hover:text-gray-900 border-transparent"}`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {(categories.length > 0 ? categories.map(c => c.name) : ["Friendship", "Love", "Birthday", "Anniversary", "Thank You", "Congratulations", "Sympathy", "Packs"]).map(cat => (
            <button 
              key={cat} 
              className={`text-sm font-medium pb-1 px-2 transition-colors border-b-2 ${selectedCategory === cat ? "text-gray-900 border-gray-900" : "text-gray-500 hover:text-gray-900 border-transparent"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {displayedProducts.length > 0 ? (
            displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No products found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
