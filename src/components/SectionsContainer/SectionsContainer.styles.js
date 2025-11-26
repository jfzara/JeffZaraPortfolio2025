import styled, { keyframes, css } from "styled-components";
import { Color } from "../ProjectsSection.styles.js";

/* =========================================================
   KEYFRAMES
========================================================= */

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const titleFromSpace = keyframes`
  0% { opacity: 0; transform: scale(2.5) translateX(-10vw); filter: blur(10px); }
  50% { opacity: 0.9; transform: scale(1.03); filter: blur(0.4px); }
  100% { opacity: 1; transform: scale(1) translateX(0); filter: blur(0); }
`;

const shadowPop = keyframes`
  0% { text-shadow: 0 0 0 rgba(0,0,0,0); }
  50% { text-shadow: 0 1rem 1rem rgba(0,0,0,0.35), 0 2rem 2rem rgba(0,0,0,0.25), 0 3rem 3rem rgba(0,0,0,0.15); }
  100% { text-shadow: 0 0.5rem 0.5rem rgba(0,0,0,0.35), 0 1rem 1rem rgba(0,0,0,0.25), 0 1.5rem 1.5rem rgba(0,0,0,0.15); }
`;

const flashColors = keyframes`
  0% { filter: brightness(1.4) saturate(1.3); }
  20% { filter: brightness(2) saturate(1.6); }
  50% { filter: brightness(1.6) saturate(1.4); }
  100% { filter: brightness(1) saturate(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const revealMask = keyframes`
  from { transform: translateY(0); }
  to   { transform: translateY(-100%); }
`;

const rippleAnimSoft = keyframes`
  0% { transform: scale(0.4); opacity: 0; filter: blur(1px); }
  15% { transform: scale(1); opacity: 0.25; filter: blur(2px); }
  35% { transform: scale(2.5); opacity: 0.45; filter: blur(3px); }
  55% { transform: scale(4.5); opacity: 0.35; filter: blur(5px); }
  75% { transform: scale(7); opacity: 0.15; filter: blur(8px); }
  100% { transform: scale(9); opacity: 0; filter: blur(10px); }
`;

/* =========================================================
   UTILITAIRES COULEUR
========================================================= */

const getContrastColor = () => "white";
const getAccentColor = (key) => Color[key] || Color.TechGold;

const getDarkAccentColor = (key) => {
  switch (key) {
    case "TechGold": return Color.DarkTechGold || Color.TechGold;
    case "CaseGreen": return Color.DarkCaseGreen || Color.CaseGreen;
    case "GlowTitle": return Color.DarkGlowTitle || Color.GlowTitle;
    default: return getAccentColor(key);
  }
};

/* =========================================================
   BLOCS DE CONTENU
========================================================= */

export const Body = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 75ch;
  margin: 0 auto;

  text-align: justify;
  hyphens: auto;
  text-align-last: left;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 1rem;
  }
`;

export const CTA = styled.a`
  padding: 0.8rem 1.5rem;
  border: 1px solid currentColor;
  text-decoration: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 30;

  &:hover {
    background-color: currentColor;
    color: white;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 2rem;
  z-index: 20;
  animation: fadeInBlock 1.2s ease-out forwards;

  @media (max-width: 768px) { gap: 1.5rem; }

  @keyframes fadeInBlock {
    from { opacity: 0; transform: translateY(2vh); filter: blur(4px); }
    to { opacity: 1; transform: translateY(0); filter: blur(0); }
  }
`;

export const Title = styled.h1`
  font-size: 8.5rem;
  letter-spacing: -0.02em;
  display: inline-block;
  color: ${Color.TitleFontColor || "black"};
  text-shadow: 1px 1px 0 ${Color.GlowTitle};
  position: relative;
  z-index: 30;

  @media (max-width: 1024px) { font-size: 6rem; }
  @media (max-width: 768px) { font-size: 3.5rem; letter-spacing: normal; }

  ${({ isFirstSection }) => isFirstSection && css`
    transform-origin: center;
    animation: ${titleFromSpace} 1.2s cubic-bezier(.25,.46,.45,.94) forwards,
               ${shadowPop} 1.5s forwards;
    text-shadow: 1px 1px 0 rgba(0,0,0,.5), 0 0 1px ${Color.TitleFontColor}40;
  `}

  span {
    display: inline-block;
    opacity: 0;
    cursor: pointer;
    color: ${Color.TitleFontColor || "black"};
    animation: ${titleFromSpace} 1.2s cubic-bezier(.25,.46,.45,.94) forwards,
               ${flashColors} 1.2s ease-out forwards;
    animation-delay: calc(var(--idx) * 0.05s);
    transition: transform .2s cubic-bezier(.25,.46,.45,.94), color .2s ease-out;

    &:hover {
      color: ${Color.CaseGreen};
      transform: translateY(-8px);
    }
  }
`;

export const Subtitle = styled.h2`
  font-size: 2rem;
  color: ${Color.TitleFontColor || "#525252"};
  text-shadow: 0 0 1px rgba(0,0,0,.3);
  display: inline-block;
  position: relative;
  overflow: hidden;
  z-index: 30;

  span {
    display: inline-block;
    opacity: 1;

    ${({ isFirstSection }) => isFirstSection && css`
      opacity: 0;
      animation: ${fadeIn} .4s ease-out forwards;
      animation-delay: calc(var(--idx) * .03s);

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: ${Color.TechGold || "#FFD700"};
        transform: translateY(0);
        animation: ${revealMask} .4s ease-out forwards;
        animation-delay: calc(var(--idx) * .03s);
      }
    `}
  }
`;

/* =========================================================
   CONTENEURS DE LAYOUT
========================================================= */

export const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  z-index: 10;

  ${Body}, ${TitleGroup}, ${CTA} { align-self: flex-start; margin-left: initial; margin-right: initial; }
  ${Body} { margin-left: auto; margin-right: auto; }
`;

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 6rem 8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: ${(p) => p.textColor || "#fff"};
  opacity: ${(p) => (p.active ? 1 : 0)};
  transform: translateY(${(p) => (p.active ? "0" : "20px")});
  transition: height 2s cubic-bezier(.23,1,.32,1), opacity .5s ease, transform .5s ease;
  animation: ${fadeUp} .8s ease-out forwards;

  & > * { z-index: 2; }

  ${({ isHeroActive, isLoaded }) => isHeroActive && isLoaded && css`
    height: 30vh;
    padding: 2rem 8vw;
    overflow: hidden;
    z-index: 5;
  `}

  @media (max-width: 768px) { height: auto; min-height: auto; }
`;

/* =========================================================
   BACKGROUND & EFFETS
========================================================= */

export const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #fff;
`;

export const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  overflow-x: hidden;
  opacity: .85;
  filter: brightness(1.3) saturate(1.2);
  transition: opacity 2s ease-out, filter 2s ease-out;

  ${({ $isFadingOut }) => $isFadingOut && css`
    opacity: 0;
    filter: blur(0);
  `}
`;

export const Ripple = styled.div`
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(104,104,104,1);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: ${rippleAnimSoft} .4s cubic-bezier(.2,.8,.4,1) forwards;
  mix-blend-mode: screen;
`;
