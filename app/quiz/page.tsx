"use client";

import Question from "../components/quiz/question";
import { useEffect, useState } from "react";

export default function QuizPage() {
  // Set the score in the page so that we can pass it down to components
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);

  //live timer:
  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time, finished]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    const formattedMinutes = String(m).padStart(2, "0");
    const formattedSeconds = String(s).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleReset = () => {
    setTime(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <main className="flex flex-col flex-1 h-full gap-6 py-8 bg-gray-50">
      <h1 className="px-6 text-4xl font-bold text-center text-blue-700">
        The Quiz
      </h1>
      <div className="flex flex-col items-center justify-start flex-1 gap-4 p-4">
        {
          <span className="flex items-center justify-center p-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-400 to-purple-400 border-2 border-slate-300 rounded-2xl whitespace-nowrap hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300 ease-in-out shadow-lg min-w-[200px]">
            {formatTime(time)}
          </span>
        }
        <span className="mt-2 text-2xl font-semibold text-gray-700">
          Score: {score}/5
        </span>
        {finished ? (
          <div className="flex flex-col gap-4 p-4 mt-4 text-center">
            <span className="text-4xl font-semibold text-gray-700">
              Good Job!
            </span>
            <div className="text-2xl font-medium text-gray-600">
              Final time: {formatTime(time)}
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2 text-lg font-medium text-white transition-all duration-300 ease-in-out bg-blue-400 border border-blue-500 rounded-xl hover:bg-blue-500 active:bg-blue-500"
            >
              Play Again
            </button>
          </div>
        ) : (
          <Question
            score={score}
            setScore={setScore}
            setFinished={setFinished}
          />
        )}
      </div>
    </main>
  );
}
