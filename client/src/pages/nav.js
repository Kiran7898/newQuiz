import React,{useContext} from 'react';
import {Link} from 'react-router-dom';

import {store} from '../App';
import '../App.css'

const Nav = () => {
    const [token]= useContext(store)
  return (  
    
      <div className='main-nav'>
          { !token &&
          <div className='nav'>
              <Link to='./register' className='nav-li' >Register</Link>
              <Link to='./login' className='nav-li'>Login</Link>
              
          </div>

        }

      </ div>
    
  )
}

export default Nav
