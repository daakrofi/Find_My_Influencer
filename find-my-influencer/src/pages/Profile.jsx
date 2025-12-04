import React from 'react';
import { useParams, Link } from 'react-router-dom';
import influencersData from '../data/influencers.json';
import { ArrowLeft, Instagram, Youtube, Video } from 'lucide-react';

const PlatformIcon = ({ platform }) => {
    switch (platform.toLowerCase()) {
        case 'instagram': return <Instagram size={20} />;
        case 'youtube': return <Youtube size={20} />;
        case 'tiktok': return <Video size={20} />;
        default: return null;
    }
};

const Profile = () => {
    const { id } = useParams();
    const influencer = influencersData.find(i => i.id === parseInt(id));

    if (!influencer) {
        return (
            <div className="app-container">
                <div className="error-state">
                    <h2>Influencer not found</h2>
                    <Link to="/" className="back-link"><ArrowLeft size={16} /> Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            <nav className="profile-nav">
                <Link to="/" className="back-link">
                    <ArrowLeft size={20} /> Back to Search
                </Link>
            </nav>

            <div className="profile-layout">
                <div className="profile-sidebar">
                    <div className="profile-image-container">
                        <img
                            src={`/influencers/${influencer.image}`}
                            alt={influencer.name}
                            className="profile-image"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=No+Image'; }}
                        />
                    </div>

                    <div className="profile-quick-stats">
                        <h3>Platforms</h3>
                        <div className="platform-list">
                            {influencer.platform.map(p => (
                                <div key={p} className="platform-item">
                                    <PlatformIcon platform={p} />
                                    <span>{p}</span>
                                </div>
                            ))}
                        </div>

                        {influencer.tags && influencer.tags.length > 0 && (
                            <>
                                <h3>Tags</h3>
                                <div className="tag-list">
                                    {influencer.tags.map(tag => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="profile-content">
                    <header className="profile-header">
                        <h1 className="profile-handle">@{influencer.handle}</h1>
                        <h2 className="profile-name">{influencer.name}</h2>
                    </header>

                    <div className="profile-dossier">
                        <h3>Full Dossier</h3>
                        <div className="dossier-text">
                            {influencer.full_details && influencer.full_details.length > 0 ? (
                                influencer.full_details.map((line, index) => (
                                    <p key={index} className="dossier-line">{line}</p>
                                ))
                            ) : (
                                <p>{influencer.bio}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
