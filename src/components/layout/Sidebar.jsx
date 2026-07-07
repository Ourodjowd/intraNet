import React, { useState } from 'react';
import {
    LayoutDashboard, Newspaper, Briefcase, FileText,
    Users, UserCircle, LogOut, GraduationCap, Coffee,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout, isMobileMenuOpen, closeMobileMenu }) => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        { path: '/',              icon: <LayoutDashboard size={20} />, label: 'Dashboard'       },
        { path: '/news',          icon: <Newspaper size={20} />,       label: 'Actualités'      },
        { path: '/services',      icon: <Briefcase size={20} />,       label: 'Services'        },
        { path: '/documents',     icon: <FileText size={20} />,        label: 'Documents'       },
        { path: '/contacts',      icon: <Users size={20} />,           label: 'Annuaire'        },
        { path: '/vie-au-bureau', icon: <Coffee size={20} />,          label: 'Vie au Bureau'   },
        { path: '/onboarding',    icon: <GraduationCap size={20} />,   label: 'Onboarding'      },
        { path: '/profile',       icon: <UserCircle size={20} />,      label: 'Profil'          },
    ];

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            {/* Logo */}
            <div className="sidebar-logo">
                {!collapsed && <h2>CNT / EPT</h2>}
                <button
                     className="collapse-btn"
                     onClick={() => setCollapsed(c => !c)}
                     aria-label={collapsed ? 'Déplier le menu' : 'Réduire le menu'}
                     title={collapsed ? 'Déplier' : 'Réduire'}
                >
                     {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav" role="navigation" aria-label="Navigation principale">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        title={collapsed ? item.label : undefined}
                        onClick={closeMobileMenu}
                    >
                        <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                        {!collapsed && <span className="nav-label">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="sidebar-footer">
                <button
                    className="logout-btn"
                    onClick={() => {
                        closeMobileMenu();
                        onLogout();
                    }}
                    title={collapsed ? 'Déconnexion' : undefined}
                >
                    <LogOut size={20} />
                    {!collapsed && <span>Déconnexion</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
