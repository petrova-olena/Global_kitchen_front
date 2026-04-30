import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchData } from '../../utils/fetchData';

export const useAuthLogic = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const [isSignIn, setIsSignIn] = useState(true);

  const [signinForm, setSigninForm] = useState({
    username: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!signinForm.username.trim() || !signinForm.password.trim()) {
      setError('Username and password are required');
      return;
    }

    try {
      const data = await fetchData('api/v1/auth/login', {
        method: 'POST',
        body: JSON.stringify(signinForm),
      });

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      navigate('/');
    } catch {
      setError('Invalid username or password');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    if (!signupForm.username.trim()) {
      setError('Username is required');
      return;
    }

    if (!signupForm.email.trim()) {
      setError('Email is required');
      return;
    }

    if (!signupForm.password.trim()) {
      setError('Password is required');
      return;
    }

    if (signupForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      await fetchData('api/v1/users', {
        method: 'POST',
        body: JSON.stringify(signupForm),
      });

      setIsSignIn(true);
    } catch {
      setError('Signup failed. Username or email may already exist.');
    }
  };

  return {
    isSignIn,
    setIsSignIn,
    signinForm,
    setSigninForm,
    signupForm,
    setSignupForm,
    handleSignIn,
    handleSignUp,
    error,
    setError,
  };
};
