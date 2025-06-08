import { ChatAnthropic } from '@langchain/anthropic';
import { searchDocuments } from './pinecone';

// Initialize model
const model = process.env.ANTHROPIC_API_KEY ? new ChatAnthropic({
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  modelName: 'claude-3-5-sonnet-20240620',
  temperature: 0.7,
  streaming: true,
  maxTokens: 1024,
}) : null;

export async function getChatResponse(
  messages: Array<{ role: string; content: string }>,
  onToken: (token: string) => Promise<void>
) {
  try {
    // If no API key, use mock responses
    if (!model) {
      const mockResponse = getMockResponse(messages[messages.length - 1].content);
      for (const char of mockResponse) {
        await onToken(char);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      return mockResponse;
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    
    // Search for relevant documents
    const relevantDocs = await searchDocuments(lastMessage.content, 5);
    
    // Build context from documents
    const context = relevantDocs.length > 0
      ? '\nRelevant context:\n' + relevantDocs.map(doc => doc.pageContent).join('\n\n')
      : '';
    
    // Create system message with context
    const systemMessage = {
      role: 'system' as const,
      content: `You are an AI assistant specialized in GenAI (Generative AI) updates, tools, and best practices. 
Use the following context to provide accurate and helpful responses.${context}`
    };
    
    // Format messages for Claude
    const formattedMessages = [
      systemMessage,
      ...messages.map(msg => ({
        role: msg.role === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content,
      }))
    ];

    const stream = await model.stream(formattedMessages);
    
    let fullResponse = '';
    for await (const chunk of stream) {
      const content = chunk.content || '';
      fullResponse += content;
      await onToken(content);
    }
    
    return fullResponse;
  } catch (error: any) {
    console.error('Chat error:', error);
    
    // If API error, fall back to mock
    if (error.message?.includes('credit balance')) {
      const mockResponse = getMockResponse(messages[messages.length - 1].content);
      for (const char of mockResponse) {
        await onToken(char);
        await new Promise(resolve => setTimeout(resolve, 15));
      }
      return mockResponse;
    }
    
    throw error;
  }
}

function getMockResponse(question: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('rag') || q.includes('retrieval')) {
    return `RAG (Retrieval-Augmented Generation) is a powerful AI technique that enhances language models:

**How it works:**
1. **Retrieval**: Searches a knowledge base for relevant information
2. **Augmentation**: Adds retrieved context to the prompt
3. **Generation**: Produces accurate, contextual responses

**Key Benefits:**
- ✅ More accurate responses
- ✅ Reduced hallucination
- ✅ Works with private data
- ✅ Cost-effective scaling

**Implementation Steps:**
1. Chunk your documents (500-1000 tokens)
2. Generate embeddings
3. Store in vector database
4. Implement similarity search
5. Combine with LLM generation

Perfect for building knowledge assistants like this one!`;
  }
  
  if (q.includes('vector') || q.includes('database')) {
    return `Here's a comparison of popular vector databases for GenAI:

**Pinecone** 📌
- Fully managed, serverless
- Great for production
- Free tier: 1 index, 100k vectors

**ChromaDB** 🔧
- Open-source, lightweight
- Perfect for prototypes
- Runs locally or in-memory

**Weaviate** 🚀
- Feature-rich, GraphQL API
- Hybrid search capabilities
- Self-hosted or cloud

**Qdrant** ⚡
- High performance, Rust-based
- Excellent filtering
- Docker-friendly

Choose based on scale, budget, and deployment needs!`;
  }
  
  return `I'm your GenAI assistant! I can help with:

🎯 **Topics I Know:**
- RAG implementation
- Vector databases
- LLM integration
- Production best practices
- Cost optimization

💡 **Try asking about:**
- "How to implement RAG?"
- "Best vector database for production?"
- "Claude vs GPT comparison"
- "Optimizing LLM costs"

*Note: Using demo mode. Add your Anthropic API key for enhanced responses!*`;
}