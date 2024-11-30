import React from 'react';
import { useTheme } from "./ThemeContext";
import './switchmode.css';

const SwitchMode = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <div>
            <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={toggleDarkMode}
                checked={isDarkMode}
            />
            <label htmlFor="checkbox" className="checkbox-label">
                <i className="fas fa-moon"></i>
                <i className="fas fa-sun"></i>
                <span className="ball"></span>
            </label>
        </div>
    );
};

export default SwitchMode;