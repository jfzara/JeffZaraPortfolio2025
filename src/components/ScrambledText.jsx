// src/components/ScrambledText.jsx
import React, { useState, useEffect, useRef } from "react";

// Caractères pour le brouillage
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
const SCRAMBLE_DURATION = 350;

export default function ScrambledText({ targetText, isLoaded, className = "" }) {
    const initialText = targetText.split("").map((c) => (c === " " ? " " : " "));
    const [scrambledText, setScrambledText] = useState(initialText);
    const [hasScrambled, setHasScrambled] = useState(false);

    const indexRef = useRef(0);
    const settledIndicesRef = useRef(new Set());
    const iterationCountRef = useRef(0);
    const timeoutRef = useRef();
    
    // Logique complexe de brouillage (conservée pour l'effet unique)
    useEffect(() => {
        if (!isLoaded || hasScrambled) return;

        const targetChars = targetText.split("");
        const finalState = [...initialText];
        const settled = settledIndicesRef.current;
        settled.clear(); // Réinitialiser pour un nouveau cycle

        // Cartographie des caractères à brouiller
        const shouldScrambleMap = targetChars.map(
            (char) => char !== " " && Math.random() < 0.4
        );
        
        let localIndex = 0;

        const scrambleLoop = () => {
            localIndex = indexRef.current;
            iterationCountRef.current++;
            let shouldUpdate = false;

            // 1. Fixation instantanée des lettres non brouillées (au début)
            while (
                localIndex < targetChars.length &&
                !shouldScrambleMap[localIndex] &&
                !settled.has(localIndex)
            ) {
                finalState[localIndex] = targetChars[localIndex];
                settled.add(localIndex);
                localIndex++;
                shouldUpdate = true;
            }

            // Fin de l’animation
            if (localIndex >= targetChars.length && settled.size === targetChars.length) {
                clearTimeout(timeoutRef.current);
                setHasScrambled(true);
                setScrambledText([...finalState]);
                return;
            }

            // 2. Brouillage et fixation progressive
            if (localIndex < targetChars.length && shouldScrambleMap[localIndex]) {
                // Tentative de fixer le caractère
                if (Math.random() < 0.25) { // Chance de se fixer
                    finalState[localIndex] = targetChars[localIndex];
                    settled.add(localIndex);
                    localIndex++;
                    shouldUpdate = true;
                } else {
                    // Brouillage
                    finalState[localIndex] = CHARS[Math.floor(Math.random() * CHARS.length)];
                    shouldUpdate = true;
                }
            } else if (localIndex < targetChars.length) {
                // Avancer si l'index actuel est un espace ou une lettre déjà fixée
                localIndex++;
            }

            indexRef.current = localIndex;

            if (shouldUpdate || iterationCountRef.current % 4 === 0) {
                setScrambledText([...finalState]);
                iterationCountRef.current = 0;
            }

            timeoutRef.current = setTimeout(scrambleLoop, 20 + Math.random() * 40);
        };

        timeoutRef.current = setTimeout(scrambleLoop, 50);

        return () => clearTimeout(timeoutRef.current);
    }, [targetText, isLoaded, hasScrambled, initialText]);
    
    // Nettoyage au démontage
    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <span className={className}>
            {scrambledText.map((char, index) => {
                const isSettled = settledIndicesRef.current.has(index);
                const isScrambling = !isSettled && !hasScrambled;
                const displayChar = char === " " ? "\u00A0" : char;
                
                // Styles Tailwind pour les états d'animation
                const charClasses = `
                    inline-block relative transition-all duration-150 ease-out
                    ${isSettled 
                        ? 'font-extrabold opacity-100 scale-100' // isSettled
                        : isScrambling 
                            ? 'font-light opacity-60 scale-90 text-sm' // isScrambling
                            : 'opacity-0 scale-90' // Initial
                    }
                `;

                return (
                    <span 
                        key={index} 
                        className={charClasses}
                        // Réutilisation de l'index pour la séquence d'animation
                        style={{'--idx': index}}
                    >
                        {displayChar}
                    </span>
                );
            })}
        </span>
    );
}