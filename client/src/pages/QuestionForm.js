import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    newOptions[index] = e.target.value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newQuizQuestion = {
        question,
        options,
        correctAnswer,
      };
      await axios.post('http://localhost:5000/quiz', newQuizQuestion);
      // Clear form fields after successful submission
      setQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    } catch (error) {
      console.error('Error inserting quiz question:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Question:
        <input type="text" value={question} onChange={handleQuestionChange} />
      </label>
      <br />
      <label>
        Options:
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(e, index)}
            />
          </div>
        ))}
      </label>
      <br />
      <label>
        Correct Answer:
        <input
          type="text"
          value={correctAnswer}
          onChange={handleCorrectAnswerChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuestionForm;