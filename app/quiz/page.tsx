"use client";

import Question from "../components/quiz/question";
import Timer from "../components/quiz/timer";
import { useEffect, useState } from "react";

export default function QuizPage() {
  // Set the score in the page so that we can pass it down to components
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  return (
    <main className="flex flex-col flex-1 h-full gap-4">
      <h1 className="p-6 text-4xl font-bold text-center">The Quiz</h1>
      <div className="flex flex-col items-center justify-start flex-1 p-4">
        {/* <p className="text-lg">
          Welcome to the quiz! This is where the quiz questions will go.
        </p> */}
        <span
          className="text-base font-semibold whitespace-nowrap dark:text-white"
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "600px",
          }}
        >
          <Timer />
        </span>
        <span>{score}/5</span>
        {finished ? (
          <span>done</span>
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
