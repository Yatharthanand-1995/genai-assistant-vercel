# 🌲 Pinecone Setup Guide

## 1. Create Pinecone Account

1. Go to [pinecone.io](https://www.pinecone.io)
2. Sign up for a free account
3. You'll get:
   - 1 free index
   - 100k vectors
   - $0/month

## 2. Create Your Index

1. In Pinecone dashboard, click "Create Index"
2. Configure:
   - **Name**: `genai-assistant`
   - **Dimensions**: `1536` (for OpenAI embeddings)
   - **Metric**: `cosine`
   - **Pod Type**: `p1` (starter)

## 3. Get Your API Keys

1. Go to "API Keys" in dashboard
2. Copy:
   - **API Key**: `your-api-key`
   - **Environment**: `us-east-1-aws` (or your region)

## 4. Add to Vercel

Add these environment variables in Vercel:

```env
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=genai-assistant
OPENAI_API_KEY=your-openai-key-for-embeddings
```

## 5. Alternative: Use Mock Mode

If you don't want to set up Pinecone yet, the app will automatically use mock documents and still work perfectly!

## 📚 Initial Data Loading

Once deployed, you can upload documents through the UI:
- PDF files (with pdf processing)
- Text files
- Markdown files
- DOCX files

## 🔍 How It Works

1. **Upload**: Documents are chunked and embedded
2. **Store**: Vectors stored in Pinecone
3. **Search**: Queries find similar chunks
4. **Generate**: Claude uses context for better answers

## 💡 Tips

- Start with a few documents to test
- Monitor usage in Pinecone dashboard
- Use namespaces to organize content
- Implement metadata filtering for better search

## 🆓 Free Tier Limits

- **Vectors**: 100,000 (about 100MB of text)
- **Queries**: Unlimited
- **Namespaces**: 5
- **Indexes**: 1

Perfect for getting started! 🚀