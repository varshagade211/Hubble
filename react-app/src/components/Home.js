
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

        <div className='loginBtnWrapper'>
        <NavLink to='/login' className={'loginLi'} exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>


        <div  className='signUpBtnWrapper' >
            <NavLink to='/sign-up' className={'signupLi'} exact={true} activeClassName='active'>
               Sign Up
            </NavLink>
        </div>




     </div>


  );
}

export default Home;
