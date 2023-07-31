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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const numberOfQuestions = 5;

  useEffect(() => {
    // Put this in helper folder to keep this clean
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=${numberOfQuestions}&type=multiple`
        );
        if (response.data.results && response.data.results.length > 0) {
          const decodedQuestions = response.data.results.map(
            (question: QuizQuestion) => ({
              ...question,
              question: he.decode(question.question),
            })
          );

          // Add all answers to each question and shuffle them
          decodedQuestions.forEach((question: QuizQuestion) => {
            // set all_ansers to decoded incorrect answers
            let all_answers = question.incorrect_answers.map((answer) =>
              he.decode(answer)
            );
            all_answers.push(he.decode(question.correct_answer));

            question.all_answers = shuffleArray(all_answers);
          });

          setQuizQuestions(decodedQuestions);
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
    // if (selectedAnswerIndex === correctAnswerIndex) {
    //   const newScore = score + 1;
    //   setScore(newScore);
    // }

    // Check if they are done
    if (currentQuestionIndex < numberOfQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      userAnswers = [];
      setFinished(true);
    }
  };

  // If there are no questions, show a loading message
  let currentQuestion: QuizQuestion = quizQuestions[currentQuestionIndex];
  if (!currentQuestion) return <h1 className="text-2xl">Loading...</h1>;
  console.log(currentQuestion.correct_answer);

  return (
    <div className="flex flex-col items-center gap-4 p-4 space-y-4">
      <span className="text-lg font-semibold text-blue-700">
        Question {currentQuestionIndex + 1} of {numberOfQuestions}
      </span>
      <h2 className="text-2xl font-bold text-gray-700">
        {currentQuestion.question}
      </h2>
      <div className="flex flex-col items-center w-full gap-1 space-y-4">
        {currentQuestion.all_answers.map((answer, index) => (
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
