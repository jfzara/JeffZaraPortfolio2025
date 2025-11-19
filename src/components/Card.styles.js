import styled, { keyframes } from "styled-components";

// Animation "breathe" subtile (carte vivante)
const breathe = keyframes`
  0%   { transform: scale(1) rotate(0deg); }
  50%  { transform: scale(1.008) rotate(0.4deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

export const Card = styled.div`
  position: relative;
  width: 30vw;
  min-width: 280px;
  height: 330px;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 20px;
  overflow: visible;
  z-index: 1;

  animation: ${breathe} 6s ease-in-out infinite;
  transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: scale(1.015) rotate(0.8deg);
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 28% 72% 61% 39% / 41% 34% 66% 59%;
    background: rgba(0,0,0,0.03);
    z-index: 0;
    pointer-events: none;
    transition: border-radius 0.8s ease-in-out;
  }

  &:hover::before {
    border-radius: 55% 45% 38% 62% / 52% 72% 28% 48%;
  }

  /* TAGS */
  .tag {
    position: absolute;
    z-index: 10;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
    border-radius: 40px;
    font-weight: 700;
    letter-spacing: 0.03em;
    cursor: pointer;
    pointer-events: all;
    transform: scale(0.95);
    transition: all 0.5s ease-in-out;
    background: rgba(255,222,97,0.95);
    color: #000;
    clip-path: polygon(25% 0%, 75% 5%, 95% 45%, 70% 85%, 30% 95%, 5% 50%);
    will-change: clip-path, transform;
  }

  .tag:hover {
    transform: scale(1.1) rotate(-2deg);
    clip-path: polygon(20% 3%, 80% 0%, 100% 40%, 85% 95%, 30% 100%, 5% 60%);
  }

  /* Animation pop-up */
  .tag.pop-up {
    opacity: 0;
    animation: tagEntrance 1s forwards;
  }

  @keyframes tagEntrance {
    0% { opacity: 0; transform: scale(0.7) translateY(8px); }
    70% { opacity: 1; transform: scale(0.95) translateY(-2px); }
    100% { opacity: 1; transform: scale(1) translateY(0); }
  }
`;
