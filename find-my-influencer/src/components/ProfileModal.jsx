import React from 'react';
import { X, Instagram, Youtube, Video } from 'lucide-react';

const PlatformIcon = ({ platform }) => {
    switch (platform.toLowerCase()) {
        case 'instagram': return <Instagram size={20} />;
        case 'youtube': return <Youtube size={20} />;
        case 'tiktok': return <Video size={20} />;
        default: return null;
    }
};

const ProfileModal = ({ influencer, onClose }) => {
    if (!influencer) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-grid">
                    <div className="modal-image-col">
                        <img
                            src={`/src/assets/influencers/${influencer.image}`}
                            alt={influencer.name}
                            className="modal-image"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=No+Image'; }}
                        />
                    </div>

                    <div className="modal-info-col">
                        <div className="modal-header">
                            <h2 className="modal-handle">@{influencer.handle}</h2>
                            <h3 className="modal-name">{influencer.name}</h3>
                            <div className="modal-platforms">
                                {influencer.platform.map(p => (
                                    <span key={p} className="platform-pill">
                                        <PlatformIcon platform={p} /> {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="info-section">
                                <h4>Bio & Strengths</h4>
                                <p>{influencer.bio}</p>
                            </div>

                            {influencer.tags && influencer.tags.length > 0 && (
                                <div className="info-section">
                                    <h4>Tags</h4>
                                    <div className="modal-tags">
                                        {influencer.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="info-section">
                                <h4>Audience</h4>
                                <p>{influencer.followers}</p>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="action-btn primary">Contact Influencer</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
