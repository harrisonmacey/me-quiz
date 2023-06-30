"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResultPage() {
  const [score] = useState(0);
  const router = useRouter();

  return (
    <main className="flex flex-col flex-1 h-full gap-4">
      <h1 className="p-6 text-4xl font-bold text-center">The Quiz</h1>
      <div className="flex flex-col items-center justify-start flex-1 p-4">
        <p className="text-lg">
          Welcome to the results!
        </p>
        <div>
        <p>Your score: {score}</p>
    </div>
      </div>
    </main>
  );
}


