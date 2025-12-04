import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import influencersData from '../data/influencers.json';
import InfluencerCard from '../components/InfluencerCard';
import FilterBar from '../components/FilterBar';
import { Sparkles } from 'lucide-react';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        platform: '',
        tag: ''
    });

    const filteredInfluencers = useMemo(() => {
        return influencersData.filter(influencer => {
            // Search Logic
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch =
                influencer.name.toLowerCase().includes(searchLower) ||
                influencer.handle.toLowerCase().includes(searchLower) ||
                influencer.bio.toLowerCase().includes(searchLower) ||
                (influencer.tags && influencer.tags.some(t => t.toLowerCase().includes(searchLower)));

            // Filter Logic
            const matchesPlatform = filters.platform
                ? influencer.platform.some(p => p.toLowerCase() === filters.platform.toLowerCase())
                : true;

            const matchesTag = filters.tag
                ? influencer.tags && influencer.tags.includes(filters.tag)
                : true;

            return matchesSearch && matchesPlatform && matchesTag;
        });
    }, [searchTerm, filters]);

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <div className="logo">
                    <Sparkles className="logo-icon" />
                    <h1>Find My Influencer</h1>
                </div>
                <p className="subtitle">Discover and connect with top-tier creators.</p>
            </header>

            <main>
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className="influencers-grid">
                    {filteredInfluencers.length > 0 ? (
                        filteredInfluencers.map(influencer => (
                            <InfluencerCard
                                key={influencer.id}
                                influencer={influencer}
                            />
                        ))
                    ) : (
                        <div className="no-results">
                            <p>No influencers found matching your criteria.</p>
                            <button onClick={() => { setSearchTerm(''); setFilters({ platform: '', tag: '' }); }}>
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="app-footer">
                <p>&copy; {new Date().getFullYear()} Find My Influencer. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
