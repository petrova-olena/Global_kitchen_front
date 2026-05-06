# Global Kitchen Frontend

A modern, multilingual restaurant management and reservation platform built with React.

## 🚀 Project Overview

Global Kitchen is a web application where users can view weekly and daily menus, follow events, make table reservations, and manage their profiles. An admin panel allows for event and reservation management. The app supports both English and Finnish languages.

## 🧩 Main Features

- View weekly and daily menus
- Event calendar and event details
- Table reservation (for users and admins)
- User profile and comments
- Multilingual support (EN/FI)
- Admin panel: event and reservation management

## 🗂️ Folder Structure (Summary)

```
frontend/
  src/
    components/      # React components (Layout, Menu, Calendar, Profile, Admin, etc.)
    context/         # AuthContext (user session management)
    locales/         # Language files (en.json, fi.json)
    services/        # API services (events, reservations)
    utils/           # Helper functions
    views/pages/     # Page components (Home, Menu, Calendar, Profile, Auth, etc.)
    assets/          # Images and static files
  public/            # favicon and static files
  index.html         # App entry point
  package.json       # Dependencies and scripts
```

## ⚙️ Installation & Running

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Open the app:**
   [http://localhost:5173](http://localhost:5173)

> Note: The API server must be running. See `vite.config.js` for proxy settings.

## 🌍 Technologies Used

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router 7](https://reactrouter.com/)
- [i18next & react-i18next](https://react.i18next.com/) (Multilingual support)
- [ESLint](https://eslint.org/) (Code quality)
- [React Icons](https://react-icons.github.io/react-icons/)

## 🗝️ Pages & Flow

- **/ (Home):** Introduction, weekly menu, statistics
- **/menu:** Weekly menu and filtering
- **/daily-menu:** Daily menu
- **/calendar:** Event calendar and weekly overview
- **/reservation:** Table reservation
- **/profile:** User profile, reservations, and comments
- **/admin:** Admin panel (event and reservation management)
- **/auth:** Login/Register

## 🌐 Multilingual Support

- English and Finnish are supported via `src/locales/en.json` and `src/locales/fi.json`.
- Language can be switched from the top menu.

## 🤝 Contributing

Fork the repository, create a new branch, and submit a pull request.

## 📝 License

MIT

## 📬 Contact

info@globalkitchen.fi
