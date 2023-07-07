//store state for index and questionText
"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
// import Index from '.';

let userAnswers: number[] = [];

type QuestionProps = {
  score: number,
  setScore: (score: number) => void,
  setFinished: (finished: boolean) => void,
  time: number,
  setFinalTime: (finalTime: number) => void
}
const Question = ({score, setScore, setFinished, time, setFinalTime}: QuestionProps) => {
  const questions = [
    {
      question: 'Question 1',
      answers: ['Correct', 'Answer 2', 'Answer 3', 'Answer 4'],
      correctAnswer: 0,
    },
    {
      question: 'Question 2',
      answers: ['Correct', 'Answer 6', 'Answer 7', 'Answer 8'],
      correctAnswer: 0,
    },
    {
        question: 'Question 3',
        answers: ['Correct', 'Answer 10', 'Answer 11', 'Answer 12'],
        correctAnswer: 0,
      },
      {
        question: 'Question 4',
        answers: ['Correct', 'Answer 14', 'Answer 15', 'Answer 16'],
        correctAnswer: 0,
      },
      {
        question: 'Question 5',
        answers: ['Correct', 'Answer 18', 'Answer 19', 'Answer 20'],
        correctAnswer: 0,
      },


  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const numberOfQuestions = questions.length

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
    } else{
      userAnswers = [];
      setFinished(true);
      console.log("your final time: " + time);
      setFinalTime(time);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
        <span>Question {currentQuestionIndex + 1} of {numberOfQuestions}</span>
        <h2>{currentQuestion.question}</h2>
        {currentQuestion.answers.map((answer, index) => (
        <div key={index} onClick={() => handleAnswerClick(index)}>
          {answer}
        </div>
      ))}
    </div>

  );
};



export default Question;