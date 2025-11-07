// src/components/SectionsSpace.jsx
import React, { useRef, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

// 🔹 Animation légère pour le fond
const breathing = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

// 🔹 Conteneur global horizontal
const SpaceWrapper = styled.div`
  width: max-content; /* s'adapte au contenu horizontal */
  display: flex;
  flex-direction: row;
  height: 100vh;
  background: linear-gradient(170deg, #777 0%, #fff 50%, #00000000 100%);
  background-size: 200% 200%;
  animation: ${breathing} 20s ease-in-out infinite;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;

  /* cacher scrollbar mais permettre scroll */
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 🔹 Chaque "zone" de ton espace
const Zone = styled.div`
  min-width: 100vw;
  height: 100%;
  padding: 6vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #fff;
  position: relative;
`;

// 🔹 Décors flottants
const Deco = styled.div`
  position: absolute;
  top: ${({ top }) => top || "10%"};
  left: ${({ left }) => left || "auto"};
  right: ${({ right }) => right || "auto"};
  width: 0.4rem;
  height: 40vh;
  background: linear-gradient(
    to bottom,
    ${({ topColor }) => topColor || "#000"},
    ${({ midColor }) => midColor || "#bafff7"},
    ${({ bottomColor }) => bottomColor || "#000"}
  );
  opacity: 0.15;
  transform: ${({ x, y }) => `translate(${x}px, ${y}px)`};
  transition: transform 0.3s ease;
`;

// 🔹 Titres et textes
const Title = styled.h1`
  font-size: clamp(3rem, 6vw, 6rem);
  font-weight: 800;
  margin: 0 0 1rem 0;
`;

const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 1.5rem;
  opacity: 0.9;
`;

const Body = styled.p`
  margin-top: 1rem;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;
`;

export default function SectionsSpace({ sections }) {
  const containerRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollX(containerRef.current.scrollLeft);
    };
    const ref = containerRef.current;
    ref.addEventListener("scroll", handleScroll);
    return () => ref.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SpaceWrapper ref={containerRef}>
      {sections.map((s, i) => (
        <Zone key={i}>
          <Deco
            top="15%"
            right={i % 2 === 0 ? "6vw" : "auto"}
            left={i % 2 !== 0 ? "6vw" : "auto"}
            x={Math.sin(scrollX * 0.002 + i) * 30}
            y={Math.sin(scrollX * 0.003 + i) * 20}
            topColor={s.deco?.topColor}
            midColor={s.deco?.midColor}
            bottomColor={s.deco?.bottomColor}
          />
          <Title>{s.title}</Title>
          <Subtitle>{s.subtitle}</Subtitle>
          <Body dangerouslySetInnerHTML={{ __html: s.body }} />
        </Zone>
      ))}
    </SpaceWrapper>
  );
}
