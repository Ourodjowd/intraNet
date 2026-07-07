import React, { useState } from 'react';
import {
    Coffee, Calendar, MapPin, Car, HelpCircle, Clock,
    Phone, ExternalLink, CheckCircle, ChevronRight,
    Utensils, Wifi, Printer, AlertTriangle
} from 'lucide-react';
import './VieAuBureau.css';

// ── Données ──────────────────────────────────────────────────────────────────
const MENU_SEMAINE = [
    { day: 'Lundi',    menu: 'Riz sauce arachide + Poisson · Eau ou jus inclus', open: true  },
    { day: 'Mardi',    menu: 'Pâtes bolognaise + Salade verte',                  open: true  },
    { day: 'Mercredi', menu: 'Riz cantonais + Brochettes de poulet',             open: true  },
    { day: 'Jeudi',    menu: 'Yam pilé + Sauce graine',                          open: true  },
    { day: 'Vendredi', menu: 'Spécial du chef + Dessert maison',                 open: true  },
];

const SALLES = [
    { name: 'Salle A — Conférence',  capacity: 20, floor: 'RDC', available: true  },
    { name: 'Salle B — Réunion',     capacity: 8,  floor: '1er', available: false },
    { name: 'Salle C — Formation',   capacity: 30, floor: 'RDC', available: true  },
    { name: 'Bureau Direction',      capacity: 4,  floor: '2ème',available: false },
];

const FAQ_IT = [
    { q: "Comment réinitialiser mon mot de passe ?",    a: "Contactez le support IT au poste 100 ou envoyez un ticket via le portail IT." },
    { q: "Imprimante en panne — que faire ?",           a: "Redémarrez l'imprimante (bouton arrière). Si ça persiste, créez un ticket IT." },
    { q: "Accès au Wi-Fi visiteur ?",                   a: "Réseau : CNT-EPT-GUEST · Mot de passe : Affiché à l'accueil." },
    { q: "Comment accéder aux ressources réseau ?",     a: "Connectez-vous via VPN avec vos identifiants professionnels." },
];

const EVENTS = [
    { date: '29 JAN', title: 'Formation Cybersécurité',       time: '14:00', room: 'Salle A', type: 'Formation' },
    { date: '01 FEV', title: 'Réunion de coordination',        time: '09:30', room: 'Salle B', type: 'Réunion'  },
    { date: '05 FEV', title: 'Café rencontre inter-services',  time: '10:00', room: 'Cafétéria', type: 'Social' },
    { date: '12 FEV', title: 'Atelier Formation Digital',      time: '08:30', room: 'Salle C', type: 'Formation' },
];

const QUICK_SERVICES = [
    { icon: <Phone size={20} />,    label: 'Support IT',        sub: 'Poste 100',          color: '#2980b9', href: 'tel:100'    },
    { icon: <Coffee size={20} />,   label: 'Cafétéria',         sub: '12h00 – 14h00',      color: '#e67e22', href: '#'          },
    { icon: <Printer size={20} />,  label: 'Impression',        sub: 'Réseau: CNT-PRINT',  color: '#9b59b6', href: '#'          },
    { icon: <Wifi size={20} />,     label: 'Wi-Fi Visiteur',    sub: 'Demander à l\'accueil',color: '#1abc9c', href: '#'         },
];

const EVENT_TYPE_COLOR = {
    Formation: 'badge-info',
    Réunion:   'badge-warning',
    Social:    'badge-success',
};

const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long' });
const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

const VieAuBureau = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [reservingRoom, setReservingRoom] = useState(null);

    return (
        <div className="vie-container">
            <div className="page-header">
                <h1>🏢 Vie au Bureau</h1>
                <p>Toutes les infos pratiques pour votre quotidien à la CNT/EPT.</p>
            </div>

            {/* ── Services Rapides ── */}
            <div className="quick-services-grid">
                {QUICK_SERVICES.map(s => (
                    <a key={s.label} href={s.href} className="quick-service-card">
                        <div className="qs-icon" style={{ background: `${s.color}18`, color: s.color }}>
                            {s.icon}
                        </div>
                        <div>
                            <span className="qs-label">{s.label}</span>
                            <span className="qs-sub">{s.sub}</span>
                        </div>
                        <ChevronRight size={16} className="qs-arrow" />
                    </a>
                ))}
            </div>

            <div className="vie-grid">
                {/* ── Menu Cafétéria ── */}
                <div className="card menu-card">
                    <h2><Utensils size={18} /> Menu de la Semaine</h2>
                    <p className="card-sub">Cafétéria ouverte de 12h00 à 14h00 · Du lundi au vendredi</p>
                    <div className="menu-list">
                        {MENU_SEMAINE.map((item) => {
                            const isToday = item.day.toLowerCase() === today.split(' ')[0].toLowerCase();
                            return (
                                <div key={item.day} className={`menu-item ${isToday ? 'today' : ''}`}>
                                    <div className="menu-day">
                                        <span>{item.day}</span>
                                        {isToday && <span className="today-badge">Aujourd'hui</span>}
                                    </div>
                                    <span className="menu-dish">{item.menu}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ── Réservation Salles ── */}
                <div className="card rooms-card">
                    <h2><MapPin size={18} /> Salles de Réunion</h2>
                    <p className="card-sub">Disponibilité en temps réel</p>
                    <div className="rooms-list">
                        {SALLES.map((room) => (
                            <div key={room.name} className={`room-item ${room.available ? 'available' : 'occupied'}`}>
                                <div className="room-info">
                                    <span className="room-name">{room.name}</span>
                                    <span className="room-meta">
                                        {room.floor} · <span>{room.capacity} pers.</span>
                                    </span>
                                </div>
                                <div className="room-status-wrap">
                                    {room.available ? (
                                        <>
                                            <span className="badge badge-success">
                                                <CheckCircle size={10} /> Libre
                                            </span>
                                            <button
                                                className="reserve-btn"
                                                onClick={() => setReservingRoom(room.name)}
                                                title="Réserver"
                                            >
                                                Réserver
                                            </button>
                                        </>
                                    ) : (
                                        <span className="badge badge-danger">
                                            <Clock size={10} /> Occupée
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    {reservingRoom && (
                        <div className="reservation-confirm">
                            <CheckCircle size={14} />
                            Demande de réservation envoyée pour <strong>{reservingRoom}</strong>.
                            <button onClick={() => setReservingRoom(null)}>✕</button>
                        </div>
                    )}
                </div>

                {/* ── Événements ── */}
                <div className="card events-card">
                    <h2><Calendar size={18} /> Événements à Venir</h2>
                    <div className="events-list">
                        {EVENTS.map((evt) => (
                            <div key={evt.title} className="event-item">
                                <div className="event-date-badge">
                                    <span className="evt-date">{evt.date.split(' ')[0]}</span>
                                    <span className="evt-month">{evt.date.split(' ')[1]}</span>
                                </div>
                                <div className="event-info">
                                    <span className="event-title">{evt.title}</span>
                                    <span className="event-meta">
                                        <Clock size={11} /> {evt.time} · <MapPin size={11} /> {evt.room}
                                    </span>
                                </div>
                                <span className={`badge ${EVENT_TYPE_COLOR[evt.type] || 'badge-neutral'}`}>
                                    {evt.type}
                                </span>
                            </div>
                        ))}
                    </div>
                    <a href="/services" className="see-all-link">
                        Voir tous les événements <ChevronRight size={14} />
                    </a>
                </div>

                {/* ── FAQ IT / Support ── */}
                <div className="card faq-card">
                    <h2><HelpCircle size={18} /> Support & FAQ IT</h2>
                    <p className="card-sub">Réponses aux questions les plus fréquentes</p>
                    <div className="faq-list">
                        {FAQ_IT.map((item, idx) => (
                            <div key={idx} className="faq-item">
                                <button
                                    className={`faq-question ${openFaq === idx ? 'open' : ''}`}
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                    aria-expanded={openFaq === idx}
                                >
                                    <HelpCircle size={14} />
                                    <span>{item.q}</span>
                                    <ChevronRight size={14} className="faq-arrow" />
                                </button>
                                {openFaq === idx && (
                                    <div className="faq-answer">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    <a href="#" className="btn btn-secondary support-btn">
                        <Phone size={14} /> Créer un ticket support
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VieAuBureau;
