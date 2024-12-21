// src/components/events/EventList.js
import React, { useState } from 'react';
import { useEvents } from './EventContext';
import EventCard from './EventCard';
import AddEvent from './AddEvent';

const EventList = () => {
    const { events, loading, userRole } = useEvents();
    const [showAddEvent, setShowAddEvent] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter events based on category and search query
    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Group events by month for better organization
    const groupedEvents = filteredEvents.reduce((groups, event) => {
        const month = event.date.toLocaleString('default', { month: 'long', year: 'numeric' });
        if (!groups[month]) {
            groups[month] = [];
        }
        groups[month].push(event);
        return groups;
    }, {});

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
                {userRole === 'admin' && (
                    <button
                        onClick={() => setShowAddEvent(true)}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                        Add New Event
                    </button>
                )}
            </div>

            {/* Filters Section */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search events..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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

            {/* Events Grid */}
            {Object.entries(groupedEvents).map(([month, monthEvents]) => (
                <div key={month} className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">{month}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {monthEvents.map(event => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                </div>
            ))}

            {/* Add Event Modal */}
            {showAddEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
                        <AddEvent onClose={() => setShowAddEvent(false)} />
                    </div>
                </div>
            )}

            {/* Empty State */}
            {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-xl text-gray-600">No events found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your filters or search query</p>
                </div>
            )}
        </div>
    );
};

export default EventList;