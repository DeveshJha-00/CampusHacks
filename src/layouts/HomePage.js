
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { auth } from '../utils/firebase';
import DarkModeToggle from '../components/DarkModeToggle';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../assets/images/logo.png'
import {toast} from 'react-hot-toast';
import Switch from "../utils/Switch"; // Import the CSS for the Switch

const HomePage = () => {
    const { user } = useAuth();
    const { isDarkMode } = useTheme();
    useEffect(() => {
        if (user && !sessionStorage.getItem('welcomeToastShown')) {
            toast.success(`Welcome back!`, {
                duration: 3000,
                position: 'top-center',
                style: {
                    background: isDarkMode ? '#2d3748' : '#ffffff',
                    color: isDarkMode ? '#e2e8f0' : '#4b2d8e',
                },
            });
            sessionStorage.setItem('welcomeToastShown', 'true');
        }
    }, [user, isDarkMode]);

    // Apply dark mode styles conditionally
    const pageStyles = isDarkMode
        ? {
            background: '#1a202c', // Dark background color
            color: '#e2e8f0', // Light text color
        }
        : {
            // background: 'linear-gradient(to bottom, #f3e8ff, #e2d0f9)', // Light background color
            // color: '#4b2d8e', // Dark text color
            background: 'linear-gradient(to bottom, #eff6ff, #dbeafe)', // Light blue background (from primary-50 to primary-100)
            color: '#1e40af', // Primary-800 for text
        };

    return (
        <div style={{ minHeight: '100vh', ...pageStyles, transition: 'all 0.3s ease' }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                {/* Navigation */}
                <nav className="py-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: isDarkMode ? '#e2e8f0' : '#1e40af'
                        }}>
                            <img
                                src={Logo}
                                alt="CampusConnect Logo"
                                style={{
                                    height: '32px',  // Fixed height for consistency
                                    width: 'auto',   // Width adjusts automatically to maintain aspect ratio
                                    objectFit: 'contain', // Ensures the image isn't distorted
                                    verticalAlign: 'middle',
                                    // Add a subtle transition for dark mode changes
                                    transition: 'filter 0.3s ease-in-out',
                                    // Optional: Adjust brightness in dark mode if needed
                                    filter: isDarkMode ? 'brightness(1.2)' : 'brightness(1)'
                                }}
                            />
                            CampusConnect
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: isDarkMode ? '#e2e8f0' : '#1e40af', marginRight: '30px', }}>{user?.email}</span>
                            <button
                                onClick={() => auth.signOut()}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: isDarkMode ? '#e2e8f0' : '#4b2d8e',
                                    cursor: 'pointer',
                                    border: `1px solid ${isDarkMode ? '#e2e8f0' : '#1e40af'}`,
                                    borderRadius: '4px',
                                    marginRight: '30px',
                                }}
                            >
                                Sign Out
                            </button>
                            {/* Switch Component */}
                            <DarkModeToggle />
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                    <h1
                        style={{
                            fontSize: '48px',
                            fontWeight: '800',
                            color: isDarkMode ? '#e2e8f0' : '#1e40af',
                            marginBottom: '24px',
                        }}
                    >
                        Welcome to CampusConnect!
                    </h1>
                    <p
                        style={{
                            fontSize: '20px',
                            color: isDarkMode ? '#e2e8f0' : '#3b82f6',
                            marginBottom: '48px',
                            maxWidth: '800px',
                            margin: '0 auto',
                        }}
                    >
                        Your one-stop platform for managing events and helping the students with day-to-day challanges.
                    </p>


                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '50px', }}>

                        <Link
                            to="/events"
                            style={{
                                position: 'relative',
                                backgroundColor: isDarkMode ? '#2d3748' : 'white', // Change background for dark mode
                                padding: '32px',
                                borderRadius: '16px',
                                boxShadow: isDarkMode ? '0 4px 16px rgba(0, 0, 0, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)', // Shadow for dark mode
                                transition: 'all 0.3s',
                                textDecoration: 'none',
                                color: isDarkMode ? '#e2e8f0' : '#1e40af',
                            }}
                        >
                            <div style={{ color: '#3b82f6', marginBottom: '16px', }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ width: '48px', height: '48px', margin: '0 auto' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px', }}>Event Reminders</h2>
                            <p style={{ color: isDarkMode ? '#e2e8f0' : '#3b82f6' }}>
                                Stay updated with upcoming events and never miss an important date.
                            </p>
                        </Link>

                        {/* Lost & Found Card */}
                        <Link
                            to="/lost-found"
                            style={{
                                position: 'relative',
                                backgroundColor: isDarkMode ? '#2d3748' : 'white', // Change background for dark mode
                                padding: '32px',
                                borderRadius: '16px',
                                boxShadow: isDarkMode ? '0 4px 16px rgba(0, 0, 0, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)', // Shadow for dark mode
                                transition: 'all 0.3s',
                                textDecoration: 'none',
                                color: isDarkMode ? '#e2e8f0' : '#1e40af',
                            }}
                        >
                            <div style={{ color: '#3b82f6', marginBottom: '16px' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    style={{ width: '48px', height: '48px', margin: '0 auto' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Lost & Found</h2>
                            <p style={{ color: isDarkMode ? '#e2e8f0' : '#3b82f6' }}>
                                Help the community by posting or searching for lost items.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;