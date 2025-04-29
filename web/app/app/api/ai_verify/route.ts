import { NextRequest, NextResponse } from "next/server";
import { Agent, createTool, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.data) {
      return NextResponse.json({ error: "Missing transaction data" }, { status: 400 });
    }

    const user_prompt = body.data; // Extract transaction value from request body
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
    

    const agent = new Agent({
      name: "Bug Report Verifier",
      model: {
        provider: "OPEN_AI",
        name: "gpt-4o-mini",
      },
      description: `This agent verifies whether a submitted bug report accurately describes a real issue in the provided Solidity smart contract code.
    
    It checks:
    - If the reported vulnerability **exists** in the provided code.
    - If the report provides a **correct description**, **location**, and **fix**.
    - Whether the issue is **relevant and valid** (i.e., not false or trivial).
    
    Respond strictly in this format:
    
    {
      "isLegit": true, 
      "reason": "[Short explanation why the report is considered valid]"
    }
    
    Or:
    
    {
      "isLegit": false, 
      "reason": "[Short explanation why the report is considered invalid, incorrect, or misleading]"
    }`,
      instructions: [
        "Compare the submitted bug report to the provided smart contract code.",
        "Carefully check whether the vulnerability exists and is described correctly.",
        "Return response strictly as a JSON object: isLegit + reason.",
        "Do not explain or repeat the code.",
        "Be strict — mark false reports as isLegit: false.",
        "Do not exceed 1–2 sentences in 'reason'."
      ]
    });
    
      

    const state = StateFn.root(agent.description);
    state.messages.push(user(JSON.stringify(user_prompt))); // Add the code 

    const result = await agent.run(state);
    //@ts-expect-error correct type
    const res=extractAssistantReply(result)

    return NextResponse.json({ res });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}