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
              <h2>Sign In</h2>

              {error && <p className="error-msg">{error}</p>}

              <form onSubmit={handleSignIn}>
                <input
                  type="text"
                  placeholder="Username"
                  value={signinForm.username}
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, username: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={signinForm.password}
                  onChange={(e) =>
                    setSigninForm({ ...signinForm, password: e.target.value })
                  }
                />

                <button type="submit">Sign In</button>
              </form>

              <p onClick={() => setIsSignIn(false)}>
                Don't have an account? Sign Up
              </p>
            </>
          ) : (
            <>
              <h2>Sign Up</h2>

              {error && <p className="error-msg">{error}</p>}

              <form onSubmit={handleSignUp}>
                <input
                  type="text"
                  placeholder="Username"
                  value={signupForm.username}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, username: e.target.value })
                  }
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                />

                <button type="submit">Sign Up</button>
              </form>

              <p onClick={() => setIsSignIn(true)}>
                Already have an account? Sign In
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
