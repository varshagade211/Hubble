
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
    <div>
    <div className='loginSignupLinks'>

      <div className='homecontainer'>
        <div id='header' className='siteDescription'>To Infinity And Beyond !</div>
            <div className='logandsign'>
              <div id='main' className='siteDescription'>Hubble</div>
              <div className='siteDescription'><br></br>A space oriented social media site.</div>  <br></br>
              <div className='siteDescription'>If you're a lonely planet, orbiting a solar system far away from others...</div> <br></br> <div id='last' className='siteDescription'>we offer a place to connect.</div>
              <div className='loginBtnWrapper'>
                  <NavLink to='/login' className={'loginLi'} exact={true} activeClassName='active'>Login</NavLink>
              </div>
              <div className='or'> Not A User? </div>
              <div  className='signUpBtnWrapper' >
                  <NavLink to='/sign-up' className={'signupLi'} exact={true} activeClassName='active'>Sign Up</NavLink>
              </div>
            </div>
        </div>
    </div>
    <footer className='footer'>
          {/* <p className=' footerHeading'>Developers</p> */}
          <div className='footerLinksContainer'>
            <div>
              <a href="https://grantchristopherson.github.io/" target='_blank' className='footerContaint' ><i className="fa-solid fa-folder  footerProfileIcon"></i> Grant Christopherson </a>
               {/* <p  className='footerContaint'>/p> */}
            </div>
            <div>
            <a href="https://isabelarredondo.github.io/" target='_blank' className='footerContaint' ><i className="fa-solid fa-folder  footerProfileIcon"></i> Isabel Arredondo</a>
            </div>
            <div>
            <a href="https://reneeluo7.github.io/" target='_blank' className='footerContaint' ><i className="fa-solid fa-folder  footerProfileIcon"></i> Renee Luo</a>

            </div>
            <div>
            <a href="https://varshagade211.github.io/" target='_blank' className='footerContaint' ><i className="fa-solid fa-folder  footerProfileIcon"></i>Varsha Gade</a>

            </div>
          </div>
        </footer>
  </div>




  );
}

export default Home;
