// src/components/SectionsContainer/Section.styles.js
import styled, { keyframes, css } from "styled-components";

// Animation fade-up
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Container principal de chaque section
export const SectionContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 6rem 8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: ${(props) => props.textColor || "#fff"};
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: translateY(${(props) => (props.active ? "0" : "20px")});
  animation: ${fadeUp} 0.8s ease-out forwards;

  & > * {
    z-index: 2;
  }
`;

// Titre principal
export const Title = styled.h1`
  font-size: 6rem;
  margin-bottom: 2rem;
  color: ${(props) => props.textColor || "#fff"};
  position: relative;

  span {
    display: inline-block;
    animation: ${fadeUp} 0.6s ease-out forwards;
    animation-delay: calc(var(--idx) * 0.05s);
  }
`;

// Sous-titre
export const Subtitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${(props) => props.textColor || "#fff"};
`;
