import React, { useState } from 'react';
import {
    FileText, Download, Search, File, FileCode, FileImage,
    AlertTriangle, CheckCircle, Clock, Upload, RefreshCw, ThumbsUp, ThumbsDown
} from 'lucide-react';
import './Documents.css';

// ── Données enrichies avec cycle de vie ─────────────────────────────────────
const INITIAL_DOCUMENTS_DATA = [
    {
        id: 1,
        name: 'Rapport Annuel 2022.pdf',
        size: '1.2 MB',
        type: 'PDF',
        date: '15 Jan 2026',
        category: 'Finance',
        owner: 'Jean Dupont',
        reviewDate: '2026-01-15',  // < 12 mois → VALIDE
        status: 'valid',
        downloads: 15,
        url: '/Rapport_Annuel_2022.pdf'
    },
    {
        id: 2,
        name: "Guide de l'Employé.pdf",
        size: '1.8 MB',
        type: 'PDF',
        date: '02 Jan 2026',
        category: 'RH',
        owner: 'HUMADO Dénise',
        reviewDate: '2026-01-02',
        status: 'valid',
        downloads: 132,
        url: '#'
    },
    {
        id: 3,
        name: 'Procédure Sécurité IT.docx',
        size: '450 KB',
        type: 'DOCX',
        date: '20 Dec 2024',
        category: 'IT',
        owner: 'KANITOM Kofi',
        reviewDate: '2024-12-20',  // > 12 mois → OBSOLÈTE
        status: 'obsolete',
        downloads: 23,
        url: '#'
    },
    {
        id: 4,
        name: 'Logo_CNT_EPT_HD.png',
        size: '5.2 MB',
        type: 'IMAGE',
        date: '10 Dec 2025',
        category: 'Com',
        owner: 'DIKENU Yvonne',
        reviewDate: '2025-12-10',
        status: 'valid',
        downloads: 88,
        url: '#'
    },
    {
        id: 5,
        name: 'Template Présentation.pptx',
        size: '3.1 MB',
        type: 'PPTX',
        date: '05 Dec 2025',
        category: 'Com',
        owner: 'SOSSOU Teko',
        reviewDate: '2025-12-05',
        status: 'valid',
        downloads: 61,
        url: '#'
    },
    {
        id: 6,
        name: 'Bilan HSE 2024.pdf',
        size: '1.2 MB',
        type: 'PDF',
        date: '10 Mar 2024',
        category: 'HSE',
        owner: 'KOUDJI Sênamé',
        reviewDate: '2024-03-10',  // > 12 mois → OBSOLÈTE
        status: 'obsolete',
        downloads: 14,
        url: '#'
    },
];

const CATEGORIES = ['Tous', 'Finance', 'RH', 'IT', 'Com', 'HSE'];
const STATUS_FILTERS = ['Tous', 'Valides', 'À réviser'];

function getDocumentStatus(doc) {
    const reviewDate = new Date(doc.reviewDate);
    const now = new Date();
    const monthsElapsed = (now - reviewDate) / (1000 * 60 * 60 * 24 * 30);
    if (doc.status === 'archived') return 'archived';
    if (monthsElapsed > 12) return 'obsolete';
    if (monthsElapsed > 9) return 'review-soon';
    return 'valid';
}

function StatusBadge({ doc }) {
    const status = getDocumentStatus(doc);
    const configs = {
        valid:        { label: 'Valide',       className: 'badge badge-success', Icon: CheckCircle },
        'review-soon':{ label: 'À réviser',    className: 'badge badge-warning', Icon: Clock },
        obsolete:     { label: 'Obsolète',     className: 'badge badge-danger',  Icon: AlertTriangle },
        archived:     { label: 'Archivé',      className: 'badge badge-neutral', Icon: File },
    };
    const { label, className, Icon } = configs[status] || configs.valid;
    return (
        <span className={className} title={`Dernière révision : ${doc.date}`}>
            <Icon size={11} /> {label}
        </span>
    );
}

function getFileIcon(type) {
    switch (type) {
        case 'PDF':   return <FileText className="doc-type-icon pdf" />;
        case 'IMAGE': return <FileImage className="doc-type-icon img" />;
        case 'DOCX':  return <FileCode className="doc-type-icon doc" />;
        default:      return <File className="doc-type-icon" />;
    }
}

const Documents = () => {
    const [documents, setDocuments] = useState(INITIAL_DOCUMENTS_DATA);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [activeStatus, setActiveStatus] = useState('Tous');
    const [feedback, setFeedback] = useState({});
    const [flagged, setFlagged] = useState({});

    const filtered = documents.filter(doc => {
        const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            doc.owner.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = activeCategory === 'Tous' || doc.category === activeCategory;
        const status = getDocumentStatus(doc);
        const matchStatus =
            activeStatus === 'Tous' ||
            (activeStatus === 'Valides' && status === 'valid') ||
            (activeStatus === 'À réviser' && (status === 'obsolete' || status === 'review-soon'));
        return matchSearch && matchCat && matchStatus;
    });

    const obsoleteCount = documents.filter(d => getDocumentStatus(d) !== 'valid').length;

    const handleFeedback = (id, type) => {
        setFeedback(prev => ({ ...prev, [id]: type }));
    };

    const handleFlag = (id) => {
        setFlagged(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleDownload = (doc) => {
        // Incrémente le compteur de téléchargement dynamiquement dans l'état local
        setDocuments(prevDocs =>
            prevDocs.map(d =>
                d.id === doc.id ? { ...d, downloads: d.downloads + 1 } : d
            )
        );

        // Lance le téléchargement réel s'il y a un lien valide
        if (doc.url && doc.url !== '#') {
            const link = document.createElement('a');
            link.href = doc.url;
            link.download = doc.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="documents-container">
            <div className="page-header">
                <h1><FileText size={22} /> Documents Internes</h1>
                <p>Accédez à tous les documents officiels, formulaires et guides de la CNT/EPT.</p>
            </div>

            {/* ── Alerte obsolescence ── */}
            {obsoleteCount > 0 && (
                <div className="obsolete-alert" role="alert">
                    <AlertTriangle size={16} />
                    <span>
                        <strong>{obsoleteCount} document{obsoleteCount > 1 ? 's' : ''}</strong> nécessite{obsoleteCount > 1 ? 'nt' : ''} une révision (plus de 12 mois sans mise à jour).
                    </span>
                </div>
            )}

            {/* ── Filtres Catégorie ── */}
            <div className="chip-group">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        className={`chip ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── Actions ── */}
            <div className="docs-actions">
                <div className="search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, catégorie ou propriétaire…"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="status-filter">
                    {STATUS_FILTERS.map(s => (
                        <button
                            key={s}
                            className={`chip ${activeStatus === s ? 'active' : ''}`}
                            onClick={() => setActiveStatus(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
                <button className="btn btn-primary upload-btn">
                    <Upload size={15} /> Ajouter un document
                </button>
            </div>

            {/* ── Tableau ── */}
            <div className="docs-table-container">
                {filtered.length === 0 ? (
                    <div className="docs-empty">
                        <File size={36} />
                        <p>Aucun document ne correspond à votre recherche.</p>
                    </div>
                ) : (
                    <table className="docs-table">
                        <thead>
                            <tr>
                                <th>Nom du fichier</th>
                                <th>Catégorie</th>
                                <th>Propriétaire</th>
                                <th>Taille</th>
                                <th>Dernière révision</th>
                                <th>Statut</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((doc) => {
                                const isObsolete = getDocumentStatus(doc) !== 'valid';
                                return (
                                    <tr key={doc.id} className={isObsolete ? 'row-obsolete' : ''}>
                                        <td>
                                            <div className="file-info">
                                                {getFileIcon(doc.type)}
                                                <div>
                                                    <span className="file-name">{doc.name}</span>
                                                    <span className="file-downloads">
                                                        <Download size={10} /> {doc.downloads} téléchargements
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span className="cat-badge">{doc.category}</span></td>
                                        <td className="owner-cell">{doc.owner}</td>
                                        <td className="size-cell">{doc.size}</td>
                                        <td className="date-cell">{doc.date}</td>
                                        <td><StatusBadge doc={doc} /></td>
                                        <td>
                                            <div className="doc-actions">
                                                <button
                                                    className="action-btn download"
                                                    title="Télécharger"
                                                    onClick={() => handleDownload(doc)}
                                                >
                                                    <Download size={15} />
                                                </button>
                                                {isObsolete && (
                                                    <button
                                                        className={`action-btn flag ${flagged[doc.id] ? 'flagged' : ''}`}
                                                        title={flagged[doc.id] ? 'Signalement envoyé' : 'Signaler comme obsolète'}
                                                        onClick={() => handleFlag(doc.id)}
                                                    >
                                                        <AlertTriangle size={15} />
                                                    </button>
                                                )}
                                                <button className="action-btn refresh" title="Demander une révision">
                                                    <RefreshCw size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {/* ── Feedback Utilité ── */}
            <div className="feedback-row">
                <span>Cette page vous a-t-elle été utile ?</span>
                <button
                    className={`feedback-btn ${feedback['docs-page'] === 'up' ? 'active' : ''}`}
                    onClick={() => handleFeedback('docs-page', 'up')}
                >
                    <ThumbsUp size={14} /> Oui
                </button>
                <button
                    className={`feedback-btn ${feedback['docs-page'] === 'down' ? 'active' : ''}`}
                    onClick={() => handleFeedback('docs-page', 'down')}
                >
                    <ThumbsDown size={14} /> Non
                </button>
            </div>
        </div>
    );
};

export default Documents;
