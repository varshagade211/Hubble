
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import logoImage from '../image/hubble.svg'
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  return (
    <nav className='navContainer'>
      <ul className={'navUl'}>
        <div className='logoandicon'>

        <li>
          <NavLink to='/' className={'navLi'} exact={true} activeClassName='active'>
            <i className="fa-brands fa-space-awesome logo"></i>
          </NavLink>

        </li>
        <NavLink to='/' className={'navLi'} exact={true} activeClassName='active'>
       <img className='hummbleimg' src={logoImage}></img>
        </NavLink>
        </div>
        {/* <li>
          <NavLink to='/users' className={'navLi'} exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li> */}
        <div className='logoutbtn-and-repo'>
          <div className='repo'>
          <a href="https://github.com/varshagade211/Hubble" target="_blank">
            <i className="fa-brands fa-github navBarGithub" />
            </a>
          </div>

        {user && <li className='logout'>
          <LogoutButton />
        </li>}
        </div>
      </ul>
      <hr></hr>
    </nav>
  );
}

export default NavBar;
