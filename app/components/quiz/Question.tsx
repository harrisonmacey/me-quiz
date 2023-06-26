"use client"; // This is a client component 👈🏽

import React, { useState } from 'react';

interface QuestionProps {
  question: string;
  options: string[];
}

const Question: React.FC<QuestionProps> = ({ question, options }) => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  //used gpt to build these buttons, should this be moved into a css file eventually?
  return (
    <div>
      <h3>{question}</h3>
      <ul>
        {options.map((option) => (
          <li
            key={option}
            style={{
              padding: '10px',
              margin: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: selectedOption === option ? '#4a4a4a' : '#000000',
              cursor: 'pointer',
            }}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;