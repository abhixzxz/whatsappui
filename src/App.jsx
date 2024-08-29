import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from "./views/home/home";
import LoginForm from "./authentication/login/loginPage";
import RegisterForm from "./authentication/register/register";
import SplashPage from "./components/loading/Splashloader";
import MainDashboard from "./views/mainDashboard/mainDashboard";
import WhatsAppWeb from "./views/chat/ChatApp";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/splas" element={<SplashPage />} />
        <Route path="/dashboard" element={<WhatsAppWeb />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/mainDashboard" element={<MainDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
