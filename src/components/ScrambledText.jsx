// src/components/ScrambledText.jsx (NOUVELLE VERSION STABLE)
import React, { useState, useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeContext";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function ScrambledText({ targetText, isLoaded, scrambleDuration = 1000 }) {
    const { currentTheme } = useTheme();
    const accentColorClass = currentTheme.accentClass;

    const [displayText, setDisplayText] = useState(targetText.split("").map(c => c === " " ? " " : ""));
    const [isFinished, setIsFinished] = useState(false);
    
    const animationFrameRef = useRef(0);
    const startTimeRef = useRef(0);

    const animationComplete = isFinished || !isLoaded;

    useEffect(() => {
        if (!isLoaded || isFinished) return;

        startTimeRef.current = performance.now();
        const targetChars = targetText.split("");

        const animate = (time) => {
            const elapsed = time - startTimeRef.current;
            const progress = Math.min(elapsed / scrambleDuration, 1);
            
            let newText = [...targetChars];
            let settledCount = 0;

            for (let i = 0; i < targetChars.length; i++) {
                if (targetChars[i] === ' ') continue;

                // Chaque caractère a un point de fixation séquentiel
                const fixTime = (i / targetChars.length) * 0.8 + 0.2;

                if (progress >= fixTime) {
                    newText[i] = targetChars[i];
                    settledCount++;
                } else {
                    // Brouillage aléatoire
                    newText[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            }
            
            setDisplayText(newText);

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setIsFinished(true);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [targetText, isLoaded, scrambleDuration, isFinished]);

    // Rendu simple : l'état final est géré par le composant H2 parent
    return (
        <span className="font-mono">
            {displayText.map((char, index) => {
                const isSettled = isFinished || (char === targetText[index] && char !== ' ');
                
                // Si l'animation est terminée, ou si le caractère est fixé (visible), il utilise la couleur du parent (le H2)
                // Sinon, il utilise la couleur néon pour le brouillage
                const colorClass = isSettled ? '' : accentColorClass; 
                
                return (
                    <span 
                        key={index} 
                        className={`inline-block ${colorClass} ${animationComplete ? 'opacity-100' : 'opacity-100'}`}
                        // Le texte est toujours là, seule la couleur change pendant l'animation
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                );
            })}
        </span>
    );
}