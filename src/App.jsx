import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QRCodeFetcher from "./views/qrcode/QRCodeFetcher";
import ChatComponent from "./views/chatDesign/chatDesign";
import HomePage from "./views/home/home";
import LoginForm from "./authentication/login/loginPage";
import RegisterForm from "./authentication/register/register";
import Dashboard from "./views/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/" element={<ChatComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
};

export default App;
