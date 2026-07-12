import React from 'react';
import { Newspaper, FileText, Users, ExternalLink, Calendar, ChevronRight } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const stats = [
        { label: 'Annonces Récentes', value: '12', icon: <Newspaper color="#0056b3" />, bg: '#e6f0ff' },
        { label: 'Documents Partagés', value: '45', icon: <FileText color="#28a745" />, bg: '#eafff0' },
        { label: 'Membres en Ligne', value: '13', icon: <Users color="#1890ff" />, bg: '#e6f7ff' },
    ];

    const announcements = [
        { title: 'Réunion générale trimestrielle', date: '28 Jan 2026', type: 'Réunion' },
        { title: 'Mise à jour de la charte informatique', date: '25 Jan 2026', type: 'Note' },
        { title: 'Café rencontre inter-services', date: '22 Jan 2026', type: 'Social' },
    ];

    const quickLinks = [
        { label: 'Portail RH', url: '#' },
        { label: 'Demande de congés', url: '#' },
        { label: 'Support Technique', url: '#' },
        { label: 'Annuaire Interne', url: '#' },
    ];

    return (
        <div className="dashboard-container">
            <div className="welcome-banner">
                <h1>Bonjour, Mr. Folly</h1>
                <p>Bienvenue sur votre espace de travail CNT/EPT. Voici les dernières actualités de l'organisation.</p>
            </div>

            <div className="stats-grid">
                {stats.map((stat, idx) => (
                    <div key={idx} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: stat.bg }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-content">
                <div className="main-section">
                    <h2><Newspaper size={20} /> Dernières Actualités</h2>
                    <div className="announcements-list">
                        {announcements.map((item, idx) => (
                            <div key={idx} className="announcement-item">
                                <div className="announcement-date">
                                    <Calendar size={14} />
                                    <span>{item.date}</span>
                                </div>
                                <h3>{item.title}</h3>
                                <div className="announcement-footer">
                                    <span className="type-badge">{item.type}</span>
                                    <button className="read-more">Lire la suite <ChevronRight size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="side-section">
                    <div className="quick-links-card">
                        <h2>Accès Rapide</h2>
                        <div className="links-list">
                            {quickLinks.map((link, idx) => (
                                <a key={idx} href={link.url} className="quick-link">
                                    {link.label} <ExternalLink size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="events-card">
                        <h2>Événements à venir</h2>
                        <div className="event-item">
                            <div className="event-date">29 JAN</div>
                            <div className="event-description">
                                <strong>Formation Cybersécurité</strong>
                                <p>14:00 - Salle de conférence A</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
