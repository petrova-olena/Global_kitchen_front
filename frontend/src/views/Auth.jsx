import React from 'react';
import '../auth.css';
import signInImg from '../assets/sign_in.png';
import signUpImg from '../assets/sign_up.png';
import { useAuthLogic } from '../components/Auth/AuthLogic';

const Auth = () => {
  const {
    isSignIn,
    setIsSignIn,
    signinForm,
    setSigninForm,
    signupForm,
    setSignupForm,
    handleSignIn,
    handleSignUp,
    error,
  } = useAuthLogic();

  return (
    <div className="auth-container">
      <div className={`auth-card ${isSignIn ? 'left' : 'right'}`}>
        <div
          className="auth-image"
          style={{
            backgroundImage: `url(${isSignIn ? signInImg : signUpImg})`,
          }}
        />

        <div className="auth-form">
          {isSignIn ? (
            <>
              <h2>{t('auth.signIn')}</h2>

              {error && <p className="error-msg">{error}</p>}

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

              {error && <p className="error-msg">{error}</p>}

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
