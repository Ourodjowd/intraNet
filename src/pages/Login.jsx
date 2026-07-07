import React, { useState } from 'react';
import { Lock, Mail, ChevronRight } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate login
        onLogin();
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-placeholder">CNT / EPT</div>
                    <h1>Portail Intranet</h1>
                    <p>Connectez-vous pour accéder à votre espace de travail.</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Adresse E-mail</label>
                        <div className="input-with-icon">
                            <Mail size={18} />
                            <input
                                type="email"
                                placeholder="nom@cnt-ept.org"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Mot de passe</label>
                        <div className="input-with-icon">
                            <Lock size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-footer">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Se souvenir de moi</span>
                        </label>
                        <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                    </div>

                    <button type="submit" className="login-btn">
                        Se connecter <ChevronRight size={18} />
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
