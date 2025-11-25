import styled, { keyframes, css } from "styled-components";
import { titleFromSpace, fadeIn, revealMask, titleWithShadow } from "./animations";
import { Color } from "../ProjectsSection.styles.js";

// Utilitaires couleur
const getAccentColor = (key) => Color[key] || Color.TechGold;

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

/* =========================
   VIDEO
========================= */
export const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;

  opacity: 0.9; /* Opacité par défaut */

  z-index: 0;
  filter: sepia(0.2) contrast(1.1) brightness(0.9);
  mix-blend-mode: multiply;

  /* Fondu sortant conditionnel */
  ${({ isFadingOut }) =>
    isFadingOut &&
    css`
      transition: opacity 4.5s ease-out;
      opacity: 0;
    `}
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
  font-size: 8.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  display: inline-block;
  color: ${Color.TitleFontColor || "black"};
  text-shadow: 1px 1px 0 ${Color.GlowTitle};
  position: relative;

  ${({ firstPanel }) =>
    firstPanel &&
    css`
      animation: ${titleFromSpace} 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      transform-origin: center;

      text-shadow:
        1px 1px 0 rgba(0, 0, 0, 0.5),
        0 0 1px ${Color.TitleFontColor + "40"};

      animation:
        ${titleFromSpace} 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards,
        shadowPop 1.5s forwards;
    `}

  &:not(${({ firstPanel }) => firstPanel}) {
    color: ${Color.TitleFontColor};
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
  }

  span {
    display: inline-block;
    cursor: default;
    color: ${Color.TitleFontColor || "black"};

    animation: ${flashColors} 1.2s ease-out forwards;
    animation-delay: calc(var(--idx) * 0.05s);

    transition: transform 0.7s cubic-bezier(0.25, 1.5, 0.5, 1), color 0.1s ease-in;

    &:hover {
      color: ${Color.CaseGreen};
      transform: translateY(-0.4rem);
    }
  }
`;

export const shadowPop = keyframes`
  0% { text-shadow: 0 0 0 rgba(0,0,0,0); }
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
  color: ${Color.TitleFontColor || "#525252ff"};
  text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);

  display: inline-block;
  position: relative;
  overflow: hidden; /* Maintenu pour les bords propres */

  /* Spans simples, sans animation ni pseudo-éléments */
  span {
    display: inline-block;
    position: relative;
    transform-origin: bottom center;
    opacity: 1;
    animation: none;
    &::before {
      content: none;
    }
  }
`;


export const Body = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

/* =========================
   RIPPLE EFFECT
========================= */
const rippleAnimSoft = keyframes`
  0% { transform: scale(0.4); opacity: 0; filter: blur(1px); }
  15% { transform: scale(1); opacity: 0.25; filter: blur(2px); }
  35% { transform: scale(2.5); opacity: 0.45; filter: blur(3px); }
  55% { transform: scale(4.5); opacity: 0.35; filter: blur(5px); }
  75% { transform: scale(7); opacity: 0.15; filter: blur(8px); }
  100% { transform: scale(9); opacity: 0; filter: blur(10px); }
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
