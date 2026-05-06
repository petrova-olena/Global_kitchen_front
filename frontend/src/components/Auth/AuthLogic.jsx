import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { fetchData } from '../../utils/fetchData';

export const useAuthLogic = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [signinForm, setSigninForm] = useState({
    username: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
    general: '',
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // ================= HELPERS =================
  const clearFieldError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const setAllErrors = (newErrors) => {
    setErrors({
      username: newErrors.username || '',
      password: newErrors.password || '',
      email: newErrors.email || '',
      general: newErrors.general || '',
    });
  };

  const resetAuthState = () => {
    setErrors({
      username: '',
      password: '',
      email: '',
      general: '',
    });

    setShowPassword(false);
  };

  const toggleAuthMode = () => {
    setIsSignIn((prev) => !prev);
    resetAuthState();

    setSigninForm({ username: '', password: '' });
    setSignupForm({ username: '', email: '', password: '' });
  };

  // ================= SIGN IN =================
  const handleSignIn = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let hasError = false;

    if (!signinForm.username.trim()) {
      newErrors.username = 'auth.usernameRequired';
      hasError = true;
    }

    if (!signinForm.password.trim()) {
      newErrors.password = 'auth.passwordRequired';
      hasError = true;
    }

    if (hasError) {
      setAllErrors(newErrors);
      return;
    }

    try {
      const data = await fetchData('/auth/login', {
        method: 'POST',
        body: JSON.stringify(signinForm),
      });

      setUser(data.user);
      setToken(data.token);

      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      navigate('/');
    } catch {
      setAllErrors({
        general: 'auth.invalidCredentials',
      });
    }
  };

  // ================= SIGN UP =================
  const handleSignUp = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let hasError = false;

    if (!signupForm.username.trim()) {
      newErrors.username = 'auth.usernameRequired';
      hasError = true;
    }

    if (!signupForm.email.trim()) {
      newErrors.email = 'auth.emailRequired';
      hasError = true;
    } else if (!emailRegex.test(signupForm.email)) {
      newErrors.email = 'auth.invalidEmail';
      hasError = true;
    }

    if (!signupForm.password.trim()) {
      newErrors.password = 'auth.passwordRequired';
      hasError = true;
    } else if (signupForm.password.length < 6) {
      newErrors.password = 'auth.passwordTooShort';
      hasError = true;
    }

    if (hasError) {
      setAllErrors(newErrors);
      return;
    }

    try {
      await fetchData('/users', {
        method: 'POST',
        body: JSON.stringify(signupForm),
      });

      setIsSignIn(true);
      resetAuthState();
    } catch {
      setAllErrors({
        general: 'auth.signupFailed',
      });
    }
  };

  return {
    isSignIn,
    setIsSignIn,

    toggleAuthMode,

    signinForm,
    setSigninForm,
    signupForm,
    setSignupForm,

    handleSignIn,
    handleSignUp,

    errors,
    clearFieldError,

    showPassword,
    setShowPassword,
  };
};
