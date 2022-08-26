
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
         <h3 className='siteDescription'>To infinity and beyond! A space oriented social media site. If you're a lonely planet, orbiting a solar system far, far away from others... we offer a place to connect.</h3>
         <p className='demoLoginInstu'>If you do not wish to sign up, click the log-in button to log in as demo user</p>
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
