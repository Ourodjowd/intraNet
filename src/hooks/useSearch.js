import { useState, useMemo, useCallback } from 'react';

// ── Corpus de recherche global ──────────────────────────────────────────────
// Ajouter de nouvelles entrées ici pour étendre l'index de recherche
const SEARCH_INDEX = [
  // Pages principales
  { id: 'p1', title: 'Dashboard', category: 'Page', path: '/', icon: '🏠', description: 'Tableau de bord principal' },
  { id: 'p2', title: 'Actualités & Annonces', category: 'Page', path: '/news', icon: '📰', description: 'Dernières nouvelles de la CNT/EPT' },
  { id: 'p3', title: 'Documents Internes', category: 'Page', path: '/documents', icon: '📂', description: 'Documents officiels, formulaires et guides' },
  { id: 'p4', title: 'Annuaire Interne', category: 'Page', path: '/contacts', icon: '👥', description: 'Répertoire des collaborateurs' },
  { id: 'p5', title: 'Services', category: 'Page', path: '/services', icon: '🔧', description: 'Outils et services internes' },
  { id: 'p6', title: 'Onboarding', category: 'Page', path: '/onboarding', icon: '🆕', description: 'Guide nouveaux arrivants' },
  { id: 'p7', title: 'Vie au Bureau', category: 'Page', path: '/vie-au-bureau', icon: '🏢', description: 'Infos pratiques du quotidien' },

  // Actualités
  { id: 'n1', title: 'Lancement du Programme de Formation 2026', category: 'Actualité', path: '/news', icon: '🎓', description: 'Montée en compétences CNT/EPT' },
  { id: 'n2', title: 'Modernisation des infrastructures réseau', category: 'Actualité', path: '/news', icon: '🌐', description: 'Travaux de maintenance réseau' },
  { id: 'n3', title: 'Campagne de sensibilisation HSE', category: 'Actualité', path: '/news', icon: '⚠️', description: 'Sécurité au travail' },

  // Documents
  { id: 'd1', title: 'Rapport Annuel 2025', category: 'Document', path: '/documents', icon: '📄', description: 'Finance · 2.4 MB' },
  { id: 'd2', title: "Guide de l'Employé", category: 'Document', path: '/documents', icon: '📋', description: 'RH · 1.8 MB' },
  { id: 'd3', title: 'Procédure Sécurité IT', category: 'Document', path: '/documents', icon: '🔒', description: 'IT · 450 KB' },
  { id: 'd4', title: 'Template Présentation', category: 'Document', path: '/documents', icon: '📊', description: 'Com · 3.1 MB' },

  // Contacts
  { id: 'c1', title: 'YAO TOÏ Marcel', category: 'Contact', path: '/contacts', icon: '👤', description: 'Coordonnateur · CNT/EPT' },
  { id: 'c2', title: 'KOUDJI Sênamé Komla', category: 'Contact', path: '/contacts', icon: '👤', description: 'Gestionnaire Comptable · CNT/EPT' },
  { id: 'c3', title: 'HUMADO Dénise', category: 'Contact', path: '/contacts', icon: '👤', description: 'Chargée de Programme · CNT/EPT' },
  { id: 'c4', title: 'KANITOM Kofi', category: 'Contact', path: '/contacts', icon: '👤', description: 'Chef Projet EI · CNT/EPT' },
  { id: 'c5', title: 'SOSSOU Teko', category: 'Contact', path: '/contacts', icon: '👤', description: 'Chef Projet · CNT/EPT' },
];

const MAX_RESULTS = 6;

/**
 * useSearch — Hook de recherche globale
 * @returns { query, setQuery, results, clearSearch, isOpen }
 */
export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    return SEARCH_INDEX
      .filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
      .slice(0, MAX_RESULTS);
  }, [query]);

  const clearSearch = useCallback(() => setQuery(''), []);
  const isOpen = query.trim().length >= 2;

  return { query, setQuery, results, clearSearch, isOpen };
}

export default useSearch;
