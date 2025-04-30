'use client';

import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AskAI() {
  const [code, setCode] = useState('');
  const [isCodeTouched, setIsCodeTouched] = useState(false);
  const [report, setReport] = useState('');
  const [showModal, setShowModal] = useState(false);

  async function handleverifywithai() {
    const requestBody = { code };
    try {
      const response = await axios.post('/api/ai_analyse', requestBody, {
        headers: { 'Content-Type': 'application/json' },
      });
      setReport(response.data.res);
      toast.success('✅ AI verification done. Click ‘Generate Audit Report’ to view.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('❌ Verification failed. Try again.');
    }
  }

  function handleGenerateReport() {
    if (!report) {
      toast.warn('⚠️ Please run verification first.');
      return;
    }
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-white px-8 py-16 mt-[60px]">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <div className="max-w-6xl mx-auto bg-white relative shadow-lg rounded-lg overflow-hidden transform scale-[1.05] transition-transform duration-300">
        {/* Background SVG */}
        <img
          src="/images/bruh.svg"
          alt="Decorative Background"    
          className="absolute bottom-0 left-0 w-full h-full object-cover opacity-40 pointer-events-none z-0"
        />

        {/* Main Content */}
        <div className="relative z-10 p-8 mt-5">
          <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center space-x-3 text-gray-900">
            <img src="/images/ai.svg" alt="AI Icon" className="w-10 h-10" />
            <span>Ask AI to Find Bugs</span>
          </h1>

          <p className="text-center text-gray-600 mb-6 text-lg">
            Paste your smart contract and let our AI find vulnerabilities.
          </p>
          <hr className="border-t border-gray-300 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Code Box */}
            <div className="rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23]">
              <div className="bg-blue-200 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
                Smart Contract Code
              </div>
              <div className="p-4 text-gray-900">
                <label htmlFor="code-input" className="block text-sm font-semibold mb-2">
                  Paste your smart contract:
                </label>
                <textarea
                  id="code-input"
                  placeholder="// Paste code here..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onBlur={() => setIsCodeTouched(true)}
                  className={`w-full h-[400px] p-3 rounded-md resize-none text-sm font-mono bg-[#fafafa] text-gray-900 transition-all duration-300 ${
                    isCodeTouched
                      ? 'border border-green-500 ring-2 ring-green-300'
                      : 'border border-gray-300'
                  }`}
                />
              </div>
            </div>

            {/* Info & Actions */}
            <div className="rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23] flex flex-col justify-between">
              <div className="bg-blue-200 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
                AI Audit Helper
              </div>
              <div className="p-4 text-gray-900 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-2">How we use AI</h2>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    We use advanced machine learning models to analyze smart contracts for common
                    vulnerabilities like reentrancy, overflows, and logic bugs. Our AI learns from public
                    audits to deliver better insights.
                  </p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={handleverifywithai}
                    className="w-full bg-green-200 text-black py-2 rounded-md text-sm font-semibold hover:bg-green-700 shadow-md transition"
                  >
                    Run Initial Verification
                  </button>
                  <button
                    onClick={handleGenerateReport}
                    className="w-full border border-[#1c1c42] text-[#1c1c42] py-2 rounded-md text-sm font-semibold bg-white transition"
                  >
                    Generate Audit Report →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full mx-4 shadow-lg relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Audit Report</h2>
            <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-100 p-4 rounded-xl max-h-[60vh] overflow-y-auto border border-gray-200">
              {report}
            </pre>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
