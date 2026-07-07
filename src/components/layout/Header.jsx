import React, { useRef, useEffect } from 'react';
import { Search, Bell, User, X, ArrowRight, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../hooks/useSearch';
import './Header.css';

const Header = ({ notifications = [], onMarkAllRead, toggleMobileMenu }) => {
    const navigate = useNavigate();
    const { query, setQuery, results, clearSearch, isOpen } = useSearch();
    const searchRef = useRef(null);
    const inputRef = useRef(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    // Fermer le dropdown en cliquant dehors
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                clearSearch();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [clearSearch]);

    // Raccourci clavier "/" pour ouvrir la recherche
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT') {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === 'Escape') clearSearch();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [clearSearch]);

    const handleResultClick = (path) => {
        navigate(path);
        clearSearch();
    };

    const categoryColors = {
        'Page': 'badge-info',
        'Actualité': 'badge-success',
        'Document': 'badge-warning',
        'Contact': 'badge-neutral',
    };

    return (
        <header className="header">
            {/* Hamburger menu button for mobile */}
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Ouvrir le menu">
                <Menu size={20} />
            </button>
            {/* ── Recherche Globale ── */}
            <div className="search-wrapper" ref={searchRef}>
                <div className="search-bar">
                    <Search size={16} className="search-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Rechercher… (/ pour ouvrir)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Recherche globale"
                        aria-expanded={isOpen}
                        aria-autocomplete="list"
                    />
                    {query && (
                        <button className="clear-search-btn" onClick={clearSearch} aria-label="Effacer">
                            <X size={14} />
                        </button>
                    )}
                </div>

                {/* Dropdown Résultats */}
                {isOpen && (
                    <div className="search-dropdown" role="listbox" aria-label="Résultats de recherche">
                        {results.length === 0 ? (
                            <div className="search-empty">
                                <span>Aucun résultat pour « {query} »</span>
                            </div>
                        ) : (
                            <>
                                {results.map((item) => (
                                    <button
                                        key={item.id}
                                        className="search-result-item"
                                        onClick={() => handleResultClick(item.path)}
                                        role="option"
                                    >
                                        <span className="result-icon">{item.icon}</span>
                                        <div className="result-text">
                                            <span className="result-title">{item.title}</span>
                                            <span className="result-desc">{item.description}</span>
                                        </div>
                                        <span className={`badge ${categoryColors[item.category] || 'badge-neutral'}`}>
                                            {item.category}
                                        </span>
                                        <ArrowRight size={14} className="result-arrow" />
                                    </button>
                                ))}
                                <div className="search-footer">
                                    <kbd>/</kbd> pour ouvrir · <kbd>Échap</kbd> pour fermer
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* ── Actions Header ── */}
            <div className="header-actions">
                <button
                    className="icon-btn"
                    aria-label={`${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`}
                >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                        <span className="notif-badge" aria-hidden="true">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">Jean Dupont</span>
                        <span className="user-role">Administrateur</span>
                    </div>
                    <div className="avatar" aria-hidden="true">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
