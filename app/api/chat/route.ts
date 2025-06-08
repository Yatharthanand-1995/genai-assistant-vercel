import { NextRequest, NextResponse } from 'next/server';
import { getChatResponse } from '@/lib/ragChain';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // Create a TransformStream for streaming
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();
    const encoder = new TextEncoder();

    // Start the chat response in the background
    getChatResponse(messages, async (chunk: string) => {
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`)
      );
    }).then(async () => {
      await writer.write(encoder.encode('data: [DONE]\n\n'));
      await writer.close();
    }).catch(async (error) => {
      console.error('Chat error:', error);
      await writer.write(
        encoder.encode(`data: ${JSON.stringify({ error: 'An error occurred' })}\n\n`)
      );
      await writer.close();
    });

    // Return the stream
    return new NextResponse(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}