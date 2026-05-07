import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logotest.png';
import { AuthContext } from '../context/AuthContext';
import '../views/styles/navbar.css';
import { FiLogIn, FiUser } from 'react-icons/fi';

const Layout = () => {
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL;

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <>
      <header className="header">
        <div className="container nav-inner">
          {/* LEFT */}
          <nav className="header-left">
            <NavLink to="/">
              <img src={logo} className="logo" alt="logo" />
            </NavLink>
          </nav>

          {/* CENTER */}
          <nav className="header-center desktop-only nav">
            <NavLink to="/" className="nav-link">
              {t('nav.home')}
            </NavLink>
            <NavLink to="/menu" className="nav-link">
              {t('nav.menu')}
            </NavLink>
            <NavLink to="/calendar" className="nav-link">
              {t('nav.calendar')}
            </NavLink>
            <NavLink to="/reservation" className="nav-link">
              {t('nav.reservation')}
            </NavLink>
          </nav>

          {/* RIGHT */}
          <div className="header-right desktop-only">
            <div className="language-switcher">
              <button onClick={() => changeLanguage('en')}>EN</button>
              <button onClick={() => changeLanguage('fi')}>FI</button>
            </div>

            {user ? (
              user.profile_pic && !imgError ? (
                <img
                  className="header-profile-img"
                  src={
                    user.profile_pic.startsWith('http')
                      ? user.profile_pic
                      : `${UPLOADS_URL}/${user.profile_pic}`
                  }
                  alt="profile"
                  onClick={() => navigate('/profile')}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="header-profile-fallback"
                  onClick={() => navigate('/profile')}
                >
                  <FiUser />
                </div>
              )
            ) : (
              <NavLink to="/auth" className="nav-icon">
                <FiLogIn />
              </NavLink>
            )}
          </div>

          {/* HAMBURGER */}
          <div
            className="hamburger mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
