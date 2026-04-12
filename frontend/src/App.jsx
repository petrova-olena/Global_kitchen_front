import { Route, BrowserRouter, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./views/Home";
import Calendar from "./views/Calendar";
import Menu from "./views/Menu";
import Profile from "./views/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
