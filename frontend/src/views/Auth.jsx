import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import '../auth.css';
import signInImg from '../assets/sign_in.png';
import signUpImg from '../assets/sign_up.png';
import { fetchData } from '../utils/fetchData';

const Auth = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

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
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await fetchData('/auth/register', {
        method: 'POST',
        body: JSON.stringify(signupForm),
      });

      setIsSignIn(true);
    } catch (err) {
      console.error('Signup failed:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isSignIn ? 'left' : 'right'}`}>
        <div
          key={isSignIn ? 'signin' : 'signup'}
          className="auth-image"
          style={{
            backgroundImage: `url(${isSignIn ? signInImg : signUpImg})`,
          }}
        />

        <div className="auth-form">
          {isSignIn ? (
            <>
              <h2>{t('auth.signIn')}</h2>

              <form onSubmit={handleSignIn}>
                <input
                  type="text"
                  placeholder={t('auth.username')}
                  value={signinForm.username}
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, username: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder={t('auth.password')}
                  value={signinForm.password}
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, password: e.target.value })
                  }
                />

                <button type="submit">{t('auth.signIn')}</button>
              </form>

              <p onClick={() => setIsSignIn(false)}>
                {t('auth.noAccount')} {t('auth.signUp')}
              </p>
            </>
          ) : (
            <>
              <h2>{t('auth.signUp')}</h2>

              <form onSubmit={handleSignUp}>
                <input
                  type="text"
                  placeholder={t('auth.username')}
                  value={signupForm.username}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, username: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder={t('auth.email')}
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder={t('auth.password')}
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                />

                <button type="submit">{t('auth.signUp')}</button>
              </form>

              <p onClick={() => setIsSignIn(true)}>
                {t('auth.haveAccount')} {t('auth.signIn')}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
