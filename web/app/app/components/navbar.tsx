'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-[20px] left-0 right-0 z-50">
      <div className="w-[85%] mx-auto bg-white/90 backdrop-blur-md px-6 py-4 shadow-lg border-b border-gray-300 rounded-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-800">Bug_Busters</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
            <Link href="/" className="flex items-center space-x-2 hover:text-black transition-all">
              <img src="/images/home.svg" alt="Home Icon" className="w-6 h-6" />
              <span className="text-base md:text-lg">Home</span>
            </Link>

            <Link href="/hunt" className="flex items-center space-x-2 hover:text-black transition-all">
              <img src="/images/dashboard.svg" alt="Dashboard Icon" className="w-7 h-7" />
              <span className="text-base md:text-lg">Hunt</span>
            </Link>

            <Link href="/ask_ai" className="flex items-center space-x-2 hover:text-black transition-all">
              <img src="/images/ai.svg" alt="Ask AI Icon" className="w-7 h-7" />
              <span className="text-base md:text-lg">Ask AI</span>
            </Link>

            <Link href="/bounty_page" className="flex items-center space-x-2 hover:text-black transition-all">
              <img src="/images/bug.svg" alt="Bug Icon" className="w-7 h-7" />
              <span className="text-base md:text-lg">Bounty Upload</span>
            </Link>
          </div>

          {/* Login Button */}
          <div className="hidden md:block">
            <Link
              href="/login"
              className="bg-black text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl focus:outline-none">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-3 px-4 text-gray-700 font-medium text-sm">
            <Link href="/" className="flex items-center space-x-2 hover:text-black">
              <img src="/images/home.svg" alt="Home Icon" className="w-5 h-5" />
              <span className="text-base">Home</span>
            </Link>

            <Link href="/hunter_dash" className="flex items-center space-x-2 hover:text-black">
              <img src="/images/dashboard.svg" alt="Dashboard Icon" className="w-5 h-5" />
              <span className="text-base">Dashboard</span>
            </Link>

            <Link href="/ask_ai" className="flex items-center space-x-2 hover:text-black">
              <img src="/images/ai.svg" alt="Ask AI Icon" className="w-5 h-5" />
              <span className="text-base">Ask AI</span>
            </Link>

            <Link href="/bounty_page" className="flex items-center space-x-2 hover:text-black">
              <img src="/images/bug.svg" alt="Bug Icon" className="w-5 h-5" />
              <span className="text-base">Bounty Upload</span>
            </Link>

            <Link
              href="/login"
              className="inline-block mt-2 bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
