'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-[20px] left-0 right-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="w-[85%] mx-auto bg-white/90 backdrop-blur-md px-8 py-6 shadow-1xl border-2 border-gray-500 rounded-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-gray-800">Bug_Busters</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12 text-lg font-bold text-gray-700">
            {[
              { href: '/', label: 'Home', icon: '/images/home.svg' },
              { href: '/hunt', label: 'Hunt', icon: '/images/bug-catcher.png' },
              { href: '/ask_ai', label: 'Ask AI', icon: '/images/ai.svg' },
              { href: '/bounty_page', label: 'Bounty Upload', icon: '/images/bug.svg' },
            ].map(({ href, label, icon }) => (
              <motion.div whileHover={{ scale: 1.05 }} key={href}>
                <Link href={href} className="flex items-center space-x-2 hover:text-black transition-all">
                  <img src={icon} alt={`${label} Icon`} className="w-7 h-7" />
                  <span className="text-xl">{label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Login Button */}
          <motion.div whileHover={{ scale: 1.05 }} className="hidden md:block">
            <Link
              href="/login"
              className="bg-black text-white px-6 py-3 rounded-full text-lg font-bold hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </motion.div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl focus:outline-none">
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 space-y-4 px-4 text-gray-700 font-bold text-lg"
          >
            {[
              { href: '/', label: 'Home', icon: '/images/home.svg' },
              { href: '/hunter_dash', label: 'Dashboard', icon: '/images/dashboard.svg' },
              { href: '/ask_ai', label: 'Ask AI', icon: '/images/ai.svg' },
              { href: '/bounty_page', label: 'Bounty Upload', icon: '/images/bug.svg' },
            ].map(({ href, label, icon }) => (
              <Link href={href} key={href} className="flex items-center space-x-2 hover:text-black">
                <img src={icon} alt={`${label} Icon`} className="w-6 h-6" />
                <span>{label}</span>
              </Link>
            ))}

            <Link
              href="/login"
              className="inline-block mt-3 bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition"
            >
              Login
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
