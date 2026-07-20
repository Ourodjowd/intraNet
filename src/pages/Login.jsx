import React, { useState } from 'react';
import { Lock, Mail, ChevronRight, AlertCircle, Loader } from 'lucide-react';
import { findUser } from '../data/users';
import './Login.css';

const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes

const Login = ({ onLogin }) => {
    const [identifier, setIdentifier] = useState('');   // email ou username
    const [password, setPassword]     = useState('');
    const [error, setError]           = useState('');
    const [loading, setLoading]       = useState(false);
    const [attempts, setAttempts]     = useState(0);
    const [lockedUntil, setLockedUntil] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    // Calcule si le compte est verrouillé
    const isLocked = lockedUntil && Date.now() < lockedUntil;
    const lockRemaining = isLocked
        ? Math.ceil((lockedUntil - Date.now()) / 60000)
        : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Vérification du verrouillage
        if (isLocked) {
            setError(`Compte temporairement bloqué. Réessayez dans ${lockRemaining} min.`);
            return;
        }

        // Validation basique
        if (!identifier.trim() || !password.trim()) {
            setError('Veuillez remplir tous les champs.');
            return;
        }

        setLoading(true);

        // Délai simulé (remplacer par un vrai appel API en production)
        await new Promise((res) => setTimeout(res, 800));

        const user = findUser(identifier, password);

        if (user) {
            // ✅ Connexion réussie
            setAttempts(0);
            setLockedUntil(null);
            onLogin(user);
        } else {
            // ❌ Echec — incrémenter le compteur
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= MAX_ATTEMPTS) {
                setLockedUntil(Date.now() + LOCK_DURATION_MS);
                setError(`Trop de tentatives (${MAX_ATTEMPTS}/${MAX_ATTEMPTS}). Compte bloqué 15 min.`);
            } else {
                const remaining = MAX_ATTEMPTS - newAttempts;
                setError(
                    `Email/nom d'utilisateur ou mot de passe incorrect. ${remaining} tentative${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}.`
                );
            }
        }

        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-placeholder">CNT / EPT</div>
                    <h1>Portail Intranet</h1>
                    <p>Connectez-vous pour accéder à votre espace de travail.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form" noValidate>

                    {/* Message d'erreur */}
                    {error && (
                        <div className="login-error" role="alert">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Champ Email ou Username */}
                    <div className="form-group">
                        <label htmlFor="login-identifier">Email ou nom d'utilisateur</label>
                        <div className={`input-with-icon ${error && !isLocked ? 'input-error' : ''}`}>
                            <Mail size={18} />
                            <input
                                id="login-identifier"
                                type="text"
                                placeholder="nom@cnt-ept.org  ou  j.dupont"
                                value={identifier}
                                onChange={(e) => { setIdentifier(e.target.value); setError(''); }}
                                disabled={loading || isLocked}
                                autoComplete="username"
                                required
                            />
                        </div>
                    </div>

                    {/* Champ Mot de passe */}
                    <div className="form-group">
                        <label htmlFor="login-password">Mot de passe</label>
                        <div className={`input-with-icon ${error && !isLocked ? 'input-error' : ''}`}>
                            <Lock size={18} />
                            <input
                                id="login-password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                                disabled={loading || isLocked}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="form-footer">
                        <label className="remember-me" htmlFor="remember">
                            <input id="remember" type="checkbox" />
                            <span>Se souvenir de moi</span>
                        </label>
                        <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                    </div>

                    {/* Bouton */}
                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading || isLocked}
                        id="login-submit-btn"
                    >
                        {loading
                            ? <><Loader size={18} className="spin" /> Vérification…</>
                            : <>Se connecter <ChevronRight size={18} /></>
                        }
                    </button>
                </form>

                <div className="login-footer">
                    <p>© 2026 CNT/EPT - Service Communication</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
