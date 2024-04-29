import React, { useContext, useState, useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { store } from '../App';
import './Quizpage.css'
import '../App.css'
import axios from 'axios';

const Quizpage = () => {
  const [token, setToken] = useContext(store);
  const [quizDetails, setQuizDetails] = useState(null);
  const location = useLocation();
  const { category } = location.state || {};

  useEffect(() => {
    if (category) {
      axios
        .get(`http://localhost:5001/quiz?category=${encodeURIComponent(category)}`, {
          headers: {
            'x-token': token,
          },
        })
        .then(res => {
          setQuizDetails(res.data);
        })
        .catch(err => {
          console.log(err);
          setQuizDetails({ error: "Failed to fetch quiz details." });
        });
    }
  }, [token, category]);

  if (!token) {
    return <Navigate to='/login' />;
  }

  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h4>{category || 'Quiz'}</h4>
            </div>
            <div className="card-body">
              {quizDetails ? (
                <>
                  <p className="card-text">Total Questions: 10 </p>
                  <p className="card-text">Total Points: 100</p>
                  <div className="d-flex justify-content-center">
                    <Link to={`/quizcomponent?category=${encodeURIComponent(category)}`} state={{ category }} className="btn btn-primary">
                      Start Quiz
                    </Link>
                  </div>
                </>
              ) : (
                <p>Loading quiz details...</p>
              )}
              {quizDetails && quizDetails.error && <p>Error: {quizDetails.error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quizpage;
