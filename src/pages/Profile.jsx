import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Clock, Edit3, Camera } from 'lucide-react';
import './Profile.css';

const Profile = ({ currentUser }) => {
    // Données réelles du user connecté (fallback si prop absente)
    const user = currentUser ?? {
        nom: '—',
        role: '—',
        dept: '—',
        email: '—',
        phone: '—',
        address: '—',
        joined: '—',
        bio: '',
    };

    return (
        <div className="profile-container">
            <div className="profile-header-card">
                <div className="profile-cover"></div>
                <div className="profile-main-info">
                    <div className="profile-avatar-container">
                        <div className="profile-avatar">
                            <User size={60} />
                        </div>
                        <button className="change-photo-btn"><Camera size={18} /></button>
                    </div>
                    <div className="profile-text-info">
                        <h1>{user.nom}</h1>
                        <p className="profile-role">{user.role}</p>
                        <div className="profile-labels">
                            <span className="label-badge primary">{user.dept}</span>
                            <span className="label-badge secondary">Actif</span>
                        </div>
                    </div>
                    <button className="edit-profile-btn">
                        <Edit3 size={18} /> Modifier le profil
                    </button>
                </div>
            </div>

            <div className="profile-grid">
                <div className="profile-content-section">
                    <div className="card">
                        <h2>À propos</h2>
                        <p className="bio-text">{user.bio}</p>
                        <div className="info-list">
                            <div className="info-item">
                                <Mail size={18} />
                                <div>
                                    <strong>E-mail professionnel</strong>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <Phone size={18} />
                                <div>
                                    <strong>Téléphone</strong>
                                    <p>{user.phone}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <MapPin size={18} />
                                <div>
                                    <strong>Localisation</strong>
                                    <p>{user.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile-side-section">
                    <div className="card">
                        <h2>Détails du compte</h2>
                        <div className="account-details">
                            <div className="acc-item">
                                <Shield size={18} />
                                <span>Rôle: {user.role}</span>
                            </div>
                            <div className="acc-item">
                                <Clock size={18} />
                                <span>Membre depuis: {user.joined}</span>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h2>Paramètres rapides</h2>
                        <div className="settings-links">
                            <button className="settings-btn">Changer le mot de passe</button>
                            <button className="settings-btn">Notifications</button>
                            <button className="settings-btn">Préférences d'affichage</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
