import { Pinecone } from '@pinecone-database/pinecone';
import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Document } from '@langchain/core/documents';

let vectorStore: PineconeStore | null = null;

// Initialize Pinecone client
const initPinecone = async () => {
  if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_ENVIRONMENT) {
    console.log('Pinecone credentials not found, using mock mode');
    return null;
  }

  try {
    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
      environment: process.env.PINECONE_ENVIRONMENT,
    });

    return pinecone;
  } catch (error) {
    console.error('Failed to initialize Pinecone:', error);
    return null;
  }
};

// Initialize vector store
export async function getVectorStore() {
  if (vectorStore) return vectorStore;

  const pinecone = await initPinecone();
  if (!pinecone) return null;

  try {
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME || 'genai-assistant');
    
    // Use OpenAI embeddings or a free alternative
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY || 'mock-key',
    });

    vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      namespace: 'genai-knowledge',
    });

    return vectorStore;
  } catch (error) {
    console.error('Failed to connect to Pinecone index:', error);
    return null;
  }
}

// Search for similar documents
export async function searchDocuments(query: string, k: number = 5) {
  const store = await getVectorStore();
  
  if (!store) {
    // Return mock documents if Pinecone is not available
    return getMockDocuments(query);
  }

  try {
    const results = await store.similaritySearch(query, k);
    return results;
  } catch (error) {
    console.error('Search error:', error);
    return getMockDocuments(query);
  }
}

// Add documents to vector store
export async function addDocuments(documents: Document[]) {
  const store = await getVectorStore();
  
  if (!store) {
    console.log('Vector store not available, skipping document addition');
    return;
  }

  try {
    await store.addDocuments(documents);
    console.log(`Added ${documents.length} documents to Pinecone`);
  } catch (error) {
    console.error('Failed to add documents:', error);
  }
}

// Mock documents for when Pinecone is not available
function getMockDocuments(query: string): Document[] {
  const mockDocs = [
    {
      pageContent: `RAG (Retrieval-Augmented Generation) combines retrieval and generation:
      1. Retrieval: Search relevant documents from a knowledge base
      2. Augmentation: Add retrieved context to the prompt
      3. Generation: LLM generates response using the context`,
      metadata: { source: 'knowledge-base', topic: 'rag' },
    },
    {
      pageContent: `Popular vector databases for GenAI:
      - Pinecone: Managed, scalable, production-ready
      - ChromaDB: Open-source, great for prototypes
      - Weaviate: Feature-rich with GraphQL API
      - Qdrant: High-performance, Rust-based`,
      metadata: { source: 'knowledge-base', topic: 'vector-databases' },
    },
    {
      pageContent: `Claude 3 model family:
      - Claude 3 Opus: Most capable, best for complex tasks
      - Claude 3.5 Sonnet: Balanced performance and speed
      - Claude 3 Haiku: Fast and cost-effective`,
      metadata: { source: 'knowledge-base', topic: 'claude-models' },
    },
  ];

  // Simple keyword matching for mock search
  const queryLower = query.toLowerCase();
  return mockDocs.filter(doc => 
    doc.pageContent.toLowerCase().includes(queryLower) ||
    doc.metadata.topic?.includes(queryLower)
  ).map(doc => new Document(doc));
}