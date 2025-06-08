import Groq from 'groq-sdk';

// Initialize Groq client
const groq = process.env.GROQ_API_KEY ? new Groq({
  apiKey: process.env.GROQ_API_KEY,
}) : null;

export async function getChatResponse(
  messages: Array<{ role: string; content: string }>,
  onToken: (token: string) => Promise<void>
) {
  try {
    // If no API key, use mock responses
    if (!groq) {
      const mockResponse = getMockResponse(messages[messages.length - 1].content);
      for (const char of mockResponse) {
        await onToken(char);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      return mockResponse;
    }

    // Format messages for Groq
    const formattedMessages = messages.map(msg => ({
      role: msg.role as 'user' | 'assistant' | 'system',
      content: msg.content,
    }));

    // Add system message for context
    const systemMessage = {
      role: 'system' as const,
      content: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses to user questions.'
    };

    const allMessages = [systemMessage, ...formattedMessages];

    const stream = await groq.chat.completions.create({
      messages: allMessages,
      model: 'llama-3.3-70b-versatile', // Latest Llama 3.3 70B model with 128K context
      temperature: 0.7,
      max_tokens: 2048,
      stream: true,
    });
    
    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      fullResponse += content;
      await onToken(content);
    }
    
    return fullResponse;
  } catch (error: unknown) {
    console.error('Groq chat error:', error);
    
    // If API error, fall back to mock
    const mockResponse = getMockResponse(messages[messages.length - 1].content);
    for (const char of mockResponse) {
      await onToken(char);
      await new Promise(resolve => setTimeout(resolve, 15));
    }
    return mockResponse;
  }
}

function getMockResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('hello') || q.includes('hi')) {
    return `Hello! I'm your AI assistant powered by Groq. I'm here to help you with any questions or tasks you have.

**What I can help with:**
- General questions and information
- Problem-solving and brainstorming
- Writing and editing assistance
- Code explanations (basic)
- Creative tasks

How can I assist you today?`;
  }
  
  if (q.includes('groq')) {
    return `Groq is a high-performance AI inference company that provides lightning-fast LLM responses:

**Key Features:**
- ⚡ **Ultra-fast inference** - Much faster than traditional cloud APIs
- 🧠 **Quality models** - Access to Llama, Mixtral, and other top models
- 💰 **Cost-effective** - Competitive pricing for API calls
- 🔧 **Developer-friendly** - Simple REST API and SDKs

**Popular Models:**
- **Llama 3.3-70B** - Latest and most capable model
- **Llama3-8B** - Great balance of speed and quality
- **Mixtral-8x7B** - Excellent for coding and analysis

Perfect for building fast, responsive AI applications!`;
  }
  
  return `I'm your AI assistant! I can help with a wide variety of topics and tasks.

🤖 **My capabilities:**
- Answering questions
- Helping with writing
- Problem-solving
- Creative brainstorming
- Basic coding help
- General conversation

💡 **Try asking me about:**
- Any topic you're curious about
- Help with a specific task
- Creative projects
- Learning something new

*Note: Running in demo mode. Add your Groq API key for enhanced responses powered by fast Groq inference!*`;
}