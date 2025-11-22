import styled, { keyframes } from "styled-components";

/* =========================
   Animations
========================= */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;

const popUp = keyframes`
  0% { transform: scale(0.9); opacity: 0; }
  70% { transform: scale(1.02); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

/* =========================
   Palette MISE À JOUR FINALE (CORRIGÉE)
========================= */
export const Color = {
  PrimaryAccent: "#39FF14",
  SectionBackground: "#F0F0F0",
  CardBackground: "#0A0A0A",
  TextOnBlack: "#000000",
  TextSubtleOnBlack: "#B0B0B0",
  TextOnLight: "#1A1A1A",
  TechGold: "#FFD700",
  CaseGreen: "#39FF14",

  GlowTitle: "#6458FF",

  DarkTechGold: "#CCA500",
  DarkCaseGreen: "#2CBB0F",
  DarkGlowTitle: "#4A3DCC",

  GlowShadow: "rgba(100, 88, 255, 0.8)",
};

/* =========================
   Layout
========================= */
export const SectionContainer = styled.section`
  padding: 8rem 8vw;
  background: ${Color.SectionBackground};
  color: ${Color.TextOnLight};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 4.2rem;
  font-weight: 800;
  margin-bottom: 4rem;
  width: 100%;
  padding-left: 2vw;
  color: ${Color.TextOnLight};
  text-shadow: 1px 1px 0 ${Color.GlowTitle};
  animation: ${fadeUp} 0.9s ease-out forwards;
`;

export const MajorProjects = styled.div`
  display: flex;
  gap: 3rem;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }
`;

/* Card */
export const MajorCard = styled.div`
  position: relative;
  width: 45%;
  max-width: 750px;
  min-width: 420px;
  min-height: 650px;
  background: ${Color.CardBackground};
  border-radius: 12px;
  padding: 3.5rem;
  overflow: visible;
  box-sizing: border-box;
  z-index: 10;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25), 0 3px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
              box-shadow 0.4s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35),
                0 8px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1400px) {
    width: 48%;
  }

  @media (max-width: 1200px) {
    width: 90%;
    min-width: 0;
  }
`;

/* Tag Container */
export const TagWrapper = styled.div`
  position: absolute;
  width: 190px;
  height: 65px;
  transform-origin: center;
  overflow: visible;
  display: block;
  background-color: transparent;
  cursor: pointer;
  z-index: 9999;
  pointer-events: auto;

  /* Transition et ombre de base pour la profondeur */
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease-out;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); 

  &.pop-up {
    animation: ${popUp} 0.42s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  &:hover {
    /* Effet de 'pop' et d'élévation au survol */
    transform: scale(1.05) translateY(-2px); 
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.35); 
  }
`;


export const TagSVG = styled.svg`
  /* Filtre pour le grain / l'adoucissement (plus organique) */
  filter: url(#grain-filter);

  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
  pointer-events: none;

  /* Fond transparent pour le conteneur SVG */
  background-color: transparent;

  /* IMPORTANT : le parent TagWrapper doit masquer tout débordement si nécessaire */
`;


export const TagVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.45;
  pointer-events: none;
`;

export const TagLabel = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;

  /* Style du texte pour l'effet Glow */
  font-weight: 800;
  color: ${Color.PrimaryAccent};
  font-size: 1.1rem;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;

  /* Effet de lueur (Glow Effect) */
  text-shadow: 
    0 0 4px ${Color.PrimaryAccent},
    0 0 10px ${Color.PrimaryAccent}90;
`;



/* Overlay */
export const ClickOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 12px;
  z-index: 9000;

  /* Fond de l'Overlay (assombrisseur) */
  background: rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  animation: fadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  video {
    width: 98%;
    height: 98%;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .panel {
    width: 88%;
    max-height: 84%;
    overflow: auto;
    color: ${Color.TextBlack};

    /* Style du panneau (Glassmorphism) */
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(10px) saturate(1.4);
    -webkit-backdrop-filter: blur(10px) saturate(1.4);

    border-radius: 8px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

    h3 {
      margin: 0 0 1.2rem 0;
      font-size: 1.8rem;
      color: ${Color.TextBlack};
    }

    ul {
      margin: 0;
      padding-left: 1.5rem;

      li {
        font-size: 1.1rem;
        line-height: 1.8;
        color: ${Color.TextGrey};
      }
    }
  }
`;


export const CardContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end;

  h3 {
    font-size: 2.3rem;
    margin-bottom: 0.7rem;
    color: ${Color.GlowTitle};
    font-weight: 800;
    text-shadow: 0 0 8px rgba(100, 88, 255, 0.8),
                 0 0 20px rgba(100, 88, 255, 0.4);
  }

  p {
    font-size: 1.1rem;
    color: ${Color.TextSubtleOnBlack};
    margin: 0;
  }
`;
