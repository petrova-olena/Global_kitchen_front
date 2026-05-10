# Global Kitchen Frontend

A modern, multilingual restaurant management and reservation platform built with React.

## 🚀 Project Overview

Global Kitchen is a web application where users can view weekly and daily menus, follow events, make table reservations, and manage their profiles. An admin panel allows for event and reservation management. The app supports both English and Finnish languages.

## 🧩 Main Features

### 🍽️ Menu & Recipes

- Weekly and daily menus
- **Recipe of the Day** (via TheMealDB public API)
- Recipe modal with **PDF export** (jsPDF)

### 📅 Events & Reservations

- Event calendar
- Event details
- Table reservation system
- Admin tools for managing events and reservations

### 👤 User System

- Login / Register
- Profile page
- User reservations and comments

### 🌐 Multilingual Support

- English (EN)
- Finnish (FI)
- Language switcher in the UI

### 🔐 Admin Panel

- Manage events
- Manage reservations

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

### Data for accessing website:
- ip for the backend 10.120.32.59
- ip for the frountend 10.120.32.58
- password : Asdfghjkl1234
### How to turn the back and the frontend on and access production version 
- we start by opening the terminal
- then we should type  ssh abdulhy@10.120.32.59 or ssh abdulhy@10.120.32.58 for the frontend
- for the backend we should chose SchoolProjectExpress by writing cd SchoolProjectExpress
- and after that npm run dev to start the back end

- for the front end we chose directory  Global_kitchen_front by “cd Global_kitchen_front”
- and then we chose frontend by writing “cd frontend” then npm run dev to start the frontend

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
   [Read Backend Instructions](https://github.com/Abdulhadi-lab01/SchoolProjectExpress)

   [Frontend](http://10.120.32.59:8000)






> Note: The API server must be running. See `vite.config.js` for proxy settings.

## 🌍 Technologies Used

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router 7](https://reactrouter.com/)
- [i18next & react-i18next](https://react.i18next.com/) (Multilingual support)
- [jsPDF] (PDF export)
- [TheMealDB API] (https://www.themealdb.com/api.php) (public, no API key required)
- [ESLint](https://eslint.org/) (Code quality)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vitest + React Testing Library](unit tests)

## ⭐ Recipe of the Day

The application includes a **Recipe of the Day** feature powered by the public  
[TheMealDB API](https://www.themealdb.com/api.php):

### Why no API key?

TheMealDB provides a **public free key (`1`)**, which is intended for frontend use.  
It is safe to commit and does **not** violate GitHub security rules.

---

## 🧾 PDF Export

Recipes can be exported as PDF files using **jsPDF**.

Install manually if needed:

```bash
npm install jspdf
```

## 🧪 Testing

The project uses **Vitest** and **React Testing Library** for unit testing.

### Run all tests

```bash
npm vitest
```

### Run tests in watch mode

```bash
npm vitest --watch
```

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
