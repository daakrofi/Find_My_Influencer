import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Video } from 'lucide-react';

const PlatformIcon = ({ platform }) => {
    switch (platform.toLowerCase()) {
        case 'instagram': return <Instagram size={16} />;
        case 'youtube': return <Youtube size={16} />;
        case 'tiktok': return <Video size={16} />; // Lucide doesn't have TikTok, using Video as proxy or we can use text
        default: return null;
    }
};

const InfluencerCard = ({ influencer }) => {
    return (
        <div className="influencer-card">
            <Link to={`/profile/${influencer.id}`} className="card-image-container">
                <img
                    src={`/influencers/${influencer.image}`}
                    alt={influencer.name}
                    className="card-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'; }}
                />
                <div className="card-overlay">
                    <div className="card-platforms">
                        {influencer.platform.map(p => (
                            <span key={p} className="platform-badge" title={p}>
                                <PlatformIcon platform={p} />
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
            <div className="card-content">
                <h3 className="card-handle">@{influencer.handle}</h3>
                <p className="card-name">{influencer.name}</p>
                <div className="card-tags">
                    {influencer.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
                <p className="card-bio">{influencer.bio}</p>
                <Link to={`/profile/${influencer.id}`} className="read-more-btn">
                    Read More
                </Link>
            </div>
            <div className="card-tooltip">
                <h4>About {influencer.name}</h4>
                <p>{influencer.bio}</p>
            </div>
        </div>
    );
};

export default InfluencerCard;
