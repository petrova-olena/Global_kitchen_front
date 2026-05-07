import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./views/styles/about.css";
import "./views/styles/auth.css";
import "./views/styles/base.css";
import "./views/styles/calendar.css";
import "./views/styles/chat.css";
import "./views/styles/navbar.css";
import "./views/styles/hero.css";
import "./views/styles/menu.css";
import "./views/styles/navbar.css";
import "./views/styles/profile.css";
import "./views/styles/reservation.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nextProvider>
  </StrictMode>,
);
