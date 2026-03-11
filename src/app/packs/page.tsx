import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function Packs() {
  const packs = products.filter((p) => p.category === "Packs");

  return (
    <div className="flex flex-col min-h-[60vh] text-center px-4 max-w-7xl mx-auto py-16 w-full">
      <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 mb-6">
        Curated Packs
      </h1>
      <p className="text-gray-500 max-w-2xl mx-auto mb-16">
        Thoughtfully bundled selections for every season of life.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
        {packs.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
