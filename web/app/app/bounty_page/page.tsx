'use client';
import { useState } from "react";
import { useAccount } from "wagmi";
import { abi } from "../lib/bountyContract";
import { useReadContract, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import { JsonRpcProvider, Contract } from "ethers";
import supabase from '../tools/supabaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BountyPage() {
  const { data: bountyCounter, isLoading, isError } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    functionName: 'getBountyCounter',
  });

  const { address, isConnected } = useAccount();
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [reward, setReward] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [description, setDescription] = useState("");
  const [bountyno, setBountyNo] = useState(0);
  const [added, setAdded] = useState(false);

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isCodeTouched, setIsCodeTouched] = useState(false);
  const [isRewardTouched, setIsRewardTouched] = useState(false);
  const [isContractaddressTouched, setContractaddressTouched] = useState(false);
  const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);

  const { writeContractAsync } = useWriteContract();

  const allValid =
    isCodeTouched &&
    isNameTouched &&
    isRewardTouched &&
    isContractaddressTouched &&
    isDescriptionTouched &&
    code.trim() !== "" &&
    reward.trim() !== "" &&
    description.trim() !== "";

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const return_no_of_bounty = async () => {
    const provider = new JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!);
    const contract = new Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!, abi, provider);

    try {
      const bountyCounter = await contract.getBountyCounter();
      return Number(bountyCounter);
    } catch (err) {
      console.error("Contract read failed:", err);
    }
  };

  const handleUploadBounty = async () => {
    try {
      const txHash = await writeContractAsync({
        abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'createBounty',
        args: [contractAddress],
        value: parseEther(reward),
      });

      setAdded(true);
      await sleep(4000);

      var res = await return_no_of_bounty();
      res=res+1;
      console.log("Bounty Number:", res);

      const { data, error } = await supabase.from('bug_bounties').insert([
        {
          bno: res,
          caddress: contractAddress,
          saddress: address,
          code: code,
          name: name,
          reward: reward,
          description: description,
        },
      ]);

      if (error) {
        console.error('Insert failed:', error);
        toast.error("❌ Failed to post bounty. Please try again.");
      } else {
        console.log('Insert successful:', data);
        toast.success("🎉 Bounty successfully created and posted!");
      }
    } catch (err) {
      console.error("Error in handleUploadBounty:", err);
      toast.error("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-8 py-16 mt-[60px]">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="max-w-6xl mx-auto transform scale-[1.05] transition-transform duration-300 relative shadow-lg rounded-lg overflow-hidden">
        <img
          src="/images/poly.svg"
          alt="Decorative Background"
          className="absolute bottom-0 left-0 w-full h-full object-cover opacity-20 pointer-events-none z-0"
        />
        <div className="relative z-10 p-8 mt-5">
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
                  <label htmlFor="name" className="block text-sm font-semibold mb-1">Bounty Name:</label>
                  <input
                    id="name"
                    type="text"
                    placeholder="bounty name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setIsNameTouched(true)}
                    className={`w-full p-2 rounded-md text-sm bg-[#fafafa] text-gray-900 transition-all duration-300
                    ${isNameTouched ? "border border-green-500 ring-2 ring-green-300" : "border border-gray-300"}`}
                  />
                </div>

                <div>
                  <label htmlFor="reward" className="block text-sm font-semibold mb-1">Set Initial Reward:</label>
                  <input
                    id="reward"
                    type="text"
                    placeholder="e.g. 0.05 TRBTC"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    onBlur={() => setIsRewardTouched(true)}
                    className={`w-full p-2 rounded-md text-sm bg-[#fafafa] text-gray-900 transition-all duration-300
                    ${isRewardTouched ? "border border-green-500 ring-2 ring-green-300" : "border border-gray-300"}`}
                  />
                </div>

                <div>
                  <label htmlFor="contract-address" className="block text-sm font-semibold mb-1">Enter Contract Address:</label>
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
                  <label htmlFor="description" className="block text-sm font-semibold mb-1">Description:</label>
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
                  onClick={handleUploadBounty}
                  disabled={!allValid}
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
