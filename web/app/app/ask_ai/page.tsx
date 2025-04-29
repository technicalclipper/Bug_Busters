"use client";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AskAI() {
  const [code, setCode] = useState("");
  const [isCodeTouched, setIsCodeTouched] = useState(false);
  const [report, setReport] = useState("");
  const [showModal, setShowModal] = useState(false);

  async function handleverifywithai() {
    const requestBody = { code };
    try {
      const response = await axios.post("/api/ai_analyse", requestBody, {
        headers: { "Content-Type": "application/json" },
      });
      setReport(response.data.res);
      toast.success("✅ AI verification done. Click ‘Generate Audit Report’ to view.");
    } catch (error) {
      console.error("Error:", error);
      toast.error("❌ Verification failed. Try again.");
    }
  }

  function handleGenerateReport() {
    if (!report) {
      toast.warn("⚠️ Please run verification first.");
      return;
    }
    setShowModal(true);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f6f7] p-4 relative">
      <ToastContainer position="top-center" autoClose={3000} />

      <div
        className="w-[96%] max-w-[1600px] min-h-[92vh] bg-cover bg-center rounded-3xl shadow-xl p-12 mt-[80px]"
        style={{
          backgroundImage: 'url("/images/bruh.svg")',
        }}
      >
        <main>
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-2 flex items-center justify-center space-x-3">
            <img src="/images/ai.svg" alt="AI Icon" className="w-12 h-12" />
            <span>Ask AI to Find Bugs</span>
          </h1>

          <p className="text-center text-gray-500 text-lg mb-6">
            Paste your smart contract and let our AI find vulnerabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                <button
                  onClick={handleverifywithai}
                  className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 shadow-md shadow-green-400/40 transition"
                >
                  Run Initial Verification
                </button>
                <button
                  onClick={handleGenerateReport}
                  className="w-full border border-green-600 text-green-600 py-3 rounded-xl text-lg font-semibold hover:bg-green-50 transition"
                >
                  Generate Audit Report
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
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
