"use client";

import { useState } from "react";

export default function AskAI() {
  const [code, setCode] = useState("");
  const [isCodeTouched, setIsCodeTouched] = useState(false);

  return (
    <div className="min-h-screen w-full flex  justify-center bg-white p-4 pt-0">
      <div
        className="w-[96%] max-w-[1600px] min-h-[92vh] bg-cover bg-center rounded-3xl shadow-xl p-12 mt-4"
        style={{
          backgroundImage: 'url("/images/bruh.svg")',
        }}
      >
        <main>
          {/* Title */}
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2 flex items-center justify-center space-x-3">
            <img
              src="/images/ai.svg" // Swap this to any relevant icon you like
              alt="AI Icon"
              className="w-12 h-12"
            />
            <span>Ask AI to Find Bugs</span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-500 text-lg mb-6">
            Paste your smart contract and let our AI find vulnerabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: Code Editor */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
              <label
                htmlFor="code-input"
                className="block text-xl font-medium mb-4 text-gray-700"
              >
                Paste your smart contract:
              </label>
              <textarea
                id="code-input"
                placeholder="// Paste code here..."
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onBlur={() => setIsCodeTouched(true)}
                className={`w-full h-[400px] p-4 border rounded-2xl resize-none shadow-inner bg-[#fafafa] text-gray-800 transition-all duration-500 ease-in-out
                  ${isCodeTouched ? "border-green-500 ring-4 ring-green-300" : "border-gray-300 ring-0"}`}
              />
            </div>

            {/* Right: Info + Buttons */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-800">How we use AI for verification</h2>
                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                  We use advanced machine learning models to scan your smart contract
                  for common vulnerabilities, such as reentrancy, overflow, and access
                  control flaws. Our AI engine continuously learns from public audits and
                  reports to improve accuracy and insights.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <button className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 shadow-md shadow-green-400/40 transition">
                  Run Initial Verification
                </button>
                <button className="w-full border border-green-600 text-green-600 py-3 rounded-xl text-lg font-semibold hover:bg-green-50 transition">
                  Generate Audit Report
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
