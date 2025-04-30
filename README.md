# Bug_Busters 

Smart Contract Address deployed on Rootstock TestNet: 0xf3524D5f76362Aa5634cA02a5907Ec1F70CcC1A2

🔐 Project Description: Decentralized Smart Contract Security Platform
This platform transforms Web3 security by merging AI-powered verification, gig-based bug hunting, and automated smart contract workflows into one seamless ecosystem.

⭐ Key Points
Decentralized Bounty System: Developers upload smart contracts and deposit bounty funds.
AI Audit Assistants: Automatically scan contracts for known vulnerabilities and generate risk reports.
Bug Hunter Gig Marketplace: Open platform where security researchers browse, select, and hunt bounties.
AI Bug Verification: AI verifies hunter-submitted bugs and determines validity.
Smart Contract Payouts: If verified, rewards are automatically distributed via smart contracts.
On-chain Recordkeeping: Contracts, submissions, and payout events are transparently logged on-chain.
Reputation System: Hunters build credibility through successful reports; developers earn trust by resolving bugs.
🤖 AI Agents

Audit Agent: Pre-screens uploaded contracts, highlights common flaws (reentrancy, unchecked calls, etc.).
Verification Agent: Analyzes bug reports, validates exploit feasibility, compares against existing vulnerabilities.
Incentive Agent (optional): Suggests bounty amounts based on code complexity and past reward data.
💼 Gig Economy for Bug Hunters
This platform introduces a decentralized gig model, similar to Upwork/Fiverr but tailored for Web3 security:

No Gatekeeping: Anyone can become a bug hunter and earn.
Earn-as-you-hack: Bounties are released immediately upon verification.
Skill-based Matching: Future roadmap includes AI recommending bounties based on hunter skill and history.
Transparent and Fair: All contract audits, bug reports, and payouts are visible on-chain.

🔧 Prompt Documentation
Project Title: Decentralized Smart Contract Security with AI Agents & Gig Economy for Bug Hunters

🤖 AI Agent 1: Analyze Agent
📌 Purpose
Analyzes Solidity smart contract code for vulnerabilities and gas optimization issues, and generates a complete audit report.

🧠 Prompt Logic
The AI is instructed to:

Categorize vulnerabilities like Reentrancy, Access Control, Arithmetic Bugs, Gas Optimization, etc.

Provide detailed issue description, location, severity, and suggested fix.

Structure the report in a standardized, markdown format.

Always include a Security Score (0–100).

Even if no issues are found, return a full report with 100/100 score.

# 🛡️ AI-Powered Smart Contract Bug Bounty System

This project enables a gig economy for Web3 security. AI agents audit and verify smart contracts, while human bug hunters earn rewards for submitting valid vulnerabilities. It uses OpenAI GPT-4 and Covalent Agent SDK to power the AI layer.

---

## 🤖 AI Agent 1: Analyze Agent

### 📌 Purpose
Analyzes Solidity smart contract code for potential security vulnerabilities and gas optimization issues. Generates a full audit report in a standard format.

### 🧠 Prompt Logic
- Categorizes vulnerabilities: Reentrancy, Access Control, Arithmetic Bugs, Gas Optimization, etc.
- Provides detailed location, severity, issue, and suggested fix.
- Returns a markdown-formatted report with an overall security score.
- Always returns a full report — even if no vulnerabilities are found (score: 100/100).

### 📥 Prompt Used
```text
Carefully analyze the Solidity code for vulnerabilities.
Follow the exact output format.
Categorize each vulnerability with severity, location, and fix.
Always respond with the full report — never summarize in one line.
Do not add any extra explanation before or after the report.
If no bugs are found, still return the report with a 100/100 score.
📤 Output Format

### Audit Report

**Contract Overview:**  
[Short summary of the contract's functionality in 1–2 lines.]

**Vulnerabilities:**

- **[Category: e.g., Reentrancy]**  
- **Location:** [Function name]  
- **Severity:** [High/Medium/Low]  
- **Issue:** [Short issue description]  
- **Fix:** [Suggested fix]

**Security Score:** [0–100]

**Audit Completed By:** AI Smart Contract Auditor

✅ Sample Output
### Audit Report

**Contract Overview:**  
This contract is a simple bank allowing users to deposit and withdraw Ether.

**Vulnerabilities:**

- **[Category: Reentrancy]**  
- **Location:** withdraw()  
- **Severity:** High  
- **Issue:** External call is made before updating state, allowing for reentrancy attacks.  
- **Fix:** Use Checks-Effects-Interactions pattern and OpenZeppelin's ReentrancyGuard.

- **[Category: Gas Optimization]**  
- **Location:** deposit()  
- **Severity:** Low  
- **Issue:** Mapping update can be optimized.  
- **Fix:** Use "unchecked" block to save gas in Solidity 0.8.x.

**Security Score:** 50/100

**Audit Completed By:** AI Smart Contract Auditor


🧪 AI Agent 2: Verification Agent
📌 Purpose
Verifies whether a bug report submitted by a hunter accurately describes a real and valid vulnerability in a given Solidity contract.

🧠 Prompt Logic
Compares the hunter's bug report with the actual contract code.

Confirms existence, correctness, and relevance of the reported issue.

Returns a strict JSON format indicating whether the report is valid or not.

Prevents false positives and trivial reports.

📥 Prompt Used

Compare the submitted bug report (review code) to the provided smart contract code.
Carefully check whether the vulnerability exists and is described correctly.
Return response strictly as a JSON object: isLegit + reason.
Do not explain or repeat the code.
Be strict — mark false reports as isLegit: false.
Do not exceed 1–2 sentences in 'reason'.
Add the given address in the response, like send the bounty to the address.
Follow the format exactly as specified.
Always return the response in JSON format and ensure it can be parsed using JSON.parse.

📤 Output Format
{
  "isLegit": true,
  "reason": "[Short valid explanation]",
  "sendTo": "0xHunterAddress"
}

Or:

{
  "isLegit": false,
  "reason": "[Short invalid explanation]",
  "sendTo": "0xHunterAddress"
}


✅ Sample Output

{
  "isLegit": true,
  "reason": "The report accurately identifies a reentrancy vulnerability in the withdraw function and provides a correct description, location, and fix.",
  "sendTo": "0x1234...abcd"
}


🧰 AI Tools Used

Tool	Purpose
OpenAI GPT-4 Mini	Core LLM used for smart contract understanding and reasoning
Covalent Agent SDK	Custom AI agent execution, prompt orchestration, and message routing

  
