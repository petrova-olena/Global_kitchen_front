import React from 'react';
import signInImg from '../../assets/sign_in.png';
import signUpImg from '../../assets/sign_up.png';
import { useAuthLogic } from '../../components/Auth/AuthLogic';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const { t } = useTranslation();

  const {
    isSignIn,
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
  } = useAuthLogic();

  return (
    <div className="auth-container">
      <div className={`auth-card ${isSignIn ? 'left' : 'right'}`}>
        {/* IMAGE */}
        <div
          className="auth-image"
          style={{
            backgroundImage: `url(${isSignIn ? signInImg : signUpImg})`,
          }}
        />

        <div className="auth-form">
          {/* ================= SIGN IN ================= */}
          {isSignIn ? (
            <>
              <h2>{t('auth.signIn')}</h2>

              {errors.general && (
                <p className="error-msg">⚠ {t(errors.general)}</p>
              )}

              <form onSubmit={handleSignIn}>
                {/* USERNAME */}
                <input
                  type="text"
                  placeholder={t('auth.username')}
                  value={signinForm.username}
                  className={errors.username ? 'error-input' : ''}
                  onChange={(e) => {
                    setSigninForm({
                      ...signinForm,
                      username: e.target.value,
                    });
                    clearFieldError('username');
                  }}
                />

                {errors.username && (
                  <span className="error-text">{t(errors.username)}</span>
                )}

                {/* PASSWORD */}
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.password')}
                    value={signinForm.password}
                    className={errors.password ? 'error-input' : ''}
                    onChange={(e) => {
                      setSigninForm({
                        ...signinForm,
                        password: e.target.value,
                      });
                      clearFieldError('password');
                    }}
                  />

                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁' : '🙈'}
                  </span>
                </div>

                {errors.password && (
                  <span className="error-text">{t(errors.password)}</span>
                )}

                <button type="submit">{t('auth.signIn')}</button>
              </form>

              <p onClick={toggleAuthMode}>
                {t('auth.noAccount')} {t('auth.signUp')}
              </p>
            </>
          ) : (
            /* ================= SIGN UP ================= */
            <>
              <h2>{t('auth.signUp')}</h2>

              {errors.general && (
                <p className="error-msg">⚠ {t(errors.general)}</p>
              )}

              <form onSubmit={handleSignUp}>
                {/* USERNAME */}
                <input
                  type="text"
                  placeholder={t('auth.username')}
                  value={signupForm.username}
                  className={errors.username ? 'error-input' : ''}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      username: e.target.value,
                    });
                    clearFieldError('username');
                  }}
                />

                {errors.username && (
                  <span className="error-text">{t(errors.username)}</span>
                )}

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder={t('auth.email')}
                  value={signupForm.email}
                  className={errors.email ? 'error-input' : ''}
                  onChange={(e) => {
                    setSignupForm({
                      ...signupForm,
                      email: e.target.value,
                    });
                    clearFieldError('email');
                  }}
                />

                {errors.email && (
                  <span className="error-text">{t(errors.email)}</span>
                )}

                {/* PASSWORD */}
                <div className="password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('auth.password')}
                    value={signupForm.password}
                    className={errors.password ? 'error-input' : ''}
                    onChange={(e) => {
                      setSignupForm({
                        ...signupForm,
                        password: e.target.value,
                      });
                      clearFieldError('password');
                    }}
                  />

                  <span
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? '👁' : '🙈'}
                  </span>
                </div>

                {errors.password && (
                  <span className="error-text">{t(errors.password)}</span>
                )}

                <button type="submit">{t('auth.signUp')}</button>
              </form>

              <p onClick={toggleAuthMode}>
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
