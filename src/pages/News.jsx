import React, { useState } from 'react';
import { Newspaper, Calendar, Tag, ChevronRight, Search } from 'lucide-react';
import './News.css';

const News = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const newsItems = [
        {
            id: 1,
            title: 'Lancement du nouveau Programme de Formation 2026',
            summary: 'La CNT/EPT annonce le lancement d\'un vaste programme de montée en compétences pour l\'ensemble de ses collaborateurs.',
            date: '27 Jan 2026',
            category: 'Formation',
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 2,
            title: 'Modernisation des infrastructures réseau',
            summary: 'Des travaux de maintenance et d\'amélioration de la connectivité seront effectués durant le week-end prochain.',
            date: '24 Jan 2026',
            category: 'IT / Technique',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 3,
            title: 'Succès de la campagne de sensibilisation HSE',
            summary: 'Le bilan de la semaine de la sécurité au travail montre une forte adhésion des agents aux nouvelles procédures.',
            date: '20 Jan 2026',
            category: 'HSE',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80'
        },
    ];

    const filteredNews = newsItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="news-container">
            <div className="page-header">
                <h1>Actualités & Annonces</h1>
                <p>Restez informé des dernières nouvelles et décisions au sein de la CNT/EPT.</p>
            </div>

            <div className="news-actions">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Rechercher une actualité..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="news-grid">
                {filteredNews.map((item) => (
                    <article key={item.id} className="news-card">
                        <div className="news-image">
                            <img src={item.image} alt={item.title} />
                            <span className="news-cat-tag">{item.category}</span>
                        </div>
                        <div className="news-content">
                            <div className="news-meta">
                                <Calendar size={14} />
                                <span>{item.date}</span>
                            </div>
                            <h2>{item.title}</h2>
                            <p>{item.summary}</p>
                            <button className="read-more-btn">
                                Lire l'article <ChevronRight size={16} />
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default News;
