import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logotest.png";
import { AuthContext } from "../context/AuthContext";
import "../views/styles/navbar.css";
import { FiLogIn, FiUser } from "react-icons/fi";

const Layout = () => {
  const { user } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <>
      <header className="header">
        <div className="container nav-inner">
          {/* LEFT - LOGO */}
          <nav className="header-left">
            <NavLink to="/">
              <img src={logo} className="logo" alt="logo" />
            </NavLink>
          </nav>

          {/* CENTER NAV */}
          <nav className="header-center desktop-only nav">
            <NavLink to="/" className="nav-link">
              {t("nav.home")}
            </NavLink>

            <NavLink to="/menu" className="nav-link">
              {t("nav.menu")}
            </NavLink>

            <NavLink to="/calendar" className="nav-link">
              {t("nav.calendar")}
            </NavLink>

            <NavLink to="/reservation" className="nav-link">
              {t("nav.reservation")}
            </NavLink>
          </nav>

          {/* RIGHT SIDE */}
          <div className="header-right desktop-only">
            <div className="language-switcher">
              <button onClick={() => changeLanguage("en")}>EN</button>
              <button onClick={() => changeLanguage("fi")}>FI</button>
            </div>

            {/* PROFILE / LOGIN */}
            {user ? (
              user.profile_pic && !imgError ? (
                <img
                  className="header-profile-img"
                  src={
                    user.profile_pic.startsWith("http")
                      ? user.profile_pic
                      : `http://localhost:8000/uploads/${user.profile_pic}`
                  }
                  alt="profile"
                  onClick={() => navigate("/profile")}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="header-profile-fallback"
                  onClick={() => navigate("/profile")}
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

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu mobile-only">
          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            {t("nav.home")}
          </NavLink>

          <NavLink
            to="/menu"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            {t("nav.menu")}
          </NavLink>

          <NavLink
            to="/calendar"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            {t("nav.calendar")}
          </NavLink>

          <NavLink
            to="/reservation"
            onClick={() => setMenuOpen(false)}
            className="mobile-link"
          >
            {t("nav.reservation")}
          </NavLink>

          {user ? (
            <div
              className="mobile-profile"
              onClick={() => {
                setMenuOpen(false);
                navigate("/profile");
              }}
            >
              {t("nav.profile")}
            </div>
          ) : (
            <NavLink
              to="/auth"
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {t("nav.login") || "Login"}
            </NavLink>
          )}

          <div className="mobile-lang">
            <button onClick={() => changeLanguage("en")}>EN</button>
            <button onClick={() => changeLanguage("fi")}>FI</button>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <footer className="footer">
        <nav className="footer-nav">
          <NavLink to="/" className="footer-link">
            {t("nav.home")}
          </NavLink>

          <NavLink to="/menu" className="footer-link">
            {t("nav.menu")}
          </NavLink>

          <NavLink to="/calendar" className="footer-link">
            {t("nav.calendar")}
          </NavLink>

          <NavLink to="/reservation" className="footer-link">
            {t("nav.reservation")}
          </NavLink>
        </nav>

        <div className="footer-info">
          <p>{t("footer.address")}</p>
          <p>{t("footer.contact")}</p>
        </div>
      </footer>
    </>
  );
};

export default Layout;
