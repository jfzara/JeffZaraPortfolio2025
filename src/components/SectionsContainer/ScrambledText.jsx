import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Caractères possibles pour le brouillage
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:,.<>?/~';

// Durée totale du brouillage et décalage par lettre
const SCRAMBLE_DURATION = 1000; // 1 seconde
const LETTER_DELAY = 60;         // 60ms

// Span stylisé pour chaque caractère
const ScrambledSpan = styled.span`
  display: inline-block;
  position: relative;
  color: ${({ isScrambling }) => (isScrambling ? '#00FFFF' : 'inherit')};
  text-shadow: ${({ isScrambling }) => 
    isScrambling ? '0 0 1px #00FFFF, 0 0 3px #00FFFF80' : 'none'};
  animation: ${({ isScrambling }) => (isScrambling ? 'jitter 0.05s infinite alternate' : 'none')};

  @keyframes jitter {
    0% { transform: translate(0.5px, 0.5px); }
    100% { transform: translate(-0.5px, -0.5px); }
  }
`;

export default function ScrambledText({ targetText, isLoaded }) {
  const [scrambledText, setScrambledText] = useState(
    targetText.split('').map(() => ' ')
  );

  useEffect(() => {
    if (!isLoaded) return;

    const timeouts = [];
    const intervals = [];
    const targetChars = targetText.split('');

    targetChars.forEach((targetChar, index) => {
      const startDelay = index * LETTER_DELAY;

      timeouts.push(setTimeout(() => {
        let iterations = 0;

        const interval = setInterval(() => {
          // Brouillage aléatoire
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          setScrambledText(prev => {
            const newState = [...prev];
            newState[index] = randomChar;
            return newState;
          });

          iterations++;

          // Arrêter le brouillage et fixer la lettre finale
          if (iterations * 50 >= SCRAMBLE_DURATION) {
            clearInterval(interval);
            setScrambledText(prev => {
              const newState = [...prev];
              newState[index] = targetChar;
              return newState;
            });
          }
        }, 50);

        intervals.push(interval);
      }, startDelay));
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [targetText, isLoaded]);

  return (
    <>
      {scrambledText.map((char, index) => {
        const isScrambling = char !== targetText[index] && char !== ' ';
        return (
          <ScrambledSpan key={index} isScrambling={isScrambling}>
            {char === ' ' ? '\u00A0' : char}
          </ScrambledSpan>
        );
      })}
    </>
  );
}
