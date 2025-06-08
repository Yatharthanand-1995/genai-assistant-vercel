# Simple AI Chatbot with Groq

A fast and responsive AI chatbot built with Next.js and powered by Groq's lightning-fast inference API.

## Features

- 🚀 **Ultra-fast responses** powered by Groq
- 💬 **Real-time streaming** for better user experience
- 🎨 **Modern UI** with Tailwind CSS and dark mode
- 📱 **Responsive design** that works on all devices
- 🔄 **Graceful fallbacks** with mock responses when API is unavailable
- ⚡ **Built with Next.js 15** and React 19

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **AI**: Groq API (Llama3-8B model)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Groq API key (get one at [groq.com](https://groq.com))

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd genai-assistant-vercel
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
# Create .env.local file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the chatbot in action!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for AI inference | No* |

*The app includes intelligent mock responses and works without an API key for demo purposes.

## Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your `GROQ_API_KEY` environment variable in Vercel dashboard
4. Deploy!

## Project Structure

```
├── app/
│   ├── api/chat/route.ts    # Chat API endpoint with streaming
│   ├── page.tsx             # Main chat interface
│   └── layout.tsx           # App layout
├── components/
│   ├── ChatInterface.tsx    # Real-time chat component
│   ├── Header.tsx           # App header
│   └── Sidebar.tsx          # Navigation sidebar
├── lib/
│   └── groqChat.ts          # Groq integration and fallbacks
└── ...
```

## Development

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Start**: `npm start`
- **Lint**: `npm run lint`

## Why Groq?

- ⚡ **Lightning fast**: Sub-second response times
- 💰 **Cost effective**: Competitive pricing
- 🎯 **High quality**: Access to top models like Llama3
- 🔧 **Developer friendly**: Simple REST API

## License

MIT License - feel free to use this project for your own chatbot applications!