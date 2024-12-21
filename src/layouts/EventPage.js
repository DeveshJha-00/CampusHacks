// src/layouts/EventPage.js
import React from 'react';
import { EventProvider } from '../components/events/EventContext';
import EventList from '../components/events/EventList';
import { useAuth } from '../components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

const EventPage = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <EventProvider>
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <EventList />
                    </div>
                </div>
            </div>
        </EventProvider>
    );
};

export default EventPage;