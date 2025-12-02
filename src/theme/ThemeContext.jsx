 
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
    light: {
        bgClass: 'bg-white',
        textClass: 'text-gray-900',
        accentClass: 'text-[#6458FF]', 
        shadowClass: 'shadow-neomorph-light', 
        cardBgClass: 'bg-gray-100', 
        subtleTextClass: 'text-gray-600',
        
        hoverBgClass: 'bg-gray-900', 
        hoverTextClass: 'text-white', 
        
        themeModeClass: 'light', 
    },
    dark: {
        bgClass: 'bg-[#05171A]',
       
        textClass: 'text-neon-text-custom', 
        
        
        accentClass: 'text-[#39FF14]', 
        shadowClass: 'shadow-neomorph-dark', 
        cardBgClass: 'bg-gray-900', 
        subtleTextClass: 'text-gray-400',
        
        hoverBgClass: 'bg-white',
        hoverTextClass: '!text-[#0A0A0A]', 
        
        themeModeClass: 'dark', 
    },
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState('dark');
    const currentTheme = themes[themeMode];
    
    const toggleTheme = () => {
        setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        const body = document.body;
        
        const allThemeClasses = Object.values(themes).flatMap(t => [t.bgClass, t.textClass, t.themeModeClass]);
        allThemeClasses.forEach(cls => body.classList.remove(cls));

        const newBodyClasses = [
            'min-h-screen', 
            'transition-colors', 
            'duration-500', 
            'font-space-grotesk',
            currentTheme.bgClass, 
            currentTheme.textClass,
            currentTheme.themeModeClass, 
        ];

        body.classList.add(...newBodyClasses);
        
    }, [themeMode, currentTheme]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme, currentTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};