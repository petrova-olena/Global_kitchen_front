import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logotest.png";

const Layout = () => {
  return (
    <>
      {/*-- HEADER --*/}
      <header className="header">
        <img src={logo} alt="Global Kitchen Logo" className="logo" />
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/calendar">Calendar</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/en">EN</Link>
          <Link to="/auth" className="login-icon">
            👤
          </Link>
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
