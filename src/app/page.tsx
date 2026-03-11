import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-black/5 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center max-w-3xl px-4 sm:px-6 lg:px-8 mt-12">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tighter text-gray-900 mb-6 leading-tight">
            Meaningful connections.
            <br className="hidden sm:block" /> Less words.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-xl mx-auto font-light">
            Minimalist greeting cards designed in Melbourne for the moments that
            matter most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/store"
              className="bg-gray-900 text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-md text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors uppercase tracking-widest"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-tighter text-gray-900 mb-2">
                Curated selection
              </h2>
              <p className="text-gray-500 font-light">
                Our most loved pieces this season.
              </p>
            </div>
            <Link
              href="/store"
              className="hidden sm:block text-sm font-medium text-gray-900 hover:text-gray-500 transition-colors uppercase tracking-wider relative group"
            >
              View all
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gray-900 transition-all group-hover:w-full"></span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/store"
              className="inline-block bg-gray-900 text-white px-8 py-4 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="w-full py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-tight">
                Designed in Melbourne
              </h3>
              <p className="text-gray-500 text-sm font-light">
                Crafted locally with premium sustainable materials and minimal
                environmental impact.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-tight">
                Fast Shipping
              </h3>
              <p className="text-gray-500 text-sm font-light">
                Complimentary express shipping on all orders over A$50 within
                Australia.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3 tracking-tight">
                Meaningful Details
              </h3>
              <p className="text-gray-500 text-sm font-light">
                Every card features thoughtful typography and carefully
                considered negative space.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
