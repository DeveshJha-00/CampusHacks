/**
 * @license
 * Copyright (c) 2024 Manjunath Patil, Devesh Jha, Ninad Hebbar
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);