import ScrollToTop from "./components/common/ScrollToTop";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeDebugger from "./components/ThemeDebugger";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
      <ScrollToTop />
        <AppRoutes />
        <ThemeDebugger />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
