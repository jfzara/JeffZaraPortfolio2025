import styled, { keyframes , css }  from "styled-components";
import { titleFromSpace, fadeIn, revealMask, titleWithShadow} from "./animations";





/*==========================
VIDEO================== */

export const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
 
  /* Filtre translucide / atténué */
  
  opacity: 0.3; /* rend la vidéo plus transparente */
  z-index: 0;
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
// src/components/SectionsContainer/SectionsContainer.styles.js

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* alignement à gauche */
  text-align: left;

  margin-bottom: 2.5rem;
  gap: 2rem;

  @media (max-width: 768px) {
    padding-left: 2rem;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  /* Optionnel : effet subtil à l’apparition du bloc */
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

  /* Ombre portée animée via text-shadow */
  ${({ firstPanel }) =>
    firstPanel &&
    css`
      animation: ${titleFromSpace} 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      transform-origin: center;

      /* Ombre réaliste sur le texte, qui suit le scale du titre */
      text-shadow: 
        0 0 0 rgba(0,0,0,0),
        0 0 0 rgba(0,0,0,0),
        0 0 0 rgba(0,0,0,0);

      animation: ${titleFromSpace} 1.5s cubic-bezier(0.19,1,0.22,1) forwards,
                 shadowPop 1.5s forwards;
    `}

  span {
    display: inline-block;
    cursor: default;
    color: black;

    animation: ${flashColors} 1.2s ease-out forwards;
    animation-delay: calc(var(--idx) * 0.05s);

    transition: 
      transform 0.7s cubic-bezier(0.25, 1.5, 0.5, 1), 
      color 0.1s ease-in;

    &:hover {
      color: rgba(0, 255, 240, 1);
      transform: translateY(-0.4rem);
    }
  }
`;

/* Animation text-shadow pour l’effet d’ombre portée */
export const shadowPop = keyframes`
  0% {
    text-shadow: 0 0 0 rgba(0,0,0,0);
  }
  50% {
    text-shadow: 0 1rem 1rem rgba(0,0,0,0.35),
                 0 2rem 2rem rgba(0,0,0,0.25),
                 0 3rem 3rem rgba(0,0,0,0.15);
  }
  100% {
    text-shadow: 0 0.5rem 0.5rem rgba(0,0,0,0.35),
                 0 1rem 1rem rgba(0,0,0,0.25),
                 0 1.5rem 1.5rem rgba(0,0,0,0.15);
  }
`;


export const Subtitle = styled.h2`
  font-size: 2rem;
  margin-top: 2rem; /* espace sous le H1 */
  margin-bottom: 1rem;
  color: ${(props) => props.color || "#525252ff"}; /* couleur par défaut mais modifiable via prop */
  display: inline-block;
  position: relative;
  overflow: hidden;

  span {
    display: inline-block;
    position: relative;
    transform-origin: bottom center;
    opacity: 0;

    /* === Masque dynamique couleur cyan === */
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(0, 255, 240, 1);
      transform: translateY(0);
      animation: ${revealMask} 0.6s ease-out forwards; /* plus rapide */
      animation-delay: calc(var(--idx) * 0.03s);      /* lettres plus rapides */
    }

    /* === Fade in simple === */
    animation: ${fadeIn} 0.5s ease-out forwards;      /* plus rapide */
    animation-delay: calc(var(--idx) * 0.03s);
  }

  /* Désactive les animations si ce n’est pas le premier panneau */
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
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &:hover .label {

    opacity: 0.2; /* labels grisés lorsque hover sur le wrapper */
  }
`;

export const NavDotWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-direction: row-reverse; /* pour mettre le label à gauche du dot */
`;

export const NavDot = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "rgba(0, 255, 240, 1)" : "#ccc")};
  cursor: pointer;
  transition: background 0.3s ease;

   &:hover{
 background: #a3a3a3ff;
 box-shadow: 0 0.6px 0 rgba(0, 0, 0, 0.2);
}

  &:hover + .label {
    opacity: 1;
    transform: scale(1);
    font-weight: 500;
    text-shadow: 0 0.6px 0 rgba(0, 0, 0, 0.2);
  }

  &:hover ~ .label {
    opacity: 0.1;
  }
`;

export const Label = styled.span`
  font-size: 2.5rem;
  opacity: 0;
  color: #000;
  font-weight: 300;
  transform: scale(0.7);
  transition: 
    opacity 0.8s ease,
    color 0.8s ease,
    transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1),
    text-shadow 0.8s ease;
  
  &.label {
    pointer-events: none;
  }
`;



// RIPPLE EFFECT (raffiné)
// =========================
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
  width: 10px;   // plus petit
  height: 10px;  // plus petit
  background: rgba(51, 51, 51, 1); // plus subtil
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: ${rippleAnimSoft} 0.5s ease-in-out forwards;
`;