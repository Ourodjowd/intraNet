import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import News from './pages/News';
import Services from './pages/Services';
import Documents from './pages/Documents';
import Contacts from './pages/Contacts';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import VieAuBureau from './pages/VieAuBureau';
import './index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for existing session
  useEffect(() => {
    const authStatus = localStorage.getItem('cnc_ept_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('cnc_ept_auth', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cnc_ept_auth');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/"               element={<Dashboard />} />
          <Route path="/news"           element={<News />} />
          <Route path="/services"       element={<Services />} />
          <Route path="/documents"      element={<Documents />} />
          <Route path="/contacts"       element={<Contacts />} />
          <Route path="/profile"        element={<Profile />} />
          <Route path="/onboarding"     element={<Onboarding />} />
          <Route path="/vie-au-bureau"  element={<VieAuBureau />} />
          <Route path="*"               element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
