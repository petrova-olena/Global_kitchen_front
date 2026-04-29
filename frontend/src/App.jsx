import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Calendar from "./views/Calendar";
import Menu from "./views/Menu";
import Profile from "./views/Profile";
import DailyMenu from "./views/DailyMenu";
import WeeklyMenu from "./views/WeeklyMenu";
import Auth from "./views/Auth";
import AdminPanel from "./components/Admin/AdminPanel";

const App = () => {
  return (
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
