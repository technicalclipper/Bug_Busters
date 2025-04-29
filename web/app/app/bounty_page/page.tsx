export default function BountyPage() {
    const userWallet = "0x1234...abcd"; // Replace with actual wallet address logic
  
    return (
      <main className="min-h-screen bg-[#f6f6f7] py-10 px-4">
        {/* Title Outside Main Card */}
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          Post a Bounty
        </h1>
  
        {/* Content Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Code Editor Card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100">
            <label
              htmlFor="bounty-code"
              className="block text-xl font-medium mb-4 text-gray-700"
            >
              Paste your smart contract:
            </label>
            <textarea
              id="bounty-code"
              placeholder="// Paste code here..."
              className="w-full h-[400px] p-4 border border-gray-200 rounded-2xl resize-none shadow-inner bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="mt-4 w-1/2 bg-yellow-400 text-black py-2 rounded-xl font-semibold hover:bg-yellow-300 transition">
              Upload as File
            </button>
          </div>
  
          {/* Right: Inputs Card */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Reward Input */}
              <div>
                <label
                  htmlFor="reward"
                  className="block text-lg font-medium mb-2 text-gray-700"
                >
                  Set Initial Reward:
                </label>
                <input
                  id="reward"
                  type="text"
                  placeholder="e.g. 0.05 ETH"
                  className="w-full p-3 border border-gray-200 rounded-2xl shadow-inner bg-[#fafafa] focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
  
              {/* Wallet Address */}
              <div>
                <p className="text-lg font-medium text-gray-700">Your Wallet:</p>
                <p className="text-gray-600 bg-[#f1f1f1] p-2 rounded-xl mt-1 font-mono text-sm shadow-inner">
                  {userWallet}
                </p>
              </div>
  
              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-lg font-medium mb-2 text-gray-700"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="Explain the contract, what should be checked, etc."
                  className="w-full p-3 border border-gray-200 rounded-2xl shadow-inner bg-[#fafafa] resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>
  
            <button className="mt-8 w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition">
              Upload Bounty
            </button>
          </div>
        </div>
      </main>
    );
  }