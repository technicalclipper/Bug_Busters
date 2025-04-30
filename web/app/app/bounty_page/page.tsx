'use client';

import { useState } from "react";

export default function BountyPage() {
  const [code, setCode] = useState("");
  const [reward, setReward] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [description, setDescription] = useState("");

  const [isCodeTouched, setIsCodeTouched] = useState(false);
  const [isRewardTouched, setIsRewardTouched] = useState(false);
  const [isContractaddressTouched, setContractaddressTouched] = useState(false);
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);

  const allValid =
    isCodeTouched &&
    isRewardTouched &&
    isContractaddressTouched &&
    isDescriptionTouched &&
    code.trim() !== "" &&
    reward.trim() !== "" &&
    description.trim() !== "";

  return (
    <div className="min-h-screen w-full bg-white px-8 py-16 mt-[60px]">
      <div className="max-w-6xl mx-auto transform scale-[1.05] transition-transform duration-300 relative shadow-lg rounded-lg overflow-hidden">
        {/* Background SVG */}
        <img
          src="/images/poly.svg"
          alt="Decorative Background"
          className="absolute bottom-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
        />

        {/* Main Content */}
        <div className="relative z-10 p-8">
          <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center space-x-3 text-gray-900">
            <img src="/images/bug.svg" alt="Bug Icon" className="w-10 h-10" />
            <span>Post a Bounty</span>
          </h1>

          <p className="text-center text-gray-600 mb-12 text-lg">
            Share your smart contract and set a reward for contributors to help you review and improve it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Code Editor */}
            <div className="rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23]">
              <div className="bg-yellow-200 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
                Smart Contract Code
              </div>
              <div className="p-4 text-gray-900">
                <label htmlFor="bounty-code" className="block text-sm font-semibold mb-2">
                  Paste your smart contract:
                </label>
                <textarea
                  id="bounty-code"
                  placeholder="// Paste code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onBlur={() => setIsCodeTouched(true)}
                  className={`w-full h-[400px] p-3 rounded-md resize-none text-sm font-mono bg-[#fafafa] text-gray-900 transition-all duration-300
                  ${isCodeTouched ? "border border-green-500 ring-2 ring-green-300" : "border border-gray-300"}`}
                />
                <button className="mt-4 w-full border border-[#1c1c42] text-[#1c1c42] py-2 rounded-md text-sm font-semibold bg-white transition duration-300">
                  Upload as File →
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23] flex flex-col justify-between">
              <div className="bg-yellow-200 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
                Bounty Details
              </div>
              <div className="p-4 text-gray-900 space-y-6">
                <div>
                  <label htmlFor="reward" className="block text-sm font-semibold mb-1">
                    Set Initial Reward:
                  </label>
                  <input
                    id="reward"
                    type="text"
                    placeholder="e.g. 0.05 ETH"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    onBlur={() => setIsRewardTouched(true)}
                    className={`w-full p-2 rounded-md text-sm bg-[#fafafa] text-gray-900 transition-all duration-300
                    ${isRewardTouched ? "border border-green-500 ring-2 ring-green-300" : "border border-gray-300"}`}
                  />
                </div>

                <div>
                  <label htmlFor="contract-address" className="block text-sm font-semibold mb-1">
                    Enter Contract Address:
                  </label>
                  <input
                    id="contract-address"
                    type="text"
                    placeholder="Contract Address"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    onBlur={() => setContractaddressTouched(true)}
                    className={`w-full p-2 rounded-md text-sm bg-[#fafafa] text-gray-900 transition-all duration-300
                    ${isContractaddressTouched ? "border border-green-500 ring-2 ring-green-300" : "border border-gray-300"}`}
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold mb-1">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Explain the contract, what should be checked, etc."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setIsDescriptionTouched(true)}
                    className={`w-full p-2 rounded-md text-sm bg-[#fafafa] text-gray-900 resize-none transition-all duration-300
                    ${isDescriptionTouched ? "border border-green-500 ring-2 ring-green-300" : "border border-gray-300"}`}
                  />
                </div>
              </div>

              <div className="p-4 pt-2">
                <button
                  className={`w-full py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                    allValid
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-md"
                      : "border border-[#1c1c42] text-[#1c1c42] bg-white"
                  }`}
                >
                  Upload Bounty →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
