import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { store } from '../App';
import '../pages/quiz.css';
import axios from 'axios';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const QuizComponent = () => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [token] = useContext(store);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category') || location.state?.category;

    if (!token) {
      navigate('/login');
      return;
    }

    axios.get(`http://localhost:5001/quiz`, {
        headers: { 'x-token': token },
        params: { category },
    }).then(response => {
        setQuizQuestions(response.data);
        setCurrentQuestionIndex(0);
        setTimer(10);
    }).catch(error => {
        console.error('Error fetching quiz questions:', error);
    });

  }, [token, navigate, location.search, location.state]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer > 0 ? prevTimer - 1 : 0);
      if (timer === 1) {
        handleNextQuestion();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer, currentQuestionIndex]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions({});
      setTimer(10);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleOptionSelect = (option, index) => {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    const isCorrect = option === correctAnswer;
    setSelectedOptions({ [currentQuestionIndex]: { option, isCorrect } });

    if (isCorrect) {
      setScore(prevScore => prevScore + 10);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1000);
  };

  if (quizCompleted) {
    return (
      <div className="quiz-complete">
        <center>
          <h1>Quiz Complete!</h1>
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar value={score} maxValue={100} text={`${score}/100`} />
          </div>
          <Link to="/home"><button className="btn btn-primary">Go Home</button></Link>
        </center>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <center>
        <h1>Quiz: {location.state?.category}</h1>
        <div className="timer">Time left: {timer} seconds</div>
        {currentQuestion && (
          <div className="question-card">
            <h3>{currentQuestion.question}</h3>
            <ul>
              {currentQuestion.options.map((option, index) => (
                <li key={index}
                    className={`option ${selectedOptions[currentQuestionIndex]?.option === option ? (selectedOptions[currentQuestionIndex]?.isCorrect ? 'correct' : 'incorrect') : ''}`}
                    onClick={() => handleOptionSelect(option, index)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </center>
    </div>
  );
};

export default QuizComponent;
