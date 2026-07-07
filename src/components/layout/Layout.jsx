import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ children, onLogout }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <div className={`layout-container ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
            <Sidebar onLogout={onLogout} isMobileMenuOpen={isMobileMenuOpen} closeMobileMenu={closeMobileMenu} />
            <div className="main-content">
                <Header toggleMobileMenu={toggleMobileMenu} />
                {isMobileMenuOpen && (
                    <div className="sidebar-overlay" onClick={closeMobileMenu} />
                )}
                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
