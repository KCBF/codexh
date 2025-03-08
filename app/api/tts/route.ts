import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { text, voice = 'alloy' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deployment = process.env.AZURE_OPENAI_AUDIO_DEPLOYMENT;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const ttsModel = process.env.AZURE_OPENAI_TTS_MODEL || 'tts-1-hd';

    if (!apiKey || !endpoint || !deployment || !apiVersion) {
      return NextResponse.json(
        { error: 'Azure OpenAI configuration is missing' },
        { status: 500 }
      );
    }

    const url = `${endpoint}/openai/deployments/${deployment}/audio/speech?api-version=${apiVersion}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        model: ttsModel,
        input: text,
        voice,
        response_format: 'mp3',
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Azure OpenAI API error:', errorData);
      return NextResponse.json(
        { error: `Azure OpenAI API error: ${response.status}` },
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
    console.error('Error in TTS API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 