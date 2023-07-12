"use client";

import React, { useState } from "react";

let userAnswers: number[] = [];

type QuestionProps = {
  score: number;
  setScore: (score: number) => void;
  setFinished: (finished: boolean) => void;
};
const Question = ({ score, setScore, setFinished }: QuestionProps) => {
  const questions = [
    {
      question: "How many days are in a week?",
      answers: ["Correct", "Answer 2", "Answer 3", "Answer 4"],
      correctAnswer: 0,
    },
    {
      question: "Who is the current president of the United States?",
      answers: ["Correct", "Answer 6", "Answer 7", "Answer 8"],
      correctAnswer: 0,
    },
    {
      question: "What is the capital of the United States?",
      answers: ["Correct", "Answer 10", "Answer 11", "Answer 12"],
      correctAnswer: 0,
    },
    {
      question:
        "JavaScript is a programming language. How many days are in a week?",
      answers: ["Correct", "Answer 14", "Answer 15", "Answer 16"],
      correctAnswer: 0,
    },
    {
      question: "Who established the theory of relativity?",
      answers: ["Correct", "Answer 18", "Answer 19", "Answer 20"],
      correctAnswer: 0,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const numberOfQuestions = questions.length;

  const handleAnswerClick = (selectedAnswerIndex: number) => {
    // Store their answer
    userAnswers.push(selectedAnswerIndex);

    // Set their score
    if (selectedAnswerIndex === questions[currentQuestionIndex].correctAnswer) {
      const newScore = score + 1;
      setScore(newScore);
    }

    // Check if they are done
    if (currentQuestionIndex < numberOfQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      userAnswers = [];
      setFinished(true);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center gap-4 p-4 space-y-4">
      <span className="text-lg font-semibold text-blue-700">
        Question {currentQuestionIndex + 1} of {numberOfQuestions}
      </span>
      <h2 className="text-2xl font-bold text-gray-700">
        {currentQuestion.question}
      </h2>
      <div className="flex flex-col items-center w-full gap-1 space-y-4">
        {currentQuestion.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswerClick(index)}
            className="w-64 px-6 py-2 text-lg font-medium text-white transition-all duration-300 ease-in-out bg-blue-400 border border-blue-500 rounded-xl hover:bg-blue-500 active:bg-blue-500"
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
