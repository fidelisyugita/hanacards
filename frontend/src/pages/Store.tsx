import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function Store() {
  // In a real app we might filter by query params here (e.g., ?category=love)
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
          <button className="text-sm font-medium text-gray-900 border-b-2 border-gray-900 pb-1 px-2">
            All
          </button>
          {["Friendship", "Love", "Birthday", "Anniversary", "Thank You", "Congratulations", "Sympathy", "Packs"].map(cat => (
            <button key={cat} className="text-sm font-medium text-gray-500 hover:text-gray-900 border-b-2 border-transparent pb-1 px-2 transition-colors">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
