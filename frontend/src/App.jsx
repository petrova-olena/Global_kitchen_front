import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './views/pages/Home';
import Calendar from './views/pages/Calendar';
import Menu from './views/pages/Menu';
import Profile from './views/pages/Profile';
import DailyMenu from './views/pages/DailyMenu';
import WeeklyMenu from './views/pages/WeeklyMenu';
import Auth from './views/pages/Auth';
import AdminPanel from './components/Admin/AdminPanel';
//import Reservation from './components/Reservation/Reservation';
import Reservation from './components/reservation/Reservation';
import { ThemeProvider } from "./context/ThemeContext";
import ThemeDebugger from "./components/ThemeDebugger";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/daily-menu" element={<DailyMenu />} />
            <Route path="/weekly-menu" element={<WeeklyMenu />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/reservation" element={<Reservation />} />
          </Route>
        </Routes>
        <ThemeDebugger />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
