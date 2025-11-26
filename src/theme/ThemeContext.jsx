// C:\Users\Jeff\Desktop\PROJETS VS CODE\JAVASCRIPT\REACT\mon_portfolio\src\theme\ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  light: {
    bg: 'bg-white',
    text: 'text-gray-900',
    themeClass: 'light', 
  },
  dark: {
    bg: 'bg-[#0A0A0A]',
    text: 'text-gray-100',
    themeClass: 'dark', 
  },
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState('dark');

  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = themes[themeMode];
  
  // 💡 LOGIQUE DE STYLE CRITIQUE : Applique les classes au BODY
  useEffect(() => {
    const body = document.body;
    
    // Définir la liste complète des classes de thème à gérer
    const themeClassesToManage = Object.values(themes).flatMap(t => [t.themeClass, t.bg, t.text]);
    
    // 1. Retirer TOUTES les classes de thème possibles du body
    themeClassesToManage.forEach(cls => body.classList.remove(cls));

    // 2. Définir les classes de base qui doivent toujours être présentes
    const baseClasses = ['min-h-screen', 'transition-colors', 'duration-500'];
    
    // 3. Ajouter les classes de base + les classes du thème actuel
    const newClasses = [
        ...baseClasses, 
        currentTheme.themeClass, 
        currentTheme.bg, 
        currentTheme.text
    ];

    body.classList.add(...newClasses);
    
    // Dépendance simplifiée : seulement themeMode est nécessaire
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};