import React, { useState } from 'react';
import {
    Search, Mail, Phone, MapPin, User, ChevronRight,
    Star, MessageSquare, CheckCircle, Clock, XCircle
} from 'lucide-react';
import './Contacts.css';

// ── Données enrichies de l'annuaire ─────────────────────────────────────────
const CONTACTS_DATA = [
    {
        id: 1, name: 'YAO TOÏ Marcel', role: 'Coordonnateur',
        dept: 'COORDINATION CNT/EPT', email: 'marcel.yao@cnt-ept.org',
        phone: '+228 90 01 64 90', location: 'Lomé, Togo',
        skills: ['Management', 'Coordination', 'Planification'],
        status: 'available', isKey: true,
    },
    {
        id: 2, name: 'KOUDJI Sênamé Komla', role: 'Gestionnaire Comptable',
        dept: 'COORDINATION CNT/EPT', email: 'senamé.koudji@cnt-ept.org',
        phone: '+228 91 92 65 74', location: 'Lomé, Togo',
        skills: ['Comptabilité', 'Finance', 'Budget'],
        status: 'available', isKey: false,
    },
    {
        id: 3, name: 'HUMADO Dénise', role: 'Chargée de Programme',
        dept: 'COORDINATION CNT/EPT', email: 'denise.humado@cnt-ept.org',
        phone: '+228 91 57 86 35', location: 'Lomé, Togo',
        skills: ['Gestion de projet', 'RH', 'Formation'],
        status: 'away', isKey: false,
    },
    {
        id: 4, name: 'DIKENU Yvonne Adjoua Silva', role: 'Assistante Administrative',
        dept: 'COORDINATION CNT/EPT', email: 'yvonne.dikenu@cnt-ept.org',
        phone: '+228 90 15 30 99', location: 'Lomé, Togo',
        skills: ['Administration', 'Secrétariat', 'Protocole'],
        status: 'available', isKey: false,
    },
    {
        id: 5, name: 'KANITOM Kofi', role: 'Chef Projet EI',
        dept: 'COORDINATION CNT/EPT', email: 'kofi.kanitom@cnt-ept.org',
        phone: '+228 92 25 53 14', location: 'Lomé, Togo',
        skills: ['Chef de projet', 'IT', 'Infrastructure'],
        status: 'busy', isKey: true,
    },
    {
        id: 6, name: 'FAFANA Antarou', role: 'Gestionnaire Comptable Projet EI',
        dept: 'COORDINATION CNT/EPT', email: '',
        phone: '+228 90 96 51 69', location: 'Lomé, Togo',
        skills: ['Comptabilité Projet', 'Finance'],
        status: 'offline', isKey: false,
    },
    {
        id: 7, name: 'SOSSOU Teko', role: 'Chef Projet',
        dept: 'COORDINATION CNT/EPT', email: 'teko.sossou@cnt-ept.org',
        phone: '+228 91 23 07 76', location: 'Lomé, Togo',
        skills: ['Gestion de projet', 'Coordination', 'Suivi'],
        status: 'available', isKey: false,
    },
    {
        id: 8, name: 'HEZOU Juliette', role: 'Assistante Comptable',
        dept: 'COORDINATION CNT/EPT', email: 'toichezou@gmail.com',
        phone: '+228 90 79 66 21', location: 'Lomé, Togo',
        skills: ['Comptabilité', 'Assistanat'],
        status: 'available', isKey: false,
    },
    {
        id: 9, name: 'AIMEWOUNOU Folly', role: 'Coursier / Chauffeur Projet EI',
        dept: 'COORDINATION CNT/EPT', email: '',
        phone: '+228 90 93 85 79', location: 'Lomé, Togo',
        skills: ['Logistique', 'Transport'],
        status: 'away', isKey: false,
    },
    {
        id: 10, name: 'PAWI Hodalou', role: "Agent d'entretien",
        dept: 'COORDINATION CNT/EPT', email: '',
        phone: '+228 90 58 75 00', location: 'Lomé, Togo',
        skills: ['Entretien', 'Logistique'],
        status: 'available', isKey: false,
    },
    {
        id: 11, name: 'BOUENA Tchilabalo Hilaire', role: 'Agent de sécurité',
        dept: 'COORDINATION CNT/EPT', email: '',
        phone: '+228 91 98 30 01', location: 'Lomé, Togo',
        skills: ['Sécurité', 'Surveillance'],
        status: 'available', isKey: false,
    },
    {
        id: 12, name: 'KASSILE Alain', role: 'Stagiaire',
        dept: 'COORDINATION CNT/EPT', email: '',
        phone: '+228 92 02 05 54', location: 'Lomé, Togo',
        skills: ['Administration', 'Communication'],
        status: 'available', isKey: false,
    },
    {
        id: 13, name: 'BABA Rachida', role: 'Stagiaire',
        dept: 'COORDINATION CNT/EPT', email: '',
        phone: '+228 91 10 45 28', location: 'Lomé, Togo',
        skills: ['Informatique', 'Support'],
        status: 'offline', isKey: false,
    },
];

const STATUS_CONFIG = {
    available: { label: 'Disponible',   color: '#28a745', Icon: CheckCircle },
    away:      { label: 'Absent',       color: '#e67e22', Icon: Clock       },
    busy:      { label: 'Occupé',       color: '#e74c3c', Icon: XCircle     },
    offline:   { label: 'Hors ligne',   color: '#b0c4de', Icon: XCircle     },
};

const SKILL_FILTERS = ['Tous', 'Management', 'Comptabilité', 'IT', 'RH', 'Gestion de projet', 'Logistique', 'Sécurité'];

function getInitials(name) {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function avatarColor(name) {
    const colors = ['#0056b3','#28a745','#9b59b6','#e67e22','#1abc9c','#2980b9','#c0392b'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return colors[Math.abs(hash) % colors.length];
}

const ContactCard = ({ contact }) => {
    const status = STATUS_CONFIG[contact.status] || STATUS_CONFIG.offline;
    const { Icon } = status;

    return (
        <div className="contact-card">
            {/* Avatar */}
            <div className="contact-avatar-wrap">
                <div
                    className="contact-avatar"
                    style={{ background: `linear-gradient(135deg, ${avatarColor(contact.name)}, ${avatarColor(contact.name)}99)` }}
                    aria-hidden="true"
                >
                    {getInitials(contact.name)}
                </div>
                <span
                    className="status-dot"
                    title={status.label}
                    style={{ background: status.color }}
                />
                {contact.isKey && (
                    <span className="key-badge" title="Contact clé">
                        <Star size={9} fill="currentColor" />
                    </span>
                )}
            </div>

            {/* Info principale */}
            <div className="contact-main">
                <h3>{contact.name}</h3>
                <span className="contact-role">{contact.role}</span>
                <span className="contact-status" style={{ color: status.color }}>
                    <Icon size={11} /> {status.label}
                </span>
            </div>

            {/* Compétences */}
            {contact.skills.length > 0 && (
                <div className="contact-skills">
                    {contact.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                </div>
            )}

            {/* Coordonnées */}
            <div className="contact-details">
                {contact.email && (
                    <a href={`mailto:${contact.email}`} className="detail-item" title={contact.email}>
                        <Mail size={13} />
                        <span>{contact.email}</span>
                    </a>
                )}
                <div className="detail-item">
                    <Phone size={13} />
                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
                {contact.location && (
                    <div className="detail-item">
                        <MapPin size={13} />
                        <span>{contact.location}</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="contact-actions">
                {contact.email && (
                    <a href={`mailto:${contact.email}`} className="contact-action-btn primary">
                        <Mail size={14} /> Contacter
                    </a>
                )}
                <a href={`tel:${contact.phone}`} className="contact-action-btn secondary">
                    <Phone size={14} /> Appeler
                </a>
            </div>
        </div>
    );
};

const Contacts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeSkill, setActiveSkill] = useState('Tous');
    const [showKeyOnly, setShowKeyOnly] = useState(false);

    const filtered = CONTACTS_DATA.filter(contact => {
        const matchSearch =
            contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchSkill =
            activeSkill === 'Tous' ||
            contact.skills.some(s => s.toLowerCase().includes(activeSkill.toLowerCase()));
        const matchKey = !showKeyOnly || contact.isKey;
        return matchSearch && matchSkill && matchKey;
    });

    return (
        <div className="contacts-container">
            <div className="page-header">
                <h1><User size={22} /> Annuaire Interne</h1>
                <p>Retrouvez et contactez facilement vos collègues de la CNT/EPT.</p>
            </div>

            {/* ── Filtres Compétences ── */}
            <div className="chip-group">
                {SKILL_FILTERS.map(skill => (
                    <button
                        key={skill}
                        className={`chip ${activeSkill === skill ? 'active' : ''}`}
                        onClick={() => setActiveSkill(skill)}
                    >
                        {skill}
                    </button>
                ))}
                <button
                    className={`chip ${showKeyOnly ? 'active' : ''}`}
                    onClick={() => setShowKeyOnly(p => !p)}
                >
                    <Star size={12} fill={showKeyOnly ? 'currentColor' : 'none'} /> Contacts clés
                </button>
            </div>

            {/* ── Barre de Recherche ── */}
            <div className="contacts-actions">
                <div className="search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, rôle, compétence…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <span className="results-count">
                    {filtered.length} contact{filtered.length > 1 ? 's' : ''}
                </span>
            </div>

            {/* ── Grille ── */}
            {filtered.length === 0 ? (
                <div className="contacts-empty">
                    <User size={36} />
                    <p>Aucun contact ne correspond à votre recherche.</p>
                </div>
            ) : (
                <div className="contacts-grid">
                    {filtered.map((contact) => (
                        <ContactCard key={contact.id} contact={contact} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Contacts;
