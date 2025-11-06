// src/components/CustomCursor.jsx
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// 🔹 Animation “blob” pour effet flottant
const lagMotion = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); }
  25% { transform: translate(-50%, -50%) scale(1.15); }
  50% { transform: translate(-50%, -50%) scale(1.2); }
  75% { transform: translate(-50%, -50%) scale(1.15); }
  100% { transform: translate(-50%, -50%) scale(1); }
`;

// 🔹 Curseur
const Cursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  width: ${({ hover }) => (hover ? "40px" : "20px")};
  height: ${({ hover }) => (hover ? "40px" : "20px")};
  border-radius: 50%;
  background: ${({ hover }) => (hover ? "rgba(0,255,255,0.3)" : "rgba(0,255,255,0.6)")};
  border: 1px solid cyan;
  transform: translate(-50%, -50%);
  transition: all 0.25s ease-out;
  animation: ${({ hover }) => (hover ? lagMotion : "none")} 1.2s ease-in-out infinite;
`;

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // 🔹 Suivi de la souris
    const moveCursor = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", moveCursor);

    // 🔹 Gestion dynamique hover sur éléments interactifs
    const checkHover = (e) => {
      if (e.target.closest("a, button, .interactive")) setHover(true);
      else setHover(false);
    };
    document.addEventListener("mouseover", checkHover);
    document.addEventListener("mouseout", checkHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", checkHover);
      document.removeEventListener("mouseout", checkHover);
    };
  }, []);

  return (
    <Cursor
      hover={hover}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
