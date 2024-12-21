// // src/layouts/HomePage.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../components/auth/AuthContext';
// import { auth } from '../utils/firebase';
//
// const HomePage = () => {
//     const { user } = useAuth();
//
//     return (
//         <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Navigation */}
//                 <nav className="py-4">
//                     <div className="flex justify-between items-center">
//                         <div className="text-2xl font-bold text-primary-800">CampusConnect</div>
//                         <div className="flex items-center space-x-4">
//                             <span className="text-primary-600">{user?.email}</span>
//                             <button
//                                 onClick={() => auth.signOut()}
//                                 className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800"
//                             >
//                                 Sign Out
//                             </button>
//                         </div>
//                     </div>
//                 </nav>
//
//                 {/* Hero Section */}
//                 <div className="text-center py-20">
//                     <h1 className="text-5xl font-extrabold text-primary-900 mb-6">
//                         Welcome to CampusConnect!
//                     </h1>
//                     <p className="text-xl text-primary-600 mb-12 max-w-2xl mx-auto">
//                         Your one-stop platform for managing events and helping the community with lost & found items.
//                     </p>
//
//                     {/* Feature Cards */}
//                     <div className="grid md:grid-cols-2 gap-8 mt-16">
//                         {/* Events Card */}
//                         <Link
//                             to="/events"
//                             className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//                         >
//                             <div className="text-primary-500 mb-4">
//                                 <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                                 </svg>
//                             </div>
//                             <h2 className="text-2xl font-bold text-primary-900 mb-2">Event Reminders</h2>
//                             <p className="text-primary-600">
//                                 Stay updated with upcoming events and never miss an important date.
//                             </p>
//                         </Link>
//
//                         {/* Lost & Found Card */}
//                         <Link
//                             to="/lost-found"
//                             className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
//                         >
//                             <div className="text-primary-500 mb-4">
//                                 <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                 </svg>
//                             </div>
//                             <h2 className="text-2xl font-bold text-primary-900 mb-2">Lost & Found</h2>
//                             <p className="text-primary-600">
//                                 Help the community by posting or searching for lost items.
//                             </p>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default HomePage;













import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { auth } from '../utils/firebase';
import DarkModeToggle from '../components/DarkModeToggle';
import { useTheme } from '../contexts/ThemeContext';
import Switch from "../utils/Switch"; // Import the CSS for the Switch

const HomePage = () => {
    const { user } = useAuth();
    const { isDarkMode } = useTheme();

    // State for managing dark mode
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // Use useEffect to load the dark mode state from localStorage (if exists)
    // useEffect(() => {
    //     const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    //     setIsDarkMode(savedDarkMode);
    // }, []);

    // Toggle dark mode and save preference in localStorage
    // const handleToggle = () => {
    //     setIsDarkMode(!isDarkMode);
    //     localStorage.setItem('darkMode', !isDarkMode);
    // };

    // Apply dark mode styles conditionally
    const pageStyles = isDarkMode
        ? {
            background: '#1a202c', // Dark background color
            color: '#e2e8f0', // Light text color
        }
        : {
            background: 'linear-gradient(to bottom, #f3e8ff, #e2d0f9)', // Light background color
            color: '#4b2d8e', // Dark text color
        };

    return (
        <div style={{ minHeight: '100vh', ...pageStyles }}>
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
                {/* Navigation */}
                <nav className="py-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: isDarkMode ? '#e2e8f0' : '#4b2d8e' }}>
                            CampusConnect
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ color: isDarkMode ? '#e2e8f0' : '#5c5c5c', marginRight: '30px', }}>{user?.email}</span>
                            <button
                                onClick={() => auth.signOut()}
                                style={{
                                    padding: '8px 16px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: isDarkMode ? '#e2e8f0' : '#4b2d8e',
                                    cursor: 'pointer',
                                    border: `1px solid ${isDarkMode ? '#e2e8f0' : '#4b2d8e'}`,
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
                            color: isDarkMode ? '#e2e8f0' : '#4b2d8e',
                            marginBottom: '24px',
                        }}
                    >
                        Welcome to CampusConnect
                    </h1>
                    <p
                        style={{
                            fontSize: '20px',
                            color: isDarkMode ? '#e2e8f0' : '#5c5c5c',
                            marginBottom: '48px',
                            maxWidth: '800px',
                            margin: '0 auto',
                        }}
                    >
                        Your one-stop platform for managing events and helping the students with day-to-day challanges.
                    </p>

                    {/* Feature Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '50px', }}>
                        {/* Events Card */}
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
                                color: isDarkMode ? '#e2e8f0' : '#4b2d8e',
                            }}
                        >
                            <div style={{ color: '#7c4dff', marginBottom: '16px', }}>
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
                            <p style={{ color: isDarkMode ? '#e2e8f0' : '#5c5c5c' }}>
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
                                color: isDarkMode ? '#e2e8f0' : '#4b2d8e',
                            }}
                        >
                            <div style={{ color: '#7c4dff', marginBottom: '16px' }}>
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
                            <p style={{ color: isDarkMode ? '#e2e8f0' : '#5c5c5c' }}>
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