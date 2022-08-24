
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import { useSelector } from 'react-redux';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector(state => state?.session?.user)

  return (
    <nav className='navContainer'>
      <ul className={'navUl'}>
       <li>
          <NavLink to='/' className={'navLi'} exact={true} activeClassName='active'>
          <i className="fa-brands fa-space-awesome logo"></i>
          </NavLink>
        </li>

       {user && <li className='logout'>
          <LogoutButton />
        </li>}
      </ul>
      <hr></hr>
    </nav>
  );
}

export default NavBar;
