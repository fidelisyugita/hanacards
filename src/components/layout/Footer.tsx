"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold tracking-tighter text-gray-900 mb-4">
              hanacards.
            </h2>
            <p className="text-gray-500 text-sm mb-6 max-w-sm">
              Minimalist greeting cards and thoughtful tabletop scenes curated
              for meaningful connections in Melbourne.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="bg-gray-50 border border-gray-200 text-sm rounded-md px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-colors"
              />
              <button
                type="submit"
                className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                Join
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/store?category=friendship"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  Friendship
                </Link>
              </li>
              <li>
                <Link
                  href="/store?category=love"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  Love
                </Link>
              </li>
              <li>
                <Link
                  href="/store?category=birthday"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  Birthday
                </Link>
              </li>
              <li>
                <Link
                  href="/packs"
                  className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
                >
                  Packs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-500 text-sm">hello@hanacards.co</li>
              <li className="text-gray-500 text-sm">Melbourne, VIC</li>
              <li className="text-gray-500 text-sm">Australia</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} hanacards. All rights reserved.
            Prices in AUD.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-900 text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-gray-900 text-xs transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
