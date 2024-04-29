import React,{useState,createContext} from 'react';
import{BrowserRouter,Route,Routes,Navigate} from 'react-router-dom';
import Nav from './pages/nav';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

import QuizComponent from './pages/QuizComponent';
import Quizpage from './pages/Quizpage';
import QuestionForm from './pages/QuestionForm';

import './App.css';


export const store=createContext();

const App = () => {
  const [token,setToken]=useState(null);

  return (
    <div className='continer-main'>
      <store.Provider value={[token,setToken]}>
      <BrowserRouter>
        <Nav />
        
        <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path='/register'  element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          
          <Route path='/quizComponent' element={<QuizComponent />} />
          <Route path='/quizpage' element={<Quizpage />} />
          <Route path='/questionform' element={<QuestionForm />} />
        </Routes>
      </BrowserRouter>
      </store.Provider> 
    </div>
  )
}

export default App;
