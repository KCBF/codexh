import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const requestLog: { timestamp: number }[] = [];

function isRateLimited(): boolean {
  const now = Date.now();
  
  // Remove requests older than the window
  const windowStart = now - RATE_LIMIT_WINDOW;
  const recentRequests = requestLog.filter(req => req.timestamp > windowStart);
  
  // Update the request log
  requestLog.length = 0;
  requestLog.push(...recentRequests, { timestamp: now });
  
  // Check if rate limit is exceeded
  return recentRequests.length >= MAX_REQUESTS_PER_WINDOW;
}

export async function POST(req: NextRequest) {
  try {
    // Check rate limiting
    if (isRateLimited()) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { text, voice_id } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Default to a British voice if not specified
    const voiceId = voice_id || 'pNInz6obpgDQGcFmaJgB'; // Adam (British male)

    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'ElevenLabs API key is missing' },
        { status: 500 }
      );
    }

    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('ElevenLabs API error:', errorData);
      
      // Pass through the ElevenLabs status code
      return NextResponse.json(
        { error: `ElevenLabs API error: ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error('Error in ElevenLabs API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
} 