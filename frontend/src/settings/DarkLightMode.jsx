import React, { useState, useEffect } from "react";
import "./darklightmode.css";

function DarkLightMode() {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="app">
            {/* Pass toggleTheme and theme to Header */}
            <Header theme={theme} toggleTheme={toggleTheme} />

            <div className="content">
                <h1>Welcome to My App</h1>
                <p>The current theme is: {theme} mode.</p>
            </div>
        </div>
    );
}

export default DarkLightMode;
