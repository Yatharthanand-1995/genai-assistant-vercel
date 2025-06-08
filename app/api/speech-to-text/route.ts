import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export const runtime = 'nodejs';

const groq = process.env.GROQ_API_KEY ? new Groq({
  apiKey: process.env.GROQ_API_KEY,
}) : null;

export async function POST(req: NextRequest) {
  try {
    if (!groq) {
      return NextResponse.json(
        { error: 'Groq API key not configured' },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer for Groq API
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create a File-like object for Groq API
    const file = new File([buffer], audioFile.name, {
      type: audioFile.type || 'audio/webm',
    });

    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: 'whisper-large-v3',
      response_format: 'json',
      language: 'en', // Auto-detect or specify language
    });

    return NextResponse.json({
      text: transcription.text,
      success: true,
    });
  } catch (error: unknown) {
    console.error('Speech-to-text error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Speech-to-text failed: ${errorMessage}` },
      { status: 500 }
    );
  }
}