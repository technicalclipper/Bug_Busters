'use client';

import Link from 'next/link';
import { GiPistolGun } from 'react-icons/gi'; 
import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <GiPistolGun className="text-purple-500 text-2xl" />
          <span className="text-lg font-bold text-gray-800">Bug_Busters</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-black transition-all">Home</Link>
          <Link href="/hunter_dash" className="hover:text-black transition-all">Dashboard</Link>
          <Link href="/ask_ai" className="hover:text-black transition-all">Ask AI</Link>
          <Link href="/bounty_page" className="hover:text-black transition-all">Bounty Upload</Link>
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

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl focus:outline-none">
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 px-4 text-gray-700 font-medium text-sm">
          <Link href="/" className="block hover:text-black">Home</Link>
          <Link href="/hunter_dash" className="block hover:text-black">Dashboard</Link>
          <Link href="/ask_ai" className="block hover:text-black">Ask AI</Link>
          <Link href="/bounty_page" className="block hover:text-black">Bounty Upload</Link>
          <Link
            href="/login"
            className="inline-block mt-2 bg-black text-white px-5 py-2 rounded-full font-semibold hover:bg-gray-800 transition"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}