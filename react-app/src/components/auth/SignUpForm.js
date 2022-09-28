import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, profileImage));
      if (data) {
        setErrors(data)
      }
    }else{
        let err = {'repeatePassword':['Password and Repeat password does not match']}
        setErrors(err)
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  const updateProfileImage = (e) => {
    setProfileImage(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      
    

    <div className='signUpFormContainer'>
        <h1 id='signup' ><i class="fa-solid fa-earth-americas"></i> HUBBLE</h1> 
    
      <form className='signUpForm' onSubmit={onSignUp} >
        
        <div>
          
          <input className='signupInput'
          
            type='text'
            name='username'
            onChange={updateUsername}
            placeholder='Username'
            value={username}
          ></input>
          {errors?.username &&
          <div className="error">
              {errors?.username?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }
        </div>
      <div>
        <input
          type='text'
          name='email'
          onChange={updateEmail}
          placeholder='Email'
          value={email}
          className='signupInput'
        ></input>
        {errors?.email &&
          <div className="error">
            {errors?.email?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
        }
      </div>
      <div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updatePassword}
          value={password}
          className='signupInput'

        ></input>
        {errors?.password &&
          <div className="error">
              {errors?.password?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>}

      </div>
      <div>

        <input
          type='password'
          name='repeat_password'
          placeholder='Repeate Password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          className='signupInput'


        ></input>
        {errors?.repeatePassword &&
          <div className="error">
              {errors?.repeatePassword?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>}
      </div>
      <div>

        <input
          type='url'
          name='profile_image'
          placeholder='Profile Image'
          onChange={updateProfileImage}
          value={profileImage}
          className='signupInput'

        ></input>
          {errors?.profile_image &&
          <div className="error">
              {errors?.profile_image?.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
          </div>
          }
      </div>
      <button className = 'signupBtn' type='submit'>Sign Up</button>
    </form>
    </div>
    </div>
  );
};

export default SignUpForm;
