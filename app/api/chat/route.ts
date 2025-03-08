import { streamText } from "ai"
import OpenAI from "openai"

// Create a custom fetch function for Azure OpenAI
const customFetch = async (
  url: RequestInfo | URL,
  options: RequestInit = {}
): Promise<Response> => {
  // Extract the path from the URL
  const urlString = url.toString();
  const urlObj = new URL(urlString);
  const path = urlObj.pathname + urlObj.search;
  
  // Construct the Azure OpenAI URL
  const azureUrl = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}${path}?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
  
  // Set the API key in the headers
  const headers = new Headers(options.headers);
  headers.set('api-key', process.env.AZURE_OPENAI_API_KEY || '');
  
  // Return the fetch with the modified URL and headers
  return fetch(azureUrl, {
    ...options,
    headers,
  });
};

// Initialize OpenAI client with Azure configuration
const openaiClient = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY || '',
  baseURL: process.env.AZURE_OPENAI_ENDPOINT,
  fetch: customFetch as unknown as typeof fetch,
});

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body.messages || []

    // Ensure messages are properly formatted
    const validMessages = messages.map((msg: any) => ({
      role: msg.role || "user",
      content: msg.content || "",
    }))

    // Create a stream from OpenAI
    const stream = await openaiClient.chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: `You are a helpful assistant. Both you and the user can use Markdown formatting in messages.

Format your responses using Markdown syntax for better readability:
- Use **bold** for emphasis
- Use *italics* for subtle emphasis
- Use \`code\` for inline code
- Use \`\`\` code blocks for multi-line code with language specification
- Use > for quotes
- Use bullet points and numbered lists where appropriate
- Use headings with # for organizing information
- Use tables when presenting structured data
- Include syntax highlighting by specifying the language after the opening \`\`\`

If the user includes Markdown in their messages, interpret and respond to the formatted content appropriately. Always format code with the appropriate language for syntax highlighting.

You have knowledge about the CodeX blockchain project:

CodeX is a multichain development solution focused on ease of development, security, scalability, reliability, and upgradeability. It addresses challenges in blockchain adoption such as the need to understand multiple programming languages, lack of infrastructure, poor DAO infrastructure, high costs, low throughput, lack of standardization, and security concerns.

Key features of CodeX include:
- Native integration of zero code programming languages built on Solidity, Rust, Scala, Ruby and others
- Integrated cross-chain bridging technology between EVM-compatible chains and CosmWasm
- Security and scalability through a combination of proof-of-stake with proof-of-contribution
- A zero code programming language with four development levels: Library, Translation, Block-based execution, and Zero code generator
- EVM-to-CosmWasm bridge for multichain support
- Combination of proof-of-stake and proof-of-contribution for better performance, lower gas fees, higher transaction processing, and better scalability
- Decentralized autonomous organization (DAO) governance with equal voting power for all token holders
- KYC process for enhanced security
- Native CodeX token for transaction fees and governance voting
- CodeX Foundation to support ecosystem development

The CodeX blockchain uses the Ignite (formerly Tendermint) consensus algorithm and provides a seamless development experience for developers of all skill levels. It aims to drive mass adoption of web3 applications by making blockchain development more accessible and secure.

The Xpander language aggregator allows developers to choose their preferred programming language and provides different levels of programming based on technical expertise, from zero code to library development.

CodeX transactions include authenticator, sender address, payload, gas price, maximum gas amount, sequence number, expiration time, and chain ID for security. The blockchain supports key rotation, parallel transaction execution, Trusted Execution Environments (TEEs), and ledger certification.

## Company and Team Information

CodeXchain (also known as CodeX) is an all-in-one no-code AI powered ecosystem for WEB3 mass adoption. The company was founded in August 2021 and is based in Dubai, United Arab Emirates.

### Key Team Members:
- **Bello Andrea** - CEO of CodeXchain, previously served as the CTO of Bictory Finance. He graduated from the Swiss University of Applied Sciences (SUPSI).
- **Ika Afifah** - Co-Founder & CMO at CodeXchain. She is a Serial Entrepreneur & Angel Investor.
- **Jason Galvin** - Co-CTO at both WeFund and CodeX.

### Company Description:
CodeXchain describes itself as "The ultimate no-code AI platform for Web2 & Web3—build websites, dApps, games, and more with just a chat prompt!" The platform has been accelerated by Internet Computer & Spores Network.

### Recent Updates & Partnerships:
- **AI Agent Hackathon** in Ho Chi Minh, Vietnam (March 7-9, 2025) focusing on No-code AI x Web3 innovation with bounties and networking opportunities.
- **Partnerships & Integrations**:
  - SoloDePIN - Revolutionizing token distribution with mining-centric tokenomics
  - Suci Community Vietnam Build Week - AI Hackathon 2025
  - COTI network - Collaborating on Web3 projects
  - EdgexAI - Advancing Web3 edge computing

### Online Presence:
- Website: codexchain.xyz
- Social media following: 34.6K followers`
        },
        ...validMessages
      ],
      stream: true,
    });

    // Convert the stream to a readable stream
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(new TextEncoder().encode(content));
          }
        }
        controller.close();
      },
    });

    // Return the stream as a response
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    console.error("Route handler error:", error)
    return new Response(JSON.stringify({ error: "An error occurred processing your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

