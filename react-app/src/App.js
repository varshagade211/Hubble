import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Notes from './components/notes/Notes'
import { authenticate } from './store/session';
import Feed from './components/Feed';
import UserPosts from './components/posts/UserPosts';
import Home from './components/Home'

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route path='/' exact={true}>
         <Home />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/posts' exact={true} >
           <Feed />
        </ProtectedRoute>
        <ProtectedRoute path='/user/posts' exact={true} >
          <UserPosts />
        </ProtectedRoute>
        <ProtectedRoute path='/post/:id/notes' exact={true} >
          <Notes />
        </ProtectedRoute>

        {/* <ProtectedRoute path='/posts' exact={true} >
          <Feed />
        </ProtectedRoute> */}



      </Switch>
    </BrowserRouter>
  );
}

export default App;
