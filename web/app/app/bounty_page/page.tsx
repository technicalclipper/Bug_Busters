"use client";

import { useState } from "react";

export default function BountyPage() {
  const userWallet = "0x1234...abcd";

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
    <div className="min-h-screen w-full flex items-center justify-center bg-#ff6c6c p-4 bg-black">
      <div
        className="w-[96%] max-w-[1600px] min-h-[92vh] bg-cover bg-center rounded-3xl shadow-xl p-12"
        style={{
          backgroundImage: 'url("/images/poly.svg")',
        }}
      >
        <main>
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2 flex items-center justify-center space-x-3">
            <img
              src="/images/bug.svg"
              alt="Bug Icon"
              className="w-12 h-12"
            />
            <span>Post a Bounty</span>
          </h1>

          <p className="text-center text-gray-500 text-lg mb-6">
            Share your smart contract and set a reward for contributors to help you review and improve it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: Code Editor */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <label
                htmlFor="bounty-code"
                className="block text-xl font-medium mb-4 text-gray-700"
              >
                Paste your smart contract:
              </label>
              <textarea
                id="bounty-code"
                placeholder="// Paste code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onBlur={() => setIsCodeTouched(true)}
                className={`w-full h-[400px] p-4 border rounded-2xl resize-none shadow-inner bg-[#fafafa] text-gray-800 transition-all duration-500 ease-in-out
                  ${isCodeTouched ? "border-green-500 ring-4 ring-green-300" : "border-gray-300 ring-0"}`}
              />
              <button className="mt-4 w-1/2 bg-yellow-400 text-black py-2 rounded-xl font-semibold hover:bg-yellow-300 transition">
                Upload as File
              </button>
            </div>

            {/* Right: Inputs */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between">
              <div className="space-y-6">
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
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    onBlur={() => setIsRewardTouched(true)}
                    className={`w-full p-3 border rounded-2xl shadow-inner bg-[#fafafa] text-gray-800 transition-all duration-500 ease-in-out
                      ${isRewardTouched ? "border-green-500 ring-4 ring-green-300" : "border-gray-300 ring-0"}`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contract-address"
                    className="block text-lg font-medium mb-2 text-gray-700"
                  >
                    Enter Contract Address:
                  </label>
                  <input
                    id="contract-address"
                    type="text"
                    placeholder="Contract Address"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    onBlur={() => setContractaddressTouched(true)}
                    className={`w-full p-3 border rounded-2xl shadow-inner bg-[#fafafa] text-gray-800 transition-all duration-500 ease-in-out
                      ${isRewardTouched ? "border-green-500 ring-4 ring-green-300" : "border-gray-300 ring-0"}`}
                  />
                </div>

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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={() => setIsDescriptionTouched(true)}
                    className={`w-full p-3 border rounded-2xl shadow-inner bg-[#fafafa] resize-none text-gray-800 transition-all duration-500 ease-in-out
                      ${isDescriptionTouched ? "border-green-500 ring-4 ring-green-300" : "border-gray-300 ring-0"}`}
                  />
                </div>
              </div>

              <button
                className={`mt-8 w-full py-3 rounded-xl text-lg font-semibold transition-all duration-300 ${
                  allValid
                    ? "bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-400/40"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                Upload Bounty
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
