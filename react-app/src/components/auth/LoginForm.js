import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState({});
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
  <div>
      
      <h1 className='hubble'><i className="fa-solid fa-star"></i> HUBBLE</h1>
    <div className='loginFormContainer'>

    <form className='loginForm' onSubmit={onLogin}>


      <div className='emailInputContainer'>

        <input
          name='email'
          type='text'
          placeholder='Email'
          className='loginInput'
          value={email}
          onChange={updateEmail}
        />
        {errors?.email &&
          <div className="error">
              {errors?.email?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }

      </div>
      <div  className='passwordInputContainer'>

        <input
          name='password'
          type='password'
          placeholder='Password'
          className='loginInput'
          value={password}
          onChange={updatePassword}
        />
         {errors?.password &&

          <div className="error">
              {errors?.password?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }

        <div className='loginFormBtn'>
          <button className='loginBtn' type='submit'>Login</button>
        </div>
        
        <div  className='demoUserBtn'>
        <button className='demoLoginBtn' onClick={demoUser} >Log In as <span className='pink'>Demo User</span> ?</button>
        </div>

      </div>
    </form>
    </div>

    </div>
  );
};

export default LoginForm;
