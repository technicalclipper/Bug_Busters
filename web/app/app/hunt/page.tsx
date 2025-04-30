'use client';

type Bounty = {
  id: number;
  title: string;
  description: string;
  reward: string;
  postedBy: string;
};

const sampleBounties: Bounty[] = [
  {
    id: 1,
    title: "Reentrancy Vulnerability in Token Contract",
    description:
      "We're looking for bugs in this ERC-20 contract. Suspected reentrancy issues.",
    reward: "1.5 ETH",
    postedBy: "0xA23...dE5F",
  },
  {
    id: 2,
    title: "Logic Flaw in Vesting Schedule",
    description:
      "Check for logic issues in our token vesting smart contract.",
    reward: "0.8 ETH",
    postedBy: "0xB48...c92A",
  },
  {
    id: 3,
    title: "Infinite Minting Bug Suspected",
    description:
      "Users reported strange behavior during minting. Review the mint function.",
    reward: "2 ETH",
    postedBy: "0xFF2...9b1C",
  },
];

export default function HuntPage() {
  return (
    <main className="min-h-screen px-8 py-16 bg-white text-gray-900 mt-[60px]">
      <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-center mb-6">
      <img src="/images/bug-catcher.png" alt="Bug Catcher" className="w-13 h-13 mr-4" />
      <h1 className="text-5xl font-bold text-center">Active Bounties</h1>
    </div>
        
        <p className="text-center text-gray-500 mb-6">
  Explore and solve bounties posted by users to earn rewards.
</p>

<hr className="border-t border-gray-300 mb-6" />

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {sampleBounties.map((bounty) => (
            <div
              key={bounty.id}
              className="group rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23] transition duration-300 hover:bg-black"
            >
              {/* Keep header color fixed */}
              <div className="bg-lime-100 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
                Bounty
              </div>

              {/* Make text inside content area responsive to hover */}
              <div className="p-4 transition-colors duration-300 group-hover:text-white">
                <h2 className="text-lg font-semibold mb-1">{bounty.title}</h2>
                <p className="text-sm mb-4">{bounty.description}</p>
                <hr className="my-2 border-gray-300" />
                <div className="text-xs space-y-1">
                  <div>
                    🎯 <span className="font-medium">Reward:</span> {bounty.reward}
                  </div>
                  <div>
                    👤 <span className="font-medium">Posted by:</span> {bounty.postedBy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
