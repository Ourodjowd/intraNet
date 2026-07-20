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
  const [currentUser, setCurrentUser] = useState(null);

  // Restore session from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cnc_ept_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem('cnc_ept_user');
      }
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('cnc_ept_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('cnc_ept_user');
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout} currentUser={currentUser}>
        <Routes>
          <Route path="/"               element={<Dashboard currentUser={currentUser} />} />
          <Route path="/news"           element={<News />} />
          <Route path="/services"       element={<Services />} />
          <Route path="/documents"      element={<Documents />} />
          <Route path="/contacts"       element={<Contacts />} />
          <Route path="/profile"        element={<Profile currentUser={currentUser} />} />
          <Route path="/onboarding"     element={<Onboarding />} />
          <Route path="/vie-au-bureau"  element={<VieAuBureau />} />
          <Route path="*"               element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
