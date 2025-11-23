import { keyframes } from "styled-components";
/* =========================
   Palette MISE À JOUR FINALE (CORRIGÉE)
========================= */
export const Color = {
  PrimaryAccent: "#39FF14",
  SectionBackground: "#F0F0F0",
  CardBackground: "#0A0A0A",
  TextOnBlack: "#ffffff7e",
  TextSubtleOnBlack: "#B0B0B0",
  TextOnLight: "#6969694d",
  TechGold: "#FFD700",
  CaseGreen: "#39FF14",

  GlowTitle: "#6458FF",

  DarkTechGold: "#CCA500",
  DarkCaseGreen: "#2CBB0F",
  DarkGlowTitle: "#4A3DCC",

  GlowShadow: "rgba(100, 88, 255, 0.8)",
  // 🌟 NOUVELLES NUANCES DE JAUNE POUR L'ANIMATION 🌟
MediumTechGold: "#eed231ff", // Jaune moyen
LightTechGold: "#ebd463ff", // Jaune clair
VeryLightTechGold: "#fff6c4ff", // Jaune très clair (optionnel, ou on utilise le TechGold pur)

};

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
export const titleFromSpace = keyframes`
  0%   { transform: scale(20) translateY(-15vh); opacity: 0; filter: blur(15px); color: #888; }
  5%   { transform: scale(18) translateY(-14vh); opacity: 0.05; filter: blur(13px); color: #777; }
  10%  { transform: scale(16) translateY(-13vh); opacity: 0.1; filter: blur(11px); color: #666; }
  15%  { transform: scale(14) translateY(-12vh); opacity: 0.15; filter: blur(9px); color: #555; }
  20%  { transform: scale(12) translateY(-11vh); opacity: 0.2; filter: blur(8px); color: #444; }
  25%  { transform: scale(10) translateY(-10vh); opacity: 0.3; filter: blur(7px); color: #333; }
  30%  { transform: scale(8) translateY(-9vh); opacity: 0.35; filter: blur(6px); color: #222; }
  35%  { transform: scale(6) translateY(-8vh); opacity: 0.45; filter: blur(5px); color: #222; }
  40%  { transform: scale(5) translateY(-7vh); opacity: 0.55; filter: blur(4px); color: #111; }
  45%  { transform: scale(4) translateY(-6vh); opacity: 0.65; filter: blur(3px); color: #111; }
  50%  { transform: scale(3) translateY(-5vh); opacity: 0.7; filter: blur(2.5px); color: #111; }
  55%  { transform: scale(2.5) translateY(-4vh); opacity: 0.8; filter: blur(2px); color: #111; }
  60%  { transform: scale(2) translateY(-3vh); opacity: 0.85; filter: blur(1.5px); color: #111; }
  65%  { transform: scale(1.7) translateY(-2vh); opacity: 0.9; filter: blur(1px); color: #111; }
  70%  { transform: scale(1.4) translateY(-1vh); opacity: 0.95; filter: blur(0.7px); color: #000; }
  75%  { transform: scale(1.2) translateY(-0.5vh); opacity: 0.98; filter: blur(0.5px); color: #000; }
  80%  { transform: scale(1.05) translateY(0); opacity: 1; filter: blur(0.3px); color: #000; }
  85%  { transform: scale(1.02) translateY(0.5px); opacity: 1; filter: blur(0.1px); color: #000; }
  90%  { transform: scale(0.97) translateY(1px); opacity: 1; filter: blur(0); color: #000; }
  95%  { transform: scale(1.01) translateY(0); opacity: 1; filter: blur(0); color: #000; }
  100% { transform: scale(1) translateY(0); opacity: 1; filter: blur(0); color: #000; }
`;

export const fadeIn = keyframes`
  0%   { opacity: 0; }
  100% { opacity: 1; }
`;

export const revealMask = keyframes`
    /* Utilisation de TechGold pour un dégradé de 4 nuances */
    0% { 
        transform: translateY(0);
        /* Jaune pur (le plus clair de la séquence) */
        background: ${Color.TechGold || "#FFD700"};
    }
    40% { 
        transform: translateY(-50%);
        /* Nuance légèrement plus foncée */
        background: ${Color.LightTechGold || "#FFE040"};
    }
    70% { 
        transform: translateY(-80%);
        /* Nuance plus foncée */
        background: ${Color.MediumTechGold || "#E0C000"};
    }
    100% { 
        transform: translateY(-100%);
        /* Le masque disparaît totalement */
        background: rgba(255, 254, 247, 0.18);
    }
`;


export const titleWithShadow = keyframes`
  0% {
    transform: scale(20) translateY(-15vh);
    text-shadow: 0 0 50px rgba(0,0,0,0.2);
    opacity: 0;
  }
  25% {
    transform: scale(8) translateY(-9vh);
    text-shadow: 0 20px 60px rgba(0,0,0,0.3);
    opacity: 0.3;
  }
  50% {
    transform: scale(3) translateY(-5vh);
    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
    opacity: 0.7;
  }
  75% {
    transform: scale(1.2) translateY(-0.5vh);
    text-shadow: 0 5px 15px rgba(0,0,0,0.6);
    opacity: 0.9;
  }
  100% {
    transform: scale(1) translateY(0);
    text-shadow: 0 2px 6px rgba(0,0,0,0.7);
    opacity: 1;
  }
`;
