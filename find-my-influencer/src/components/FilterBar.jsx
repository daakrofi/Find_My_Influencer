import React from 'react';
import { Search, Filter } from 'lucide-react';

const FilterBar = ({ searchTerm, onSearchChange, filters, onFilterChange }) => {
    return (
        <div className="filter-bar">
            <div className="search-container">
                <Search className="search-icon" size={20} />
                <input
                    type="text"
                    placeholder="Search influencers by name, bio, or keyword..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="filters-container">
                <div className="filter-group">
                    <label>Platform</label>
                    <select
                        value={filters.platform}
                        onChange={(e) => onFilterChange('platform', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Platforms</option>
                        <option value="Instagram">Instagram</option>
                        <option value="TikTok">TikTok</option>
                        <option value="YouTube">YouTube</option>
                        <option value="X / Twitter">X / Twitter</option>
                        <option value="LinkedIn">LinkedIn</option>
                    </select>
                </div>

                {/* Placeholder for other filters if data allows, e.g. Follower Count (if we parse it) */}
                {/* Currently data has "followers": "Unknown" mostly, so maybe skip or use Tags */}

                <div className="filter-group">
                    <label>Category</label>
                    <select
                        value={filters.tag}
                        onChange={(e) => onFilterChange('tag', e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All Categories</option>
                        <option value="Notable">Notable</option>
                        {/* Add more dynamically if we extract them */}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
