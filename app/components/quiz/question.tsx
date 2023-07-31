"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as he from "he";
import shuffleArray from "@/helpers/shuffle-array";

let userAnswers: number[] = [];

type QuestionProps = {
  score: number;
  setScore: (score: number) => void;
  setFinished: (finished: boolean) => void;
};

interface QuizQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers: string[];
}

const Question = ({ score, setScore, setFinished }: QuestionProps) => {
  const questions = [
    {
      question: "How many days are in a week?",
      answers: ["4", "5", "6", "7"],
      correctAnswer: 3,
    },
    {
      question: "Who is the current president of the United States (2023)?",
      answers: [
        "Joe Biden",
        "Donald Trump ",
        "Barack Obama",
        "Hillary Clinton",
      ],
      correctAnswer: 0,
    },
    {
      question: "What is the capital of the United States?",
      answers: ["Miami", "Washington, DC", "New York", "Los Angeles"],
      correctAnswer: 1,
    },
    {
      question: "Which is the oldest planet in our solar system?",
      answers: ["Jupiter", "Earth", "Saturn", "Pluto"],
      correctAnswer: 0,
    },
    {
      question: "Who established the theory of relativity?",
      answers: [
        "Pythagoras",
        "Isaac Newton",
        "Albert Einstein",
        "Benjamin Franklin",
      ],
      correctAnswer: 2,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [questionsState, setquestionsState] = useState<QuizQuestion[]>([]);

  const numberOfQuestions = questions.length;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "https://opentdb.com/api.php?amount=5"
        );
        if (response.data.results && response.data.results.length > 0) {
          const decodedQuestions = response.data.results.map(
            (question: QuizQuestion) => ({
              ...question,
              question: he.decode(question.question),
            })
          );
          setquestionsState(decodedQuestions);
        } else {
          console.error("No questions found in API response.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerClick = (selectedAnswerIndex: number) => {
    // Store their answer
    userAnswers.push(selectedAnswerIndex);

    // Set their score
    if (selectedAnswerIndex === correctAnswerIndex) {
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

  //const currentQuestion = questions[currentQuestionIndex];
  let currentQuestion2: QuizQuestion;
  currentQuestion2 = questionsState[currentQuestionIndex];
  let potentialAnswers = currentQuestion2 && currentQuestion2.incorrect_answers;
  if (
    potentialAnswers &&
    !potentialAnswers.includes(currentQuestion2.correct_answer)
  ) {
    potentialAnswers.push(currentQuestion2.correct_answer);
    potentialAnswers.forEach((e) => he.decode(e));
    console.log(potentialAnswers);
    shuffleArray(potentialAnswers);
    console.log(potentialAnswers);
    console.log("CORRECT ANSWER: " + currentQuestion2.correct_answer);
  }
  let correctAnswerIndex =
    potentialAnswers &&
    potentialAnswers.indexOf(currentQuestion2.correct_answer, 0);

  return (
    <div className="flex flex-col items-center gap-4 p-4 space-y-4">
      <span className="text-lg font-semibold text-blue-700">
        Question {currentQuestionIndex + 1} of {numberOfQuestions}
      </span>
      <h2 className="text-2xl font-bold text-gray-700">
        {currentQuestion2 && currentQuestion2.question}
      </h2>
      <div className="flex flex-col items-center w-full gap-1 space-y-4">
        {potentialAnswers &&
          potentialAnswers.map((answer, index) => (
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
