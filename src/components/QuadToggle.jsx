// src/components/QuadToggle.jsx
import React, { useRef, useEffect } from "react";

// Le QuadToggle est conservé pour la gestion du mode/langue
// Note: Le changement de thème est maintenant géré par ThemeContext
// Note: La fonctionnalité de langue nécessite une logique i18n non incluse ici.

const QuadToggle = ({ isOpen, onClose, parentRef, toggleTheme, themeMode }) => {
    const ref = useRef();

    // Ferme le popover si clic à l'extérieur
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                ref.current &&
                !ref.current.contains(e.target) &&
                parentRef?.current &&
                !parentRef.current.contains(e.target)
            ) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, parentRef, isOpen]);

    if (!isOpen) return null;

    // Classe de base pour les Quadrants
    const baseQuadrantClass = `
        flex items-center justify-center text-lg rounded-sm cursor-pointer transition-all duration-300
        hover:scale-110 hover:animate-neon-pulse
    `;
    
    // Gestion du clic pour le Thème (le reste est pour la démo de langue)
    const handleThemeClick = (mode) => {
        if (mode !== themeMode) {
             toggleTheme();
        }
    };

    return (
        <div ref={ref} className="absolute top-full left-0 w-32 md:w-36 grid grid-cols-2 md:grid-cols-2 gap-1 p-2 bg-gray-900/40 backdrop-blur-md shadow-2xl z-[1000] rounded-sm mt-1">
            
            {/* 1. Light Mode / FR */}
            <div 
                className={`${baseQuadrantClass} bg-gray-100 text-gray-900 ${themeMode === 'light' ? 'ring-2 ring-[#39FF14]' : ''}`}
                onClick={() => handleThemeClick('light')}
            >
                🇫🇷
            </div>
            
            {/* 2. Light Mode / EN */}
            <div className={`${baseQuadrantClass} bg-gray-100 text-gray-900`}>
                🇬🇧
            </div>
            
            {/* 3. Dark Mode / FR */}
            <div 
                 className={`${baseQuadrantClass} bg-gray-800 text-gray-50 ${themeMode === 'dark' ? 'ring-2 ring-[#39FF14]' : ''}`}
                 onClick={() => handleThemeClick('dark')}
            >
                🇫🇷
            </div>
            
            {/* 4. Dark Mode / EN */}
            <div className={`${baseQuadrantClass} bg-gray-800 text-gray-50`}>
                🇬🇧
            </div>
        </div>
    );
};

export default QuadToggle;