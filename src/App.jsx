import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRCodeFetcher from "./views/qrcode/QRCodeFetcher";
import HomePage from "./views/home/home";
import LoginForm from "./authentication/login/loginPage";
import RegisterForm from "./authentication/register/register";
import Dashboard from "./views/dashboard";
import ChatComponent from "./views/chat/chatDesign";
import ChatApp from "./views/chat/ChatApp";
import SplashPage from "./components/loading/Splashloader";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<SplashPage />} />
        <Route path="/dashboard" element={<ChatApp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
