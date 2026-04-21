import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [signinForm, setSigninForm] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupForm),
      });
      const data = await response.json();
      if (response.ok) {
        // alert('New user created!');
        console.log('New user created:', data);
        setSignupForm({ username: '', email: '', password: '' });
      } else {
        // alert(data.message || 'User creation failed');
        console.error('Error creating user:', data.message);
      }
    } catch (err) {
      // alert('Server error', err);
      console.error('Error creating user:', err);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signinForm),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        navigate('/profile');
        console.log('User signed in:', data);
      } else {
        // alert(data.message || 'Sign in failed');
        console.error('Error signing in:', data.message);
      }
    } catch (err) {
      // alert('Server error', err);
      console.error('Error signing in:', err);
    }
  };

  return (
    <div>
      <h1>Auth Page</h1>
      <div id="sign-in">
        <h2>Sign In</h2>
        <form onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Enter your username"
            value={signinForm.username}
            onChange={(e) =>
              setSigninForm({ ...signinForm, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={signinForm.password}
            onChange={(e) =>
              setSigninForm({ ...signinForm, password: e.target.value })
            }
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div id="sign-up">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Enter your username"
            value={signupForm.username}
            onChange={(e) =>
              setSignupForm({ ...signupForm, username: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={signupForm.email}
            onChange={(e) =>
              setSignupForm({ ...signupForm, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={signupForm.password}
            onChange={(e) =>
              setSignupForm({ ...signupForm, password: e.target.value })
            }
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
