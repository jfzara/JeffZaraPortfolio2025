import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const SCRAMBLE_DURATION = 350;
const LETTER_DELAY = 30;

const ScrambledSpan = styled.span`
  display: inline-block;
  position: relative;
  color: inherit;
  text-shadow: none;
  transition: all 0.15s ease-out;

  ${({ isScrambling }) =>
    isScrambling &&
    css`
      font-weight: 200;
      font-size: 0.8em;
      opacity: 0.6;
      transform: scale(0.9);
    `}

  ${({ isSettled }) =>
    isSettled &&
    css`
      font-weight: 800;
      font-size: 1em;
      opacity: 1;
      transform: scale(1);
    `}
`;

export default function ScrambledText({ targetText, isLoaded }) {
  const initialText = targetText.split("").map((c) => (c === " " ? " " : " "));
  const [scrambledText, setScrambledText] = useState(initialText);
  const [hasScrambled, setHasScrambled] = useState(false);

  const indexRef = useRef(0);
  const lettersToFixRef = useRef(new Set());
  const settledIndicesRef = useRef(new Set());
  const iterationCountRef = useRef(0);

  useEffect(() => {
    if (!isLoaded || hasScrambled) return;

    let timeout;
    const targetChars = targetText.split("");
    const finalState = [...initialText];
    const lettersToFix = lettersToFixRef.current;
    const settled = settledIndicesRef.current;

    const shouldScrambleMap = targetChars.map(
      (char) => char !== " " && Math.random() < 0.4
    );

    const scrambleLoop = () => {
      let index = indexRef.current;
      iterationCountRef.current++;
      let shouldUpdate = false;

      // Fixation instantanée des lettres non brouillées
      while (
        index < targetChars.length &&
        !shouldScrambleMap[index] &&
        !settled.has(index)
      ) {
        finalState[index] = targetChars[index];
        settled.add(index);
        index++;
        shouldUpdate = true;
      }

      indexRef.current = index;

      // Fin de l’animation
      if (index >= targetChars.length) {
        if (settled.size === targetChars.length) {
          clearTimeout(timeout);
          setHasScrambled(true);
          setScrambledText([...finalState]);
          return;
        }
      }

      index = indexRef.current;

      // Brouillage + fixation progressive
      if (index < targetChars.length && shouldScrambleMap[index]) {
        // Fixation
        if (
          lettersToFix.has(index) &&
          finalState[index] !== targetChars[index]
        ) {
          finalState[index] = targetChars[index];
          settled.add(index);
          lettersToFix.delete(index);
          index++;
          shouldUpdate = true;
        }

        // Faux départ
        else if (
          index > 0 &&
          settled.has(index - 1) &&
          shouldScrambleMap[index - 1] &&
          Math.random() < 0.15
        ) {
          settled.delete(index - 1);
          index--;
          shouldUpdate = true;
        }

        // Brouillage
        else {
          lettersToFix.add(index);
          finalState[index] =
            CHARS[Math.floor(Math.random() * CHARS.length)];
          shouldUpdate = true;
        }
      }

      indexRef.current = index;

      if (shouldUpdate || iterationCountRef.current % 4 === 0) {
        setScrambledText([...finalState]);
        iterationCountRef.current = 0;
      }

      timeout = setTimeout(scrambleLoop, 20 + Math.random() * 40);
    };

    timeout = setTimeout(scrambleLoop, 50);

    return () => clearTimeout(timeout);
  }, [targetText, isLoaded, hasScrambled]);

  return (
    <>
      {scrambledText.map((char, index) => {
        const isSettled = settledIndicesRef.current.has(index);
        const isScrambling = !isSettled && !hasScrambled;
        const displayChar = char === " " ? "\u00A0" : char;

        return (
          <ScrambledSpan
            key={index}
            isScrambling={isScrambling}
            isSettled={isSettled}
          >
            {displayChar}
          </ScrambledSpan>
        );
      })}
    </>
  );
}
