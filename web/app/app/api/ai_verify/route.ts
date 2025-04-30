import { NextRequest, NextResponse } from "next/server";
import { Agent, createTool, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import {abi} from "../../lib/bountyContract";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const address =body.code.address;
    const bno=body.code.bno;
    const contractaddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

    if (!body.code) {
      return NextResponse.json({ error: "Missing transaction data" }, { status: 400 });
    }

    const user_prompt = body.code; // Extract transaction value from request body
    console.log(user_prompt);
    
    
    type Message = {
      role: string;
      content: string;
    };
    
    type Result = {
      messages: Message[];
    };
    function extractAssistantReply(result: Result): string | null {
      const assistantMessage = result.messages.find(msg => msg.role === "assistant");
      return assistantMessage ? assistantMessage.content : null;
    }

    //function to send transaction to the contract
    async function approveBugOnChain(bountyId: number, hunterAddress: string) {
      try {
        const privateKey = process.env.AGENT_PRIVATE_KEY;
        if (!privateKey) throw new Error("AGENT_PRIVATE_KEY not set in .env");
    
        // Setup provider and wallet
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL!); // Replace with your network
        const wallet = new ethers.Wallet(privateKey, provider);
    
        // Connect to the contract
        const contract = new ethers.Contract(contractaddress, abi, wallet);
    
        console.log(`Calling approveBug with bountyId ${bountyId} and hunter ${hunterAddress}`);
        const tx = await contract.approveBug(bountyId, hunterAddress);
        console.log("Transaction sent:", tx.hash);
    
        const receipt = await tx.wait();
        console.log("Transaction mined:", receipt.transactionHash);
        return tx.hash;
      } catch (error) {
        console.error("Error calling approveBug:", error);
      }
    }



    

    const agent = new Agent({
      name: "Bug Report Verifier",
      model: {
        provider: "OPEN_AI",
        name: "gpt-4o-mini",
      },
      description: `This agent verifies whether a submitted bug report (review code) accurately describes a real issue in the provided Solidity smart contract code.
    
    It checks:
    - If the reported vulnerability **exists** in the provided code.
    - If the report provides a **correct description**, **location**, and **fix**.
    - Whether the issue is **relevant and valid** (i.e., not false or trivial).

    If the given review code or report is **not valid**, the agent should return isLegit: false.
    dont return true by analysing  the code ,compare the code with the report and check if the report is valid or not.
    
    Respond strictly in this format:
    
    {
      "isLegit": true, 
      "reason": "[Short explanation why the report is considered valid]",
      
    }
    
    Or:
    
    {
      "isLegit": false, 
      "reason": "[Short explanation why the report is considered invalid, incorrect, or misleading]"

    }`,
      instructions: [
        "Compare the submitted bug report(review code) to the provided smart contract code.",
        "Carefully check whether the vulnerability exists and is described correctly.",
        "Return response strictly as a JSON object: isLegit + reason.",
        "Do not explain or repeat the code.",
        "Be strict — mark false reports as isLegit: false.",
        "Do not exceed 1–2 sentences in 'reason'.",
        "add the given address in the response,like send the bounty to the address.",
        "follow the format exactly as specified.",
        "If the given review code or report is **not valid**, the agent should return isLegit: false ,dont return true by analysing  the code ,compare the code with the report and check if the report is valid or not.",
        "always return the response in JSON format and should be easily parsed using JSON.parse.",
      ]
    }); 
    
    const state = StateFn.root(agent.description);
    state.messages.push(user(JSON.stringify(user_prompt))); // Add the code 

    const result = await agent.run(state);
    //@ts-expect-error correct type
    const res=extractAssistantReply(result)
    console.log("Result:", res);
    
    const hash = approveBugOnChain(bno, address); // Call the function to send transaction to the contract
    
    return NextResponse.json({ res,hash });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}