import styled, { keyframes, css } from "styled-components";
import { titleFromSpace, fadeIn, revealMask, titleWithShadow } from "./animations";
import { Color } from "../ProjectsSection.styles.js";

// Fonction utilitaire pour récupérer la couleur à partir de la clé
const getAccentColor = (key) => {
  return Color[key] || Color.TechGold;
};

// Récupère une nuance plus sombre pour les bordures
const getDarkAccentColor = (key) => {
  switch (key) {
    case "TechGold":
      return Color.DarkTechGold || Color.TechGold;
    case "CaseGreen":
      return Color.DarkCaseGreen || Color.CaseGreen;
    case "GlowTitle":
      return Color.DarkGlowTitle || Color.GlowTitle;
    default:
      return getAccentColor(key);
  }
};

/*==========================
VIDEO
==========================*/

export const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: 0;
  filter: sepia(0.2) contrast(1.1) brightness(0.9); /* Adoucit les couleurs et ajoute une légère chaleur */
mix-blend-mode: multiply; /* Fait interagir la texture avec la couleur de fond (plus chaleureux) */


`;

/* =========================
   ANIMATIONS
========================= */

export const flashColors = keyframes`
  0% { filter: brightness(1.4) saturate(1.3); }
  20% { filter: brightness(2) saturate(1.6); }
  50% { filter: brightness(1.6) saturate(1.4); }
  100% { filter: brightness(1) saturate(1); }
`;

export const breathing = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 0% 55%; }
`;

export const floatLabel = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

export const grainAnimation = keyframes`
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-5%, -10%); }
  20% { transform: translate(-15%, 5%); }
  30% { transform: translate(7%, -25%); }
  40% { transform: translate(-5%, 25%); }
  50% { transform: translate(-15%, 10%); }
  60% { transform: translate(15%, 0%); }
  70% { transform: translate(0%, 15%); }
  80% { transform: translate(3%, 35%); }
  90% { transform: translate(-10%, 10%); }
`;

export const parallaxFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

/* =========================
   CONTAINERS
========================= */

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 50vh;
  background: ${(props) => props.bgColor};
  overflow: hidden;
`;

export const Section = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  color: ${(props) => props.textColor};
  padding: 3rem;
  scroll-margin-top: 200px;
  position: relative;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

/* =========================
   TITLE & TEXT
========================= */

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  margin-bottom: 2.5rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding-left: 2rem;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  animation: fadeInBlock 1.2s ease-out forwards;

  @keyframes fadeInBlock {
    from {
      opacity: 0;
      transform: translateY(2vh);
      filter: blur(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }
`;

export const Title = styled.h1`
  font-size: 8rem;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  display: inline-block;
  color: black;
  position: relative;

  ${({ firstPanel }) =>
    firstPanel &&
    css`
      animation: ${titleFromSpace} 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      transform-origin: center;

      text-shadow: 0 0 0 rgba(0, 0, 0, 0), 0 0 0 rgba(0, 0, 0, 0),
        0 0 0 rgba(0, 0, 0, 0);

      animation: ${titleFromSpace} 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards,
        shadowPop 1.5s forwards;
    `}

  span {
    display: inline-block;
    cursor: default;
    color: black;

    animation: ${flashColors} 1.2s ease-out forwards;
    animation-delay: calc(var(--idx) * 0.05s);

    transition: transform 0.7s cubic-bezier(0.25, 1.5, 0.5, 1),
      color 0.1s ease-in;

    &:hover {
      color: rgba(0, 255, 240, 1);
      transform: translateY(-0.4rem);
    }
  }
`;

export const shadowPop = keyframes`
  0% {
    text-shadow: 0 0 0 rgba(0,0,0,0);
  }
  50% {
    text-shadow:
      0 1rem 1rem rgba(0,0,0,0.35),
      0 2rem 2rem rgba(0,0,0,0.25),
      0 3rem 3rem rgba(0,0,0,0.15);
  }
  100% {
    text-shadow:
      0 0.5rem 0.5rem rgba(0,0,0,0.35),
      0 1rem 1rem rgba(0,0,0,0.25),
      0 1.5rem 1.5rem rgba(0,0,0,0.15);
  }
`;

export const Subtitle = styled.h2`
  font-size: 2rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: ${(props) => props.color || "#525252ff"};
  display: inline-block;
  position: relative;
  overflow: hidden;

  span {
    display: inline-block;
    position: relative;
    transform-origin: bottom center;
    opacity: 0;

    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0, 255, 240, 1);
      transform: translateY(0);
      animation: ${revealMask} 0.6s ease-out forwards;
      animation-delay: calc(var(--idx) * 0.03s);
    }

    animation: ${fadeIn} 0.5s ease-out forwards;
    animation-delay: calc(var(--idx) * 0.03s);
  }

  ${({ firstPanel }) =>
    !firstPanel &&
    css`
      span::before {
        display: none;
      }
      span {
        animation: none;
        opacity: 1;
      }
    `}
`;

export const Body = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

/* =========================
   CALL TO ACTION
========================= */

export const CTA = styled.a`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: #ff0077;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  span {
    display: inline-block;
  }

  &:hover {
    transform: translateY(-3px);
  }
`;

/* =========================
   NAVIGATION DOTS
========================= */

export const NavWrapper = styled.div`
  position: fixed;
  top: 30%;
  right: 30px;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 10px;
  /* Ajout de perspective 3D */
  perspective: 1000px;
`;

export const NavDotWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  /* Ajout de l'opacité à la transition */
  transition: transform 0.3s ease-out, opacity 0.3s ease; 

  &:hover {
    /* Ajout de la rotation 3D */
    transform: translateX(-5px) rotateY(-5deg); 
  }
`;


export const NavDot = styled.button`
  width: 45px;
  height: 45px;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  z-index: 2;
  background-color: transparent;
  position: relative;
  overflow: visible;

  ${(props) => {
    const ACCENT_COLOR = getAccentColor(props.colorKey);
    const DARK_ACCENT_COLOR = getDarkAccentColor(props.colorKey);

    const ASYMMETRIC_SHAPE_A =
      "polygon(10% 0%, 95% 20%, 80% 90%, 25% 100%, 5% 60%)";
    const ASYMMETRIC_SHAPE_B =
      "polygon(0% 40%, 85% 5%, 100% 70%, 50% 100%, 15% 75%)";

    return css`
      &::before {
        content: "";
        position: absolute;
        inset: 0;
        display: block;
        clip-path: ${ASYMMETRIC_SHAPE_A};
        background: ${ACCENT_COLOR + "30"};
        box-shadow: none;
        transition: background-color 0.5s ease,
          box-shadow 0.5s ease, transform 0.5s ease,
          clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
        transform-origin: center;
        z-index: 1;
      }

      &::after {
        content: "";
        position: absolute;
        inset: -2px;
        display: block;
        clip-path: ${ASYMMETRIC_SHAPE_A};
        background: none;
        border: 2px solid ${DARK_ACCENT_COLOR};
        box-shadow: 0 0 2px ${ACCENT_COLOR + "A0"};
        transition: border-color 0.5s ease,
          box-shadow 0.5s ease, transform 0.5s ease,
          clip-path 0.5s cubic-bezier(0.65, 0.05, 0.36, 1);
        transform-origin: center;
        z-index: 2;
      }

      &:hover::before,
      &:hover::after {
        clip-path: ${ASYMMETRIC_SHAPE_B};
        transform: scale(1.15);
      }

      &:hover::before {
        background: ${ACCENT_COLOR + "60"};
        box-shadow: 0 0 15px ${ACCENT_COLOR + "80"};
      }

      &:hover::after {
        border-color: ${DARK_ACCENT_COLOR};
        box-shadow: 0 0 8px ${ACCENT_COLOR};
      }

      ${props.active &&
      css`
        &::before,
        &::after {
          clip-path: ${ASYMMETRIC_SHAPE_A};
          transform: scale(1.1);
        }
        &::before {
          background-color: ${ACCENT_COLOR};
        }
        &::after {
          border: 2px solid ${DARK_ACCENT_COLOR};
          box-shadow: 0 0 18px ${ACCENT_COLOR},
            0 0 40px ${ACCENT_COLOR}80;
        }
      `}
    `;
  }}
`;

export const Label = styled.span`
  position: absolute;
  right: 55px;
  white-space: nowrap;

  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 0;
  border-radius: 0;

  z-index: 1;
  pointer-events: none;

  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;

  /* La couleur est désormais '#000000' (Noir) */
  color: ${Color.TextOnBlack};
  background-color: transparent;
  box-shadow: none;

  /* Effet d'ombre (glow) */
 text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
  /* Alternatives possibles :
     text-shadow: 1px 1px 0 rgba(0,0,0,0.5);
     text-shadow: 0 0 2px ${Color.GlowTitle};
  */

  opacity: 0;
  transform: translateX(10px);

  ${NavDotWrapper}:hover & {
    transform: translateX(0);
    opacity: 1;
  }
`;


/* =========================
   RIPPLE EFFECT
========================= */

const rippleAnimSoft = keyframes`
  0% {
    transform: scale(0.4);
    opacity: 0;
    filter: blur(1px);
  }
  15% {
    transform: scale(1);
    opacity: 0.25;
    filter: blur(2px);
  }
  35% {
    transform: scale(2.5);
    opacity: 0.45;
    filter: blur(3px);
  }
  55% {
    transform: scale(4.5);
    opacity: 0.35;
    filter: blur(5px);
  }
  75% {
    transform: scale(7);
    opacity: 0.15;
    filter: blur(8px);
  }
  100% {
    transform: scale(9);
    opacity: 0;
    filter: blur(10px);
  }
`;

export const Ripple = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(104, 104, 104, 1);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: ${rippleAnimSoft} 0.4s cubic-bezier(0.2, 0.8, 0.4, 1) forwards;
  mix-blend-mode: screen;
`;
