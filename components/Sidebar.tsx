'use client';

import { useState } from 'react';
import { Upload, Lightbulb, BarChart3 } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  { icon: '🔍', text: 'RAG Fundamentals', prompt: 'Explain how RAG (Retrieval-Augmented Generation) works and its benefits' },
  { icon: '🤖', text: 'Claude Models', prompt: 'Compare different Claude 3 models and their use cases' },
  { icon: '🚀', text: 'Production Tips', prompt: 'What are the best practices for building production GenAI applications?' },
  { icon: '🗄️', text: 'Vector Databases', prompt: 'How do I choose between vector databases like Pinecone, ChromaDB, and Weaviate?' },
  { icon: '⛓️', text: 'LangChain Guide', prompt: 'Show me how to implement LangChain for document processing' },
  { icon: '📈', text: 'AI Trends', prompt: 'What are the latest trends in GenAI for 2024?' },
];

export default function Sidebar() {
  const [dragActive, setDragActive] = useState(false);
  const [docCount] = useState(4);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload
  };

  const handlePromptClick = (prompt: string) => {
    // Send prompt to chat
    const input = document.querySelector('textarea') as HTMLTextAreaElement;
    if (input) {
      input.value = prompt;
      input.focus();
    }
  };

  return (
    <aside className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
      {/* Suggested Topics */}
      <div className="mb-6">
        <h3 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <Lightbulb className="h-4 w-4 mr-2 text-indigo-600 dark:text-indigo-400" />
          Suggested Topics
        </h3>
        <div className="space-y-2">
          {SUGGESTED_PROMPTS.map((item, index) => (
            <button
              key={index}
              onClick={() => handlePromptClick(item.prompt)}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
            >
              <span className="mr-2">{item.icon}</span>
              {item.text}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-6">
        <h4 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <Upload className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
          Train RAG Model
        </h4>
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center transition-all ${
            dragActive
              ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supports: PDF, TXT, MD, DOCX
          </p>
          <input
            type="file"
            multiple
            accept=".pdf,.txt,.md,.docx"
            className="hidden"
            id="file-upload"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h4 className="flex items-center text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <BarChart3 className="h-4 w-4 mr-2 text-cyan-600 dark:text-cyan-400" />
          Session Stats
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Messages:</span>
            <span className="font-medium text-gray-900 dark:text-white">0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Knowledge Base:</span>
            <span className="font-medium text-gray-900 dark:text-white">{docCount} docs</span>
          </div>
        </div>
      </div>
    </aside>
  );
}