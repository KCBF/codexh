import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const messages = body.messages || []

    // Ensure messages are properly formatted
    const validMessages = messages.map((msg: any) => ({
      role: msg.role || "user",
      content: msg.content || "",
    }))

    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: "You are a helpful assistant.",
      messages: validMessages,
    })

    return result.toDataStreamResponse({
      // Handle errors gracefully
      getErrorMessage: (error) => {
        console.error("AI SDK error:", error)
        return "An error occurred while processing your request."
      },
    })
  } catch (error) {
    console.error("Route handler error:", error)
    return new Response(JSON.stringify({ error: "An error occurred processing your request" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}

