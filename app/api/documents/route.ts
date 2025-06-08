import { NextRequest, NextResponse } from 'next/server';
import { addDocuments } from '@/lib/pinecone';
import { Document } from '@langchain/core/documents';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('documents') as File[];
    
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const allDocuments: Document[] = [];

    // Process each file
    for (const file of files) {
      const content = await file.text();
      
      // Create document
      const doc = new Document({
        pageContent: content,
        metadata: {
          source: file.name,
          uploadDate: new Date().toISOString(),
          type: file.type || 'text/plain',
        },
      });

      // Split into chunks
      const chunks = await textSplitter.splitDocuments([doc]);
      allDocuments.push(...chunks);
    }

    // Add to vector store
    await addDocuments(allDocuments);

    return NextResponse.json({
      success: true,
      processed: allDocuments.length,
      message: `Successfully processed ${files.length} files into ${allDocuments.length} chunks`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process documents' },
      { status: 500 }
    );
  }
}