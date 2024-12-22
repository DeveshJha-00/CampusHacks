/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar, Ramya Cherukupalli
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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