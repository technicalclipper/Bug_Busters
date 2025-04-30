'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import the Link component for navigation
import supabase from '../tools/supabaseConfig';

type Bounty = {
  id: number;
  title: string;
  description: string;
  reward: string;
  postedBy: string;
};

export default function HuntPage() {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBounties = async () => {
      const { data, error } = await supabase
        .from('bug_bounties')
        .select('bno, name, description, reward, caddress');

      if (error) {
        console.error('Error fetching bounties:', error);
        setError('Failed to load bounties');
      } else {
        const formattedData = data.map((item) => ({
          id: item.bno,
          title: item.name,
          description: item.description,
          reward: item.reward,
          postedBy: item.caddress,
        }));
        setBounties(formattedData);
      }
      setLoading(false);
    };

    fetchBounties();
  }, []);

  return (
    <main className="min-h-screen px-8 py-16 bg-white text-gray-900 mt-[60px]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-6 mt-7">
          <img src="/images/bug-catcher.png" alt="Bug Catcher" className="w-13 h-13 mr-4" />
          <h1 className="text-5xl font-bold text-center">Active Bounties</h1>
        </div>

        <p className="text-center text-gray-500 mb-6">
          Explore and solve bounties posted by users to earn rewards.
        </p>

        <hr className="border-t border-gray-300 mb-6" />

        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bounties.map((bounty) => (
            <Link key={bounty.id} href={`/hunt/${bounty.id}`} passHref>
              <div
                className="group rounded-md border border-gray-300 bg-white shadow-[4px_4px_0_#0a0a23] transition duration-300 hover:bg-black"
              >
                <div className="bg-lime-100 text-sm text-gray-800 px-4 py-2 font-mono border-b border-gray-300 rounded-t-md">
                  Bounty
                </div>
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
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
