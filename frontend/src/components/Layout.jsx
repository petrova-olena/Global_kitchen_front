import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import logo from '../assets/logotest.png';
import { AuthContext } from '../context/AuthContext';

const Layout = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      {/*-- HEADER --*/}
      <header className="header">
        <img src={logo} alt="Global Kitchen Logo" className="logo" />
        <div className="header-center">
          {user && (
            <span className="welcome-username">Welcome, {user.username}!</span>
          )}
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/menu">Menu</Link>
          {user && <Link to="/profile">Profile</Link>}
          <Link to="/en">EN</Link>
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
        <p>Global Kitchen • Helsinki, Finland</p>
        <p>Contact: info@globalkitchen.fi</p>
      </footer>
    </>
  );
};

export default Layout;
