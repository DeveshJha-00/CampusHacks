// src/layouts/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/auth/AuthContext';
import { auth } from '../utils/firebase';

const HomePage = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-50 to-primary-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Navigation */}
                <nav className="py-4">
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-primary-800">EventFinder</div>
                        <div className="flex items-center space-x-4">
                            <span className="text-primary-600">{user?.email}</span>
                            <button
                                onClick={() => auth.signOut()}
                                className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="text-center py-20">
                    <h1 className="text-5xl font-extrabold text-primary-900 mb-6">
                        Welcome to EventFinder
                    </h1>
                    <p className="text-xl text-primary-600 mb-12 max-w-2xl mx-auto">
                        Your one-stop platform for managing events and helping the community with lost & found items.
                    </p>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-2 gap-8 mt-16">
                        {/* Events Card */}
                        <Link
                            to="/events"
                            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="text-primary-500 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-primary-900 mb-2">Event Reminders</h2>
                            <p className="text-primary-600">
                                Stay updated with upcoming events and never miss an important date.
                            </p>
                        </Link>

                        {/* Lost & Found Card */}
                        <Link
                            to="/lost-found"
                            className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="text-primary-500 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-primary-900 mb-2">Lost & Found</h2>
                            <p className="text-primary-600">
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