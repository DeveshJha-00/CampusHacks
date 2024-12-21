// src/components/DarkModeToggle.js
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './customStyles/Switch.css';

const DarkModeToggle = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <label className="switch">
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleDarkMode}
            />
            <span className="slider"></span>
        </label>
    );
};

export default DarkModeToggle;