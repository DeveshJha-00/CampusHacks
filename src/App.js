// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { Toaster } from 'react-hot-toast';

// Import pages
import HomePage from './layouts/HomePage';
import EventPage from './layouts/EventPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import LostFoundPage from './layouts/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
      <Router>
        <AuthProvider>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <EventPage />
              </ProtectedRoute>
            } />
            <Route path="/lost-found" element={
              <ProtectedRoute>
                <LostFoundPage />
              </ProtectedRoute>
            } />
          </Routes>
        </AuthProvider>
      </Router>
  );
}

export default App;