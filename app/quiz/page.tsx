"use client";

import Question from "../components/quiz/question";
import { useEffect, useState } from "react";

export default function QuizPage() {
  // Set the score in the page so that we can pass it down to components
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [finalTime, setFinalTime] = useState(0);

  //live timer:
  let newTime = time;
  useEffect(() => {
    const timer = setInterval(() => {
      newTime++;

      if (finished === false) {
        setTime((time) => newTime);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;

    const formattedMinutes = String(m).padStart(2, "0");
    const formattedSeconds = String(s).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <main className="flex flex-col flex-1 h-full gap-4">
      <h1 className="p-6 text-4xl font-bold text-center">The Quiz</h1>
      <div className="flex flex-col items-center justify-start flex-1 p-4">
        <span
          className="text-base font-semibold whitespace-nowrap dark:text-white"
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "600px",
          }}
        >
          {!finished ? <div>{formatTime(time)}</div> : <span />}
        </span>
        <span>Score: {score}/5</span>
        {finished ? (
          <span>
            Good Job!<div>Final time: {formatTime(finalTime)}</div>
          </span>
        ) : (
          <Question
            score={score}
            setScore={setScore}
            setFinished={setFinished}
            time={time}
            setFinalTime={setFinalTime}
          />
        )}
      </div>
    </main>
  );
}
