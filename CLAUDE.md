# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Development server**: `npm run dev` (runs on http://localhost:3000, auto-switches to 3001+ if port busy)
- **Build**: `npm run build` 
- **Production start**: `npm start`
- **Linting**: `npm run lint`
- **Type checking**: Built into Next.js build process

## Architecture Overview

This is a **GenAI Assistant** built with Next.js that implements RAG (Retrieval-Augmented Generation) using Claude 3.5 Sonnet and optional Pinecone vector storage.

### Core Architecture

**Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
**Backend**: Next.js API routes with Edge Runtime
**AI Model**: Claude 3.5 Sonnet (Anthropic)
**Vector Store**: Pinecone (with fallback to mock data)
**Deployment**: Vercel

### Key Files and Flow

1. **`app/page.tsx`**: Main chat interface page
2. **`components/ChatInterface.tsx`**: Real-time chat UI with streaming
3. **`app/api/chat/route.ts`**: API endpoint for chat requests (uses Server-Sent Events)
4. **`lib/ragChain.ts`**: Core RAG logic - handles Claude API calls and mock fallbacks
5. **`lib/pinecone.ts`**: Vector storage and document search functionality

### RAG Implementation

The RAG system works as follows:
1. User sends message via ChatInterface
2. API route calls `getChatResponse()` in ragChain
3. System searches for relevant documents using `searchDocuments()`
4. Context is injected into Claude prompt
5. Response streams back via Server-Sent Events
6. If API fails, falls back to intelligent mock responses

### Environment Variables

Required for full functionality:
- `ANTHROPIC_API_KEY`: Claude API access
- `PINECONE_API_KEY`: Vector storage (optional, uses mocks without)
- `OPENAI_API_KEY`: For embeddings (if using Pinecone)

### Graceful Degradation

The app is designed to work without API keys:
- No Anthropic key → Uses mock responses with GenAI knowledge
- No Pinecone key → Uses fallback document search
- This allows demo/development without external dependencies

### Styling and UI

- Uses Tailwind CSS v4 with PostCSS
- Dark mode support via CSS custom properties
- Responsive design with mobile-first approach
- Component-based architecture for reusability

### Deployment Considerations

- Configured for Vercel with serverless functions
- Edge Runtime for better performance with AI workloads
- Webpack configuration handles Node.js polyfills for client-side
- External packages like Pinecone handled via `serverExternalPackages`

### Development Notes

- TypeScript throughout for type safety
- ESLint configured with Next.js rules
- Hot reload enabled for fast development
- Streaming responses for better UX
- Error boundaries and fallbacks for reliability