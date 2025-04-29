import { NextRequest, NextResponse } from "next/server";
import { Agent, createTool, ZeeWorkflow } from "@covalenthq/ai-agent-sdk";
import { user } from "@covalenthq/ai-agent-sdk/dist/core/base";
import { StateFn } from "@covalenthq/ai-agent-sdk/dist/core/state";


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
    

    const agent = new Agent({
        name: "Smart Contract Audit Agent",
        model: {
          provider: "OPEN_AI",
          name: "gpt-4o-mini",
        },
        description: `This agent analyzes Solidity smart contract code for potential security vulnerabilities and optimization issues.

        It must produce a detailed audit report including:

        1. Categorized vulnerabilities:
        - Reentrancy
        - Access Control
        - Arithmetic Bugs
        - Denial of Service
        - Gas Optimization
        - Deprecated Functions
        - Any other critical issues

        2. Suggested fixes for each vulnerability.

        3. Optional: Overall "Security Score" (0–100%).

        4. Report must be structured exactly like this:

        ### Audit Report

        **Contract Overview:**  
        [Short summary of the contract's functionality in 1–2 lines.]

        **Vulnerabilities:**

        - **[Category: e.g., Reentrancy]**
        - **Location:** withdraw()  
        - **Severity:** High  
        - **Issue:** External call is made before updating state.  
        - **Fix:** Use Checks-Effects-Interactions pattern or apply OpenZeppelin's ReentrancyGuard.

        - **[Category: Gas Optimization]**
        - **Location:** deposit()  
        - **Severity:** Low  
        - **Issue:** Mapping update could be optimized.  
        - **Fix:** Use "unchecked blocks" if overflow is impossible (in newer Solidity versions).

        **Security Score:** 60/100

        **Audit Completed By:** AI Smart Contract Auditor`,
        
        instructions: [
            "Carefully analyze the Solidity code for vulnerabilities.",
            "Follow the exact output format.",
            "Categorize each vulnerability with severity, location, and fix.",
            "Always respond with the full report — never summarize in one line.",
            "Do not add any extra explanation before or after the report.",
            "If no bugs are found, still return the report with a 100/100 score.",
          ]
      });
      

    const state = StateFn.root(agent.description);
    state.messages.push(user(user_prompt)); // Add the user transaction data

    const result = await agent.run(state);
    //@ts-expect-error correct type
    const res=extractAssistantReply(result)

    return NextResponse.json({ res });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}