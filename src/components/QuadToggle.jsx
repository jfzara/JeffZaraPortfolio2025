// src/components/QuadToggle.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const QuadToggle = ({ isOpen, onClose }) => {
  const ref = useRef();

  // Ferme le popover si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <Popover ref={ref}>
      <Quadrant className="light fr">🇫🇷</Quadrant>
      <Quadrant className="light en">🇬🇧</Quadrant>
      <Quadrant className="dark fr">🇫🇷</Quadrant>
      <Quadrant className="dark en">🇬🇧</Quadrant>
    </Popover>
  );
};

export default QuadToggle;

/* === Styled Components === */
const Popover = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #1c1c1c;
  border-radius: 12px;
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(2, 50px);
  grid-template-rows: repeat(2, 50px);
  gap: 6px;
  box-shadow: 0 6px 25px rgba(0,0,0,0.25);
  z-index: 1000;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 50px);
  }
`;

const Quadrant = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f3f3f3;
  color: #000;

  &.dark {
    background-color: #111;
    color: #fff;
  }

  &:hover {
    transform: scale(1.08);
    filter: brightness(1.15);
    box-shadow: 0 0 8px rgba(0, 255, 240, 0.6); /* bleu électrique subtil */
  }
`;
