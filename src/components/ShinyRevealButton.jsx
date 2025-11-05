// src/components/ShinyRevealButton.jsx
import styled from "styled-components";

const ShinyRevealButton = styled.a`
  position: relative;
  display: inline-block;
  padding: 0.8rem 1.8rem;
  font-weight: 800;
  color: #fff;        /* texte blanc par défaut */
  background: #000;   /* fond noir par défaut */
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  border-radius: 1px;
  transition: color 0.4s cubic-bezier(0.4,0,0.2,1),
              background 0.4s cubic-bezier(0.4,0,0.2,1);

  span {
    position: relative;
    z-index: 2; /* texte au-dessus du panneau */
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #b0d2ff;  /* panneau bleu clair */
    transform-origin: center;
    transform: rotateY(-180deg); /* caché derrière le bouton */
    z-index: 1;
    transition: transform 0.6s cubic-bezier(0.4,0,0.2,1);
  }

  &:hover::before {
    transform: rotateY(0deg);  /* animation rotation vers l'avant */
  }

  &:hover {
    color: #464646; /* texte devient noir au hover */
  }
`;

export default ShinyRevealButton;