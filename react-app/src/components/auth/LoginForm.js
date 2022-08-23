import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const email = 'andy@gmail.com';
    const password = 'cubingiscool';
    const data = await dispatch(login( email, password));
    if (data) {
      setErrors(data);
    }
  };

  if (user) {
    return <Redirect to='/posts' />;
  }

  return (
    <div className='loginFormContainer'>
    <form className='loginForm' onSubmit={onLogin}>

        {errors.map((error, ind) => (
            <div className='error'>
             <div key={ind}>{error}</div>
          </div>
        ))}

      <div className='emailInputContainer'>
        <label htmlFor='email'>Email</label>
        <input
          name='email'
          type='text'
          placeholder='Email'
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div  className='passwordInputContainer'>
        <label htmlFor='password'>Password</label>
        <input
          name='password'
          type='password'
          placeholder='Password'
          value={password}
          onChange={updatePassword}
        />
        <div className='loginFormBtn'>
          <button type='submit'>Login</button>
        </div>
        <div  className='demoUserBtn'>
        <button onClick={demoUser} >Demo User</button>
        </div>

      </div>
    </form>
    </div>
  );
};

export default LoginForm;
