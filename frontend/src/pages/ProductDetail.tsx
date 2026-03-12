import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowLeft, Minus, Plus, Check } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import ProductCard from "@/components/product/ProductCard";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState<"primary" | "hover">(
    "primary"
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Product not found
        </h1>
        <p className="text-gray-500 mb-8">
          The card you're looking for doesn't exist or has been removed.
        </p>
        <Link
          to="/store"
          className="bg-gray-900 text-white px-8 py-3 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors uppercase tracking-widest"
        >
          Back to Store
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = [
    { key: "primary" as const, src: product.primaryImage, label: "Front" },
    { key: "hover" as const, src: product.hoverImage, label: "Scene" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-900 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex sm:flex-col gap-3">
              {images.map((img) => (
                <button
                  key={img.key}
                  onClick={() => setSelectedImage(img.key)}
                  className={`relative w-20 aspect-[4/5] rounded-md overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                    selectedImage === img.key
                      ? "border-gray-900"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <motion.div
              className="relative flex-1 aspect-[4/5] rounded-xl overflow-hidden bg-gray-100"
              layout
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={
                    selectedImage === "primary"
                      ? product.primaryImage
                      : product.hoverImage
                  }
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tighter text-gray-900 mb-4">
                {product.name}
              </h1>
              <p className="text-2xl font-light text-gray-900 mb-6">
                A${product.price.toFixed(2)}
              </p>

              <p className="text-gray-500 leading-relaxed mb-10">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-6 mb-8">
                <span className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Qty
                </span>
                <div className="flex items-center border border-gray-200 rounded-md">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-medium text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <motion.button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center space-x-3 py-4 rounded-md font-medium text-sm transition-all uppercase tracking-widest ${
                  added
                    ? "bg-green-700 text-white"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {added ? (
                    <motion.span
                      key="added"
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <Check className="h-4 w-4" />
                      <span>Added to Cart</span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      className="flex items-center space-x-2"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Details */}
              <div className="mt-10 pt-10 border-t border-gray-100 space-y-4 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Size</span>
                  <span>A5 (148 × 210 mm)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Material</span>
                  <span>350gsm premium matte card</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Envelope</span>
                  <span>Included, recycled kraft</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Shipping</span>
                  <span>Free on orders over A$50</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
            <div className="flex justify-between items-end mb-10">
              <h2 className="text-2xl font-semibold tracking-tighter text-gray-900">
                You may also like
              </h2>
              <Link
                to="/store"
                className="hidden sm:block text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider relative group"
              >
                View all
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gray-900 transition-all group-hover:w-full" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
