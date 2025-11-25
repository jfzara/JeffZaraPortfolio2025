import styled, { keyframes, css } from "styled-components";
import { titleFromSpace, fadeIn, revealMask, titleWithShadow } from "./animations";
import { Color } from "../ProjectsSection.styles.js";

// Animation fade-up
export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Section = styled.section`
  position: relative;
  box-sizing: border-box;

  width: 100%;
  min-height: 100vh;
  padding: 6rem 8vw;

  /* Réduction de la hauteur après animation */
  ${({ isHeroActive, isLoaded }) =>
    isHeroActive &&
    isLoaded &&
    css`
      min-height: 0;
      height: auto;
      padding-top: 2rem;
      padding-bottom: 2rem;
      transition: min-height 1.5s ease-out, padding 1.5s ease-out;
    `}

  @media (max-width: 768px) {
    min-height: auto; /* Empêche tout débordement sur mobile */
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

// Sous-titre avec logique du masque
export const Subtitle = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: ${Color.TitleFontColor || "#525252ff"};
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);

  display: inline-block;
  position: relative;
  overflow: hidden;

  span {
    display: inline-block;
    position: relative;
    transform-origin: bottom center;

    /* État par défaut pour toutes les pages */
    opacity: 1;
    animation: none;

    /* Désactivation du masque par défaut */
    &::before {
      content: none;
      animation: none;
      background: transparent;
    }

    /* Activation du masque et animation pour la première section */
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


