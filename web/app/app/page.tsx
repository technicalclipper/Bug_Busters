'use client';

import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-transparent text-gray-900 overflow-hidden">
      {/* Background SVG Image */}
      <motion.img
        src="/images/Frame.svg"
        alt="Decorative background"
        className="absolute inset-0 w-full h-full object-cover opacity-100 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Animated content */}
      <div className="text-center max-w-3xl px-4">
        <motion.h1
          className="text-5xl sm:text-6xl font-extrabold mb-6"
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 5,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        >
          Bug Busting and Bounty Hunting!
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-600 leading-relaxed"
          animate={{ y: [0, 2, 0] }}
          transition={{
            duration: 6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        >
          Discover vulnerabilities in smart contracts and earn rewards.<br />
          Post your contracts for audit or take on challenges by others.<br />
          A decentralized playground for whitehat hackers and developers.<br />
          Powered by smart contract analysis, AI, and the community.
        </motion.p>
      </div>
    </main>
  );
}
