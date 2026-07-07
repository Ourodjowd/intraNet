import React from 'react';
import { Briefcase, Users, Shield, Cpu, Landmark, Headphones, ChevronRight, ExternalLink } from 'lucide-react';
import './Services.css';

const Services = () => {
    const departments = [
        {
            title: 'Direction Générale',
            icon: <Landmark size={30} />,
            description: 'Management stratégique et pilotage de l\'organisation.',
            lead: 'YAO TOÏ Marcel',
            contact: '+228 90 01 64 90'
        },
        {
            title: 'Direction Financière',
            icon: <Briefcase size={30} />,
            description: 'Comptabilité, budget et gestion financière.',
            lead: 'KOUDJI Sênamé Komla',
            contact: '+228 91 92 65 74'
        },
        {
            title: 'Ressources Humaines',
            icon: <Users size={30} />,
            description: 'Gestion des carrières, paie, formation et recrutement.',
            lead: 'DIKENU Yvonne Adjoua Silva',
            contact: '+228 90 15 30 99'
        },
        {
            title: 'Coordination Projets',
            icon: <Cpu size={30} />,
            description: 'Coordination et gestion des projets de développement.',
            lead: 'KANITOM Kofi',
            contact: '+228 92 25 53 14'
        },
        {
            title: 'Programmes et Partenariats',
            icon: <Headphones size={30} />,
            description: 'Relations publiques, événements et partenariats.',
            lead: 'HUMADO Dénise',
            contact: '+228 91 57 86 35'
        },
        {
            title: 'Sécurité & Hygiène',
            icon: <Shield size={30} />,
            description: 'Prévention des risques, environnement et cadre de travail.',
            lead: 'BOUENA Tchilabalo Hilaire',
            contact: '+228 91 98 30 01'
        },
    ];

    return (
        <div className="services-container">
            <div className="page-header">
                <h1>Nos Services</h1>
                <p>Découvrez l'organisation de la CNT/EPT et accédez aux ressources de chaque département.</p>
            </div>

            <div className="services-grid">
                {departments.map((dept, idx) => (
                    <div key={idx} className="service-card">
                        <div className="service-header">
                            <div className="service-icon">{dept.icon}</div>
                            <h3>{dept.title}</h3>
                        </div>
                        <p className="service-desc">{dept.description}</p>
                        <div className="service-info">
                            <div className="info-item">
                                <strong>Responsable:</strong>
                                <span>{dept.lead}</span>
                            </div>
                            <div className="info-item">
                                <strong>Contact:</strong>
                                <span>{dept.contact}</span>
                            </div>
                        </div>
                        <div className="service-footer">
                            <button className="dept-btn">
                                Aller au département <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="org-chart-section">
                <div className="org-chart-banner">
                    <div className="banner-content">
                        <h2>Organigramme de la CNT/EPT</h2>
                        <p>Visualisez la structure hiérarchique et fonctionnelle de notre organisation.</p>
                        <button className="btn btn-primary">
                            Consulter l'organigramme <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
