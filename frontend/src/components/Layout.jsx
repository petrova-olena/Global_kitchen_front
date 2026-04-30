import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logotest.png';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <>
      {/*-- HEADER --*/}
      <header className="header">
        <img src={logo} alt="Global Kitchen Logo" className="logo" />
        <div className="header-center">
          {user && (
            <span className="welcome-username">{t('header.welcome')}, {user.username}!</span>
          )}
        </div>
        <nav className="nav">
          <Link to="/">{t('nav.home')}</Link>
          <Link to="/calendar">{t('nav.calendar')}</Link>
          <Link to="/menu">{t('nav.menu')}</Link>
          {user && <Link to="/profile">{t('nav.profile')}</Link>}
          <div className="language-switcher">
            <button
              onClick={() => changeLanguage('en')}
              className={i18n.language === 'en' ? 'lang-btn active' : 'lang-btn'}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('fi')}
              className={i18n.language === 'fi' ? 'lang-btn active' : 'lang-btn'}
              title="Suomi"
            >
              FI
            </button>
          </div>
          {!user && (
            <Link to="/auth" className="login-icon">
              👤
            </Link>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      {/*-- CHAT SCRIPT --*/}
      {/*<script>
      const chatToggle = document.querySelector('.chat-toggle');
      const chatWidget = document.querySelector('.chat-widget');
      chatToggle.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
      });
    </script>*/}

      {/*-- FOOTER --*/}
      <footer className="footer">
        <p>{t('footer.address')}</p>
        <p>{t('footer.contact')}</p>
      </footer>
    </>
  );
};

export default Layout;
