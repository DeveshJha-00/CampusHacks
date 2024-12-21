// src/layouts/Layout.js
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../components/auth/AuthContext';
import { Navigate } from 'react-router-dom';

const Layout = ({ children, requireAuth = true }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (requireAuth && !user) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <Toaster position="top-right" />
            {children}
        </>
    );
};

export default Layout;