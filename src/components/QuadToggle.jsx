import React, { useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const neonPulse = keyframes`
  0% { box-shadow: 0 0 4px rgba(0, 255, 240, 0.4); }
  50% { box-shadow: 0 0 12px rgba(0, 255, 240, 0.8); }
  100% { box-shadow: 0 0 4px rgba(0, 255, 240, 0.4); }
`;

const QuadToggle = ({ isOpen, onClose, parentRef }) => {
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, parentRef]);

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
    left: 0;
    width: 87%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 6px;
    padding: 8px;
    background: rgba(28, 28, 28, 0.28);
    border-radius: 1px;
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.25);
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
  border-radius: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(243, 243, 243, 0.8);
  color: #000;

  &.dark {
    background-color: rgba(17, 17, 17, 0.8);
    color: #fff;
  }

  &:hover {
    transform: scale(1.1);
    animation: ${neonPulse} 0.6s ease-in-out infinite alternate;
  }
`;
