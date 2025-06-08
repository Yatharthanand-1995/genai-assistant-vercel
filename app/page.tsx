'use client';

import { useState } from 'react';
import ChatInterface from '@/components/ChatInterface';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <div className="flex max-w-7xl mx-auto h-[calc(100vh-64px)]">
        <Sidebar />
        
        <main className="flex-1 p-4">
          <ChatInterface messages={messages} setMessages={setMessages} />
        </main>
      </div>
    </div>
  );
}
