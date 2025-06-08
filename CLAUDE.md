# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Development server**: `npm run dev` (runs on http://localhost:3000, auto-switches to 3001+ if port busy)
- **Build**: `npm run build` 
- **Production start**: `npm start`
- **Linting**: `npm run lint`
- **Type checking**: Built into Next.js build process

## Architecture Overview

This is an **Advanced AI Chatbot** built with Next.js using Groq for ultra-fast AI inference and Whisper for speech-to-text.

### Core Architecture

**Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
**Backend**: Next.js API routes with Node.js Runtime
**AI Model**: Llama 3.3-70B via Groq (latest 70B model with 128K context)
**Speech-to-Text**: Whisper Large v3 via Groq
**Deployment**: Vercel

### Key Files and Flow

1. **`app/page.tsx`**: Main chat interface page
2. **`components/ChatInterface.tsx`**: Real-time chat UI with streaming and voice input
3. **`components/VoiceRecorder.tsx`**: Voice recording component with microphone access
4. **`app/api/chat/route.ts`**: API endpoint for chat requests (uses Server-Sent Events)
5. **`app/api/speech-to-text/route.ts`**: Whisper STT API endpoint for voice transcription
6. **`lib/groqChat.ts`**: Groq chat logic with streaming responses and mock fallbacks

### Chat Implementation

The chat system supports both text and voice input:

**Text Chat Flow:**
1. User types message in ChatInterface
2. API route calls `getChatResponse()` in groqChat
3. Message is sent to Groq API (Llama 3.3-70B model)
4. Response streams back via Server-Sent Events
5. If API fails, falls back to intelligent mock responses

**Voice Chat Flow:**
1. User clicks microphone button to start recording
2. VoiceRecorder captures audio using MediaRecorder API
3. Audio is sent to `/api/speech-to-text` endpoint
4. Whisper Large v3 transcribes speech to text
5. Transcribed text automatically triggers chat submission

### Environment Variables

Required for full functionality:
- `GROQ_API_KEY`: Groq API access for both chat (Llama 3.3-70B) and STT (Whisper Large v3)

### Graceful Degradation

The app is designed to work without API keys:
- No Groq key → Chat uses intelligent mock responses, voice recording disabled
- This allows demo/development without external dependencies

### Voice Features

- **Microphone Access**: Requests user permission for audio recording
- **Real-time Recording**: Visual feedback with pulsing red button
- **Automatic Transcription**: Speech converted to text and auto-submitted
- **Error Handling**: Graceful fallbacks for permission/API errors
- **Audio Format**: Uses WebM/Opus for optimal quality and compatibility

### Styling and UI

- Uses Tailwind CSS v4 with PostCSS
- Dark mode support via CSS custom properties
- Responsive design with mobile-first approach
- Component-based architecture for reusability

### Deployment Considerations

- Configured for Vercel with serverless functions
- Node.js Runtime for Groq SDK compatibility
- Webpack configuration handles Node.js polyfills for client-side
- Simplified architecture with fewer external dependencies

### Development Notes

- TypeScript throughout for type safety
- ESLint configured with Next.js rules
- Hot reload enabled for fast development
- Streaming responses for better UX
- Voice input with Whisper STT integration
- Error boundaries and fallbacks for reliability
- Progressive enhancement (voice features work where supported)