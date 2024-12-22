// src/layouts/LostFoundPage.js
import React from 'react';
import { LostFoundProvider } from '../components/lostfound/LostFoundContext';
import ItemList from '../components/lostfound/ItemList';
import { useAuth } from '../components/auth/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Navigate } from 'react-router-dom';
import DarkModeToggle from '../components/DarkModeToggle';

const LostFoundPage = () => {
    const { user, loading } = useAuth();
    const { isDarkMode } = useTheme();

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
        <LostFoundProvider>
            <div style={{
                minHeight: '100vh',
                background: isDarkMode ? '#1a202c' : '#f3f4f6',
                color: isDarkMode ? '#e2e8f0' : '#4b2d8e'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                    <nav style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 0'
                    }}>
                        <h1 style={{
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: isDarkMode ? '#e2e8f0' : '#4b2d8e'
                        }}>
                            Lost & Found
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <span style={{ color: isDarkMode ? '#e2e8f0' : '#5c5c5c' }}>
                                {user?.email}
                            </span>
                            <DarkModeToggle />
                        </div>
                    </nav>
                    <div style={{
                        padding: '20px',
                        background: isDarkMode ? '#2d3748' : 'white',
                        borderRadius: '8px',
                        boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}>
                        <ItemList />
                    </div>
                </div>
            </div>
        </LostFoundProvider>
    );
};

export default LostFoundPage;