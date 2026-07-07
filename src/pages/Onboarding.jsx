import React, { useState } from 'react';
import {
    CheckSquare, Square, User, FileText, Monitor, Phone,
    Calendar, Star, ChevronRight, ChevronDown, Play,
    MapPin, Shield, Award, ThumbsUp, ThumbsDown
} from 'lucide-react';
import './Onboarding.css';

// ── Données Onboarding ───────────────────────────────────────────────────────
const CHECKLIST_SECTIONS = [
    {
        id: 'day1',
        title: 'Jour 1 — Installation & Accueil',
        icon: '🎉',
        color: '#0056b3',
        tasks: [
            { id: 't1', label: 'Rencontrer votre manager et l\'équipe' },
            { id: 't2', label: 'Récupérer votre badge d\'accès et équipements' },
            { id: 't3', label: 'Activer votre compte email professionnel' },
            { id: 't4', label: 'Se connecter à l\'intranet CNT/EPT' },
            { id: 't5', label: 'Compléter votre profil dans l\'annuaire' },
        ]
    },
    {
        id: 'week1',
        title: 'Semaine 1 — Prise en main',
        icon: '📚',
        color: '#28a745',
        tasks: [
            { id: 't6', label: 'Lire le Guide de l\'Employé CNT/EPT' },
            { id: 't7', label: 'Suivre la formation Cybersécurité obligatoire' },
            { id: 't8', label: 'Comprendre les procédures RH (congés, notes de frais)' },
            { id: 't9', label: 'Identifier vos contacts clés dans l\'annuaire' },
            { id: 't10', label: 'Participer à votre premier café d\'équipe' },
        ]
    },
    {
        id: 'month1',
        title: 'Mois 1 — Intégration',
        icon: '🚀',
        color: '#9b59b6',
        tasks: [
            { id: 't11', label: 'Participer à une réunion de coordination' },
            { id: 't12', label: 'Terminer le module de formation métier' },
            { id: 't13', label: 'Réaliser votre premier bilan avec votre manager' },
            { id: 't14', label: 'Contribuer à l\'intranet (votre première publication)' },
            { id: 't15', label: 'Compléter la checklist administrative RH' },
        ]
    }
];

const KEY_CONTACTS = [
    { name: 'YAO TOÏ Marcel', role: 'Coordonnateur', phone: '+228 90 01 64 90', topic: 'Questions générales' },
    { name: 'HUMADO Dénise', role: 'Chargée de Programme', phone: '+228 91 57 86 35', topic: 'RH & Formation' },
    { name: 'KANITOM Kofi', role: 'Chef Projet EI / IT', phone: '+228 92 25 53 14', topic: 'Support technique' },
];

const TOOLS = [
    { name: 'Intranet CNT/EPT', icon: '🏠', desc: 'Votre portail central d\'information', url: '/' },
    { name: 'Messagerie Pro', icon: '📧', desc: 'Email professionnel @cnt-ept.org', url: '#' },
    { name: 'Portail RH', icon: '👤', desc: 'Congés, bulletins, documents RH', url: '#' },
    { name: 'Support IT', icon: '🔧', desc: 'Tickets et assistance technique', url: '#' },
];

const ESSENTIAL_DOCS = [
    { name: "Guide de l'Employé", category: 'RH', size: '1.8 MB' },
    { name: 'Procédures Sécurité IT', category: 'IT', size: '450 KB' },
    { name: 'Charte Informatique', category: 'IT', size: '320 KB' },
    { name: 'Formulaire Note de Frais', category: 'Finance', size: '120 KB' },
];

function getInitials(name) {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function avatarColor(name) {
    const colors = ['#0056b3', '#28a745', '#9b59b6', '#e67e22', '#1abc9c'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

const Onboarding = () => {
    const [checked, setChecked] = useState({});
    const [openSection, setOpenSection] = useState('day1');
    const [feedback, setFeedback] = useState(null);

    const toggleTask = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

    const totalTasks = CHECKLIST_SECTIONS.reduce((sum, s) => sum + s.tasks.length, 0);
    const completedTasks = Object.values(checked).filter(Boolean).length;
    const progress = Math.round((completedTasks / totalTasks) * 100);

    return (
        <div className="onboarding-container">
            <div className="page-header">
                <h1>🆕 Bienvenue à la CNT/EPT !</h1>
                <p>Votre guide d'intégration étape par étape pour bien démarrer.</p>
            </div>

            {/* ── Bannière de bienvenue ── */}
            <div className="welcome-banner-card">
                <div className="welcome-text">
                    <h2>Félicitations pour votre arrivée 🎊</h2>
                    <p>
                        Toute l'équipe de la CNT/EPT est ravie de vous accueillir.
                        Ce guide vous accompagnera durant vos premiers jours pour une intégration réussie.
                        N'hésitez pas à contacter vos contacts clés pour toute question.
                    </p>
                    <button className="btn btn-primary">
                        <Play size={14} /> Regarder la vidéo de bienvenue
                    </button>
                </div>
                <div className="welcome-illustration" aria-hidden="true">🏢</div>
            </div>

            {/* ── Barre de progression ── */}
            <div className="progress-card card">
                <div className="progress-header">
                    <h3>Ma progression d'intégration</h3>
                    <span className="progress-label">{completedTasks}/{totalTasks} tâches</span>
                </div>
                <div className="progress-bar-wrap" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                    <div className="progress-bar" style={{ width: `${progress}%` }}>
                        <span className="progress-pct">{progress}%</span>
                    </div>
                </div>
                {progress === 100 && (
                    <div className="completion-badge">
                        <Award size={16} /> Intégration complète ! Bienvenue officiellement dans l'équipe 🎉
                    </div>
                )}
            </div>

            <div className="onboarding-grid">
                {/* ── Checklist ── */}
                <div className="checklist-column">
                    <h2 className="section-title"><CheckSquare size={18} /> Ma Checklist</h2>
                    {CHECKLIST_SECTIONS.map(section => {
                        const sectionDone = section.tasks.filter(t => checked[t.id]).length;
                        const isOpen = openSection === section.id;
                        return (
                            <div key={section.id} className="checklist-section">
                                <button
                                    className="checklist-header"
                                    onClick={() => setOpenSection(isOpen ? null : section.id)}
                                    aria-expanded={isOpen}
                                >
                                    <span className="section-icon">{section.icon}</span>
                                    <div className="section-info">
                                        <span className="section-title-text">{section.title}</span>
                                        <span className="section-progress">
                                            {sectionDone}/{section.tasks.length}
                                        </span>
                                    </div>
                                    <div
                                        className="section-mini-bar"
                                        style={{ '--fill': `${(sectionDone / section.tasks.length) * 100}%`, '--color': section.color }}
                                    />
                                    {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                                </button>
                                {isOpen && (
                                    <ul className="checklist-tasks">
                                        {section.tasks.map(task => (
                                            <li key={task.id} className={`task-item ${checked[task.id] ? 'done' : ''}`}>
                                                <button
                                                    className="task-check"
                                                    onClick={() => toggleTask(task.id)}
                                                    aria-label={checked[task.id] ? `Décocher : ${task.label}` : `Cocher : ${task.label}`}
                                                >
                                                    {checked[task.id]
                                                        ? <CheckSquare size={18} className="check-icon checked" />
                                                        : <Square size={18} className="check-icon" />
                                                    }
                                                </button>
                                                <span>{task.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* ── Sidebar droite ── */}
                <div className="onboarding-sidebar">
                    {/* Contacts Clés */}
                    <div className="card">
                        <h3><Star size={16} /> Contacts Clés</h3>
                        <p className="card-desc">Vos interlocuteurs privilégiés pour démarrer.</p>
                        <div className="key-contacts-list">
                            {KEY_CONTACTS.map(c => (
                                <div key={c.name} className="key-contact-item">
                                    <div
                                        className="kc-avatar"
                                        style={{ background: `linear-gradient(135deg, ${avatarColor(c.name)}, ${avatarColor(c.name)}99)` }}
                                    >
                                        {getInitials(c.name)}
                                    </div>
                                    <div className="kc-info">
                                        <strong>{c.name}</strong>
                                        <span className="kc-role">{c.role}</span>
                                        <span className="kc-topic">{c.topic}</span>
                                    </div>
                                    <a href={`tel:${c.phone}`} className="kc-call-btn" title="Appeler">
                                        <Phone size={14} />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Documents Essentiels */}
                    <div className="card">
                        <h3><FileText size={16} /> Documents Essentiels</h3>
                        <div className="essential-docs">
                            {ESSENTIAL_DOCS.map(doc => (
                                <div key={doc.name} className="essential-doc-item">
                                    <div className="doc-info">
                                        <span className="doc-name">{doc.name}</span>
                                        <span className="doc-meta">{doc.category} · {doc.size}</span>
                                    </div>
                                    <button className="doc-dl-btn" title="Télécharger">
                                        <FileText size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Outils Internes */}
                    <div className="card">
                        <h3><Monitor size={16} /> Vos Outils</h3>
                        <div className="tools-grid">
                            {TOOLS.map(tool => (
                                <a key={tool.name} href={tool.url} className="tool-card">
                                    <span className="tool-icon">{tool.icon}</span>
                                    <div>
                                        <span className="tool-name">{tool.name}</span>
                                        <span className="tool-desc">{tool.desc}</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Feedback ── */}
            <div className="feedback-row">
                <span>Ce guide d'onboarding vous a-t-il été utile ?</span>
                <button
                    className={`feedback-btn ${feedback === 'up' ? 'active' : ''}`}
                    onClick={() => setFeedback('up')}
                >
                    <ThumbsUp size={14} /> Oui
                </button>
                <button
                    className={`feedback-btn ${feedback === 'down' ? 'active' : ''}`}
                    onClick={() => setFeedback('down')}
                >
                    <ThumbsDown size={14} /> Non
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
