/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar, Ramya Cherukupalli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useEffect } from 'react';
import { useEvents } from './EventContext';
import { useAuth } from '../auth/AuthContext';
import EventCard from './EventCard';
import AddEvent from './AddEvent';
import { useTheme } from '../../contexts/ThemeContext';

const EventList = () => {
    const { isDarkMode } = useTheme();
    const { events, loading, refreshEvents } = useEvents();
    const { userRole } = useAuth();
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        refreshEvents();
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const inputStyles = isDarkMode ? {
        backgroundColor: '#374151',
        color: '#e2e8f0',
        borderColor: '#4b5563'
    } : {
        backgroundColor: '#ffffff',
        color: '#000000',
        borderColor: '#e5e7eb'
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className={`text-2xl font-bold mb-6 ${
                    isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}>Upcoming Events</h1>
                {userRole === 'admin' && (
                    <button
                        onClick={() => setShowAddEvent(true)}
                        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Event
                    </button>
                )}
            </div>

            <div className="mb-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                            isDarkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'
                        }`}
                        style={inputStyles}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    style={inputStyles}
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="general">General</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                    <option value="conference">Conference</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>

            {showAddEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className={`rounded-lg p-6 max-w-2xl w-full mx-4 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                        <AddEvent onClose={() => {
                            setShowAddEvent(false);
                            refreshEvents();
                        }} />
                    </div>
                </div>
            )}

            {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                    <h3 className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        No events found
                    </h3>
                    <p className={`mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Try adjusting your filters or search query
                    </p>
                </div>
            )}
        </div>
    );
};

export default EventList;