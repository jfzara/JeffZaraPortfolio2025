import styled from "styled-components";

/* CONTAINER (position relative) */
export const Wrapper = styled.div`
  position: relative;
  width: 220px;
  height: 70px;
  cursor: pointer;
  overflow: visible;     /* IMPORTANT pour montrer la bordure externe */
`;

/* VIDEO comme background */
export const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;      /* arrondis internes */
  display: block;
`;

/* BORDURE extérieure */
export const Outline = styled.div`
  position: absolute;
  top: -6px;
  left: -6px;
  width: calc(100% + 12px);
  height: calc(100% + 12px);

  border: 3px solid rgb(255, 235, 101); /* jaune clair */

  border-radius: 18px; /* légèrement plus grand que la vidéo */
  pointer-events: none; /* ne bloque pas le hover */
`;

/* TEXTE du bouton */
export const Label = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 24px;
  font-weight: bold;
  z-index: 5;
  pointer-events: none;
`;
