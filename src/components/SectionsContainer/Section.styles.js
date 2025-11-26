import styled, { keyframes, css } from "styled-components";
import { titleFromSpace, fadeIn, revealMask, titleWithShadow } from "./animations";
import { Color } from "../ProjectsSection.styles.js";

// Animation fade-up
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

// Container principal de chaque section
export const Section = styled.section`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  padding: 6rem 8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: ${(props) => props.textColor || "#fff"};
  transition: height 2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease, transform 0.5s ease;
  opacity: ${(props) => (props.active ? 1 : 0)};
  transform: translateY(${(props) => (props.active ? "0" : "20px")});
  animation: ${fadeUp} 0.8s ease-out forwards;

  & > * {
    z-index: 2;
  }

  /* Rétractation de la Hero Section */
  ${({ isHeroActive, isLoaded }) =>
    isHeroActive &&
    isLoaded &&
    css`
      height: 30vh;
      padding-top: 2rem;
      padding-bottom: 2rem;
      overflow: hidden;
      z-index: 5;
    `}

  @media (max-width: 768px) {
    height: auto;
    min-height: auto;
  }
`;

// Titre principal
export const Title = styled.h1`
  text-shadow: 
    0 0 10px ${(props) => props.textColor + "B0"},
    0 0 20px ${(props) => props.textColor + "70"};
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

// Sous-titre avec masque
export const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 2rem 0 1rem 0;
  color: ${Color.TitleFontColor || "#525252ff"};
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
  display: inline-block;
  position: relative;
  overflow: hidden;

  span {
    display: inline-block;
    position: relative;
    transform-origin: bottom center;
    opacity: 1;
    animation: none;

    &::before {
      content: none;
      animation: none;
      background: transparent;
    }

    ${({ isFirstSection }) =>
      isFirstSection &&
      css`
        opacity: 0;
        animation: ${fadeIn} 0.4s ease-out forwards;
        animation-delay: calc(var(--idx) * 0.03s);

        &::before {
          content: "";
          position: absolute;
          inset: 0;
          background: ${Color.TechGold || "#FFD700"};
          transform: translateY(0);
          animation: ${revealMask} 0.4s ease-out forwards;
          animation-delay: calc(var(--idx) * 0.03s);
        }
      `}
  }
`;
