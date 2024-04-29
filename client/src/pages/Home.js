import React,{useContext,useState,useEffect} from 'react'
import {store} from '../App'
import { Navigate } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css'
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Home = () => {
  const [token,setToken]=useContext(store);
  const [data,setData] = useState(null);
  useEffect(() =>{
    axios.get('http://localhost:5001/home',{
      headers:{
        'x-token': token
      }
    }).then(res =>{setData(res.data)}).catch((err)=>console.log(err))
  },[token])
  if (!token){
    return <Navigate to='/login' />
  }
  return (
    <div >
      {
        data &&
        <div>
            {/* nav bar section */}
            <nav className='navbar'>
                <div className='d-flex justify-content-end'>
                <button className="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/menu--v1.png" alt="menu--v1"/></button>
                    <div class="offcanvas offcanvas-end" tabindex="-1" data-bs-backdrop="static" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    <div class="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Quiz app</h5>
                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                        <div class="offcanvas-body">
                          <div>
                          <img className='image' src='./images/Female.png' alt="user profile img" height={'210px'} width={'240px'}/>
                          </div>
                          
                        <div className='off-sec'>
                        welcome user : {data.username}<br/>
                        <a>Edit Profile</a><br/>
                        <a>My Score</a><br/>
                        <a>Dark mode</a><br/>
                        <br/>
                        <br/>
                        <br/>
                        
                        <button className='off-btn'  onClick={()=>setToken(null)}>Logout</button> 
                        </div>
                        </div>
                    </div>
                </div>  
            </nav>

            {/* .......quiz selection........... */}

            <div className='h-container'>
                <div className='m-6'>
                    <h2>Quiz</h2>
                    <p>Start your Quiz by selecting topic</p>
                    
                
                <div className='q-cont  flex row'>
                {/* quiz containers */}
                 <Link to='/quizpage' state={{ category: 'HTML' }} className='quiz-box  col-11 col-md-4 col-lg-5' alt="HTML">
                 <img src='./images/Static.png' alt='' />
                    <div >
                      <h5>Basic HTML</h5>
                      <p>10 questions</p>
                    </div> 
                </Link>
                <Link to='/quizpage' state={{ category: 'CSS' }} className='quiz-box  col-11 col-md-4 col-lg-5' alt="CSS">
                 <img src='./images/Static.png' alt=''/>
                    <div >
                      <h5>Basic Css</h5>
                      <p>10 questions</p>
                    </div> 
                </Link>
                <Link to='/quizpage' state={{ category: 'JavaScript' }}  className='quiz-box  col-11  col-md-4 col-lg-5'>
                 <img src='./images/static.png' alt=''/>
                    <div >
                      <h5>JavaScript</h5>
                      <p></p>
                    </div> 
                </Link>
                <Link to='/quizpage' state={{ category: 'React' }}  className='quiz-box   col-11 col-md-4 col-lg-5'>
                 <img src='./images/React.png' alt=''/>
                    <div >
                      <h5>React JS</h5>
                      <p></p>
                    </div> 
                </Link>
                <Link to='/quizpage' state={{ category: 'Python' }}  className='quiz-box  col-11 col-md-4 col-lg-5'>
                 <img src='./images/Pro.png' alt=''/>
                    <div >
                      <h5>Python Fundamental</h5>
                      <p></p>
                    </div> 
                </Link>
                <Link to='/quizpage' state={{ category: 'SQL' }}  className='quiz-box  col-11 col-md-4 col-lg-5'>
                 <img src='./images/Main.png' alt=''/>
                    <div >
                      <h5>SQL</h5>
                      <p></p>
                    </div> 
                </Link>
                </div> 
              </div>  
            </div>
        </div>
      }  
    </div>
  )
}

export default Home
