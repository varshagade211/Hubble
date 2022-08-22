
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import './Home.css'

const Home = () => {
  const history = useHistory()
  const user = useSelector(state => state?.session?.user)
  if(user){
      history.push('/posts')
  }
  return (
    <div className='loginSignupLinks'>


         <NavLink to='/login' className={'loginLi'} exact={true} activeClassName='active'>
            Login
          </NavLink>


          <NavLink to='/sign-up' className={'signupLi'} exact={true} activeClassName='active'>
            Sign Up
          </NavLink>

          <h4>demo user code will go here</h4>

     </div>


  );
}

export default Home;
