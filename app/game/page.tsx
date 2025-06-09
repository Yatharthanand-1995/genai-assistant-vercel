'use client';

import { Suspense } from 'react';
import IndianRoadGame from '@/components/IndianRoadGame';

export default function GamePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-white to-green-400">
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-800">
          🐄 Indian Road Adventure 🛺
        </h1>
        <div className="w-full max-w-4xl h-[600px] border-4 border-orange-600 rounded-lg overflow-hidden shadow-2xl">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full bg-yellow-100">
              <div className="text-center">
                <div className="text-6xl mb-4">🐄</div>
                <div className="text-xl text-orange-800">Loading game...</div>
              </div>
            </div>
          }>
            <IndianRoadGame />
          </Suspense>
        </div>
        <div className="mt-6 text-center text-orange-800">
          <p className="text-lg mb-2">🎮 Use arrow keys to move your rickshaw</p>
          <p className="text-md">🎯 Avoid the cows and collect points!</p>
        </div>
      </div>
    </div>
  );
}
