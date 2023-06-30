//store state for index and questionText
"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import Index from './Index';

let rawScore = 0;
let userAnswers: number[] = [];


const Quiz: React.FC = () => {

  

  const [score, setScore] = useState(0);
  const router = useRouter();
  const { push } = useRouter();

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

  const handleAnswerClick = (selectedAnswerIndex: number) => {
   
    userAnswers.push(selectedAnswerIndex);
    
    if (currentQuestionIndex != 4) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        
    } else{
        //console.log("userAnswers: " + userAnswers);
        const calculatedScore = calculateScore();
        setScore(calculateScore());
        console.log("SCORE: " + calculatedScore);
        push('/result');
        userAnswers = [];
    }
    
  };

  const currentQuestion = questions[currentQuestionIndex];

  const calculateScore = () => {
    let score = 0;
  
    // Loop through each question
    questions.forEach((question, index) => {
      // Check if the user's answer matches the correct answer
      if (userAnswers[index] === questions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };
  
  return (
    <div>
        <Index index={currentQuestionIndex} />
        <h2>{currentQuestion.question}</h2>
        {currentQuestion.answers.map((answer, index) => (
        <div key={index} onClick={() => handleAnswerClick(index)}>
          {answer}
        </div>
      ))}
    </div>
    
  );
};



export default Quiz;