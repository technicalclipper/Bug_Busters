export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-transparent text-gray-900 overflow-hidden">
      {/* Background SVG Image */}
      <img
  src="/images/Frame.svg"
  alt="Decorative background"
  className="absolute inset-0 w-full h-full object-cover opacity-100 -z-10"
/>


      <div className="text-center max-w-3xl px-4">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">
          Bug Busting and Bounty Hunting!
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Discover vulnerabilities in smart contracts and earn rewards.<br />
          Post your contracts for audit or take on challenges by others.<br />
          A decentralized playground for whitehat hackers and developers.<br />
          Powered by smart contract analysis, AI, and the community.
        </p>
      </div>
    </main>
  );
}
