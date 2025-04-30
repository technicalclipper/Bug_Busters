'use client';

import { useState } from 'react';

export default function ReviewPage() {
  const originalCode = `// Example smart contract\nfunction withdraw() public {\n  require(msg.sender == owner);\n  payable(msg.sender).transfer(address(this).balance);\n}`;
  const description = `This contract handles withdrawals. Ensure it's protected against unauthorized access and reentrancy attacks.`;

  const [reviewCode, setReviewCode] = useState('');
  const [isReviewTouched, setIsReviewTouched] = useState(false);

  return (
    <div className="min-h-screen bg-white px-8 py-16 mt-[60px] relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
      <img
        src="/images/bg2.svg"
        alt="Background SVG"
        className="absolute bottom-0 left-0 w-full h-210 object-cover opacity-25 pointer-events-none z-0"
      />
        <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center space-x-3 text-black opacity-300">
          <img src="/images/review.svg" alt="AI Icon" className="w-10 h-10 " />
          <span>Review Smart Contract</span>
        </h1>

        <p className="text-center text-gray-600 mb-12 text-lg opacity-100">
          Analyze the submitted smart contract and provide your improvements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Code and Description */}
          <div className="rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23]">
            <div className="bg-green-300 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
              Submitted Contract
            </div>
            <div className="p-4 text-gray-900 space-y-4">
              <textarea
                value={originalCode}
                readOnly
                className="w-full h-[300px] p-3 rounded-md text-sm font-mono bg-[#fafafa] text-gray-900 border border-gray-300 resize-none"
              />
              <div>
                <h3 className="text-sm font-semibold mb-1">Description:</h3>
                <p className="text-sm bg-[#fefefe] p-3 border border-gray-300 rounded-md text-gray-700 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {/* Reviewer Input */}
          <div className="rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23] flex flex-col justify-between">
            <div className="bg-green-300 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
              Your Review Submission
            </div>
            <div className="p-4 text-gray-900 space-y-4">
              <textarea
                placeholder="// Suggest your fix or improvement..."
                value={reviewCode}
                onChange={(e) => setReviewCode(e.target.value)}
                onBlur={() => setIsReviewTouched(true)}
                className={`w-full h-[300px] p-3 rounded-md resize-none text-sm font-mono bg-[#fafafa] text-gray-900 transition-all duration-300 ${
                  isReviewTouched ? 'border border-green-500 ring-2 ring-green-300' : 'border border-gray-300'
                }`}
              />
              <div className="text-sm text-gray-700">💰 Reward: <span className="font-semibold">0.05 ETH</span></div>
              <button className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-green-700 shadow-md transition">
                Review and Submit →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



