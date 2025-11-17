import styled, { keyframes, css } from "styled-components";

// =======================================
// ANIMATION FADE UP (pour compat globale)
// =======================================
export const fadeUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

// ========= WRAPPER ============
export const Wrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 12vh 8vw;
  box-sizing: border-box;
  opacity: 0;

  ${({ active }) =>
    active &&
    css`
      animation: ${fadeUp} 0.9s ease forwards;
    `}

  color: ${({ textColor }) => textColor || "#000"};
`;

// ========= TITRE ============
export const Title = styled.h2`
  font-size: 6rem;
  font-weight: 800;
  margin-bottom: 4vh;
  letter-spacing: -2px;
`;

// ========= GRID DES PROJETS ============
export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 3rem;
  margin-top: 2rem;
`;

// ========= CARD PROJET ============
export const ProjectCard = styled.div`
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(8px);
  border-radius: 22px;
  padding: 2rem;
  transition: 0.25s ease;
  border: 1px solid rgba(255, 255, 255, 0.35);

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 22px 40px rgba(0, 0, 0, 0.1);
  }
`;

export const ProjectTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

export const ProjectDesc = styled.p`
  font-size: 1.5rem;
  opacity: 0.9;
  line-height: 1.45;
`;
