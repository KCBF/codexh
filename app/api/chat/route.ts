import { streamText } from "ai"
import OpenAI from "openai"

// Create a custom fetch function for Azure OpenAI
const customFetch = (url: string, options: RequestInit = {}) => {
  // Extract the path from the URL
  const urlObj = new URL(url);
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
  fetch: customFetch,
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
        { role: 'system', content: 'You are a helpful assistant.' },
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

