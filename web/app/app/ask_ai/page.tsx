export default function AskAI() {
    return (
      <main className="min-h-screen bg-white px-8 py-12">
        <h1 className="text-center text-4xl font-bold mb-12">
          Ask AI to find Bugs for your contract
        </h1>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Side: Code Input /}
          <div>
            <label htmlFor="code-input" className="block text-xl font-semibold mb-4">
              Paste your smart contract:
            </label>
            <textarea
              id="code-input"
              placeholder="// Paste code here..."
              className="w-full h-[400px] p-4 border border-gray-300 rounded-lg resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          {/ Right Side: Info + Buttons */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">How we use AI for verification</h2>
              <p className="text-gray-600 whitespace-pre-line">
                herel;dkfl;kasdnfl;adsnf
                lksdhfsjkahdfklasjdhflkasjdhflaskdjhf
                hlkasjdhflkashjfdkljasdhflkjasdfh
                lksjdhflaksdjhfkjasdhflkadsjhflaksdhf
              </p>
            </div>
  
            <div className="mt-8">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
                Run Initial Verification
              </button>
              <button className="w-full mt-4 border border-blue-600 text-blue-600 py-3 rounded-lg text-lg font-medium hover:bg-blue-50 transition">
                Generate Audit Report
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }