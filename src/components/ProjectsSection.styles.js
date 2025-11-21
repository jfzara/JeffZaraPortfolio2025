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
   Palette
========================= */
const Color = {
    // Votre couleur
    PrimaryGreen: "#7e9e3e",
    // Nuance très claire pour les cartes (presque crème/blanc cassé)
    CardBackground: "#f3f6ec",
    // Noir pour le texte principal
    TextBlack: "#111111",
    // Gris de sous-texte
    TextGrey: "#333333",
    // Couleurs d'accentuation (conservées pour les tags tech/case)
    TechGold: "#FFD700",
    CaseGreen: "#39FF14",
};

/* =========================
   Layout
========================= */

export const SectionContainer = styled.section`
  padding: 8rem 8vw; /* Augmenter le padding pour plus d'espace */
  background: ${Color.PrimaryGreen};
  color: ${Color.TextBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 4.2rem; /* Plus grand et plus affirmé */
  font-weight: 800;
  margin-bottom: 4rem;
  width: 100%;
  padding-left: 2vw;
  color: ${Color.TextBlack};
  animation: ${fadeUp} 0.9s ease-out forwards;
`;

export const MajorProjects = styled.div`
  display: flex;
  gap: 3rem; /* Plus d'espace entre les cartes */
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  /* Responsive simple pour les empiler */
  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }
`;

/* Card */
export const MajorCard = styled.div`
  position: relative;
  width: 48%; /* Légèrement plus large */
  max-width: 600px;
  min-width: 380px;
  min-height: 580px; /* Plus d'espace */
  background: ${Color.CardBackground};
  border-radius: 12px; /* Rayon légèrement plus grand */
  padding: 3rem; /* Plus de padding interne */
  overflow: visible;
  box-sizing: border-box;
  z-index: 10;
  
  /* Ombre subtile, moderne et haut de gamme */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.03);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s;
  
  /* Effet de survol élégant */
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.05);
  }

  @media (max-width: 1200px) {
    width: 80%;
  }
`;

/* tag container used when rendering inline SVG+video+label */
export const TagWrapper = styled.div`
  position: absolute;
  width: 190px; /* Légèrement plus grand */
  height: 65px;
  transform-origin: center;
  overflow: visible;
  display: block;
  cursor: pointer;
  z-index: 9999; 
  pointer-events: auto;

  &.pop-up { animation: ${popUp} 0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
`;

/* inline svg styles */
export const TagSVG = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
  pointer-events: none; 
`;

/* video used inside tag (paper texture) */
export const TagVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  opacity: 0.45; /* Légèrement plus visible */
  pointer-events: none;
`;

/* label text over the polygon */
export const TagLabel = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  font-weight: 700;
  color: ${Color.TextBlack}; /* Changer la couleur pour le noir */
  font-size: 1rem; /* Légèrement plus lisible */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  pointer-events: none;
`;

/* Overlay (when an item is active) */
export const ClickOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 12px; 
  z-index: 9000;
  /* Fond pour l'overlay des panneaux Tech/Case - permet une bonne lecture */
  background: rgba(255, 255, 255, 0.98); 
  box-sizing: border-box;
  animation: fadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1);

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  /* video styling inside overlay */
  video {
    width: 95%;
    height: 90%;
    object-fit: contain; /* Utiliser contain pour ne pas rogner le contenu vidéo */
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  /* simple content styling for tech/case */
  .panel {
    width: 88%;
    max-height: 84%;
    overflow: auto;
    color: ${Color.TextBlack};

    h3 { 
        margin-top: 0; 
        margin-bottom: 1.2rem;
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

/* Card inner content */
export const CardContent = styled.div`
  position: relative;
  z-index: 10;
  /* Utiliser flex pour pousser le contenu en bas si nécessaire */
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-end; 

  h3 { 
    font-size: 1.8rem; 
    margin-bottom: 0.7rem; 
    color: ${Color.TextBlack}; 
    font-weight: 700;
  }

  p { 
    font-size: 1.1rem; 
    color: ${Color.TextGrey}; 
    margin: 0; 
  }
`;