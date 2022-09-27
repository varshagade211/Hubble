
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

      <div className='homecontainer'>
        <div id='header' className='siteDescription'>To Infinity And Beyond !</div>
        
        
         
          
          
          
           
         
        <div className='logandsign'>
          <div className='siteDescription'><br></br> Hubble is a space oriented social media site.</div>  <br></br>
          <div className='siteDescription'>If you're a lonely planet, orbiting a solar system far away from others...</div> <br></br> <div id='last' className='siteDescription'>we offer a place to connect.</div>
        <div className='loginBtnWrapper'>
        <NavLink to='/login' className={'loginLi'} exact={true} activeClassName='active'>
            Login
          </NavLink>
        </div>

          <div className='or'> Not A User? </div>

        <div  className='signUpBtnWrapper' >
            <NavLink to='/sign-up' className={'signupLi'} exact={true} activeClassName='active'>
               Sign Up
            </NavLink>
        </div>
        </div>

</div>
</div>

   


  );
}

export default Home;
