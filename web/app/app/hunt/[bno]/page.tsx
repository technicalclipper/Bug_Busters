'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../tools/supabaseConfig';
import axios from 'axios';
import { useAccount } from "wagmi";

type BountyDetail = {
  id: number;
  title: string;
  description: string;
  reward: string;
  postedBy: string;
  code: string;
};

interface BountyDetailPageProps {
  params: {
    bno: string;
  };
}

export default function BountyDetailPage({ params }: BountyDetailPageProps) {
  const [bounty, setBounty] = useState<BountyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewCode, setReviewCode] = useState('');
  const [isReviewTouched, setIsReviewTouched] = useState(false);
  const [parsedResponse, setParsedResponse] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [hash, setHash] = useState<string | null>(null);

  const bno = params.bno;
  const { address } = useAccount();

  useEffect(() => {
    const fetchBountyDetail = async () => {
      const { data, error } = await supabase
        .from('bug_bounties')
        .select('bno, name, description, reward, caddress,code')
        .eq('bno', bno)
        .single();

      if (error) {
        console.error('Error fetching bounty:', error);
        setError('Failed to load bounty details');
      } else {
        setBounty({
          id: data.bno,
          title: data.name,
          description: data.description,
          reward: data.reward,
          postedBy: data.caddress,
          code: data.code
        });
      }
      setLoading(false);
    };

    fetchBountyDetail();
  }, [bno]);

  const originalCode = bounty?.code;
  const description = bounty?.description;

  const handlereview = async () => {
    try {
      const code = {
        originalCode: originalCode,
        reviewCode: reviewCode,
        address: address,
        bno: bno
      };

      const { data } = await axios.post('/api/ai_verify', { code });
      setParsedResponse(data.res);
      
      setShowModal(true);
    } catch (err) {
      console.error("Error processing review:", err);
    }
  };

  if (loading) return <p>Loading bounty details...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!bounty) return <p>Bounty not found</p>;

  return (
    <div className="min-h-screen bg-white px-8 py-16 mt-[60px] relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto bg-white p-6 rounded-3xl shadow-xl">
        <img
          src="/images/bg2.svg"
          alt="Background SVG"
          className="absolute bottom-0 left-0 w-full h-210 object-cover opacity-25 pointer-events-none z-0"
        />
        <h1 className="text-4xl font-bold text-center mb-4 flex items-center justify-center space-x-3 text-black opacity-300">
          <img src="/images/review.svg" alt="AI Icon" className="w-10 h-10" />
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
              <div className="text-sm text-gray-700">
                💰 Reward: <span className="font-semibold">{bounty.reward}</span>
              </div>
              <button
                onClick={handlereview}
                className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-green-700 shadow-md transition"
              >
                Review and Submit →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup for Parsed Response */}
      {showModal && parsedResponse && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-2xl p-8 rounded-xl shadow-2xl relative z-50">
      <h2 className="text-2xl font-bold mb-6 text-black flex items-center">
        <img src="/images/review.svg" alt="Review Result" className="w-7 h-7 mr-3" />
        Review Result
      </h2>
      <p className="text-lg mb-3 text-black">
        <span className="font-semibold">Legit:</span>{' '}
         ✅ Yes
      </p>
      <p className="text-lg mb-6 text-black">
        <span className="font-semibold">Reason:</span> {parsedResponse}
      </p>
      
      <button
        onClick={() => setShowModal(false)}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}
