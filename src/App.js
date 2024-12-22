/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar, Ramya Cherukupalli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import { Toaster } from 'react-hot-toast';

import HomePage from './layouts/HomePage';
import EventPage from './layouts/EventPage';
import Login from './components/auth/Login';
import LostFoundPage from './layouts/LostFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <Toaster position="top-right" />
            <Routes>

              <Route path="/login" element={<Login />} />

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
      </ThemeProvider>
  );
}

export default App;





