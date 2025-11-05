import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

// 🔹 Animations
const flashColors = keyframes`
  0% { color: #FF0077; filter: brightness(1.8); }
  20% { color: #00FFF0; }
  50% { color: #FFB800; }
  80% { color: #00C2FF; }
  100% { color: inherit; filter: brightness(1); }
`;

const breathing = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 0% 55%; }
`;

// 🔹 Calcul automatique de la couleur du texte
const getContrastColor = (hexColor) => {
  if (!hexColor) return "#000";
  const c = hexColor.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#fff";
};

// 🔹 Hook pour scroll
const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return scrollY;
};

// 🔹 Conteneur global
const Container = styled.div`
  scroll-behavior: smooth;
  overflow-x: hidden;
  font-family: "Space Grotesk", sans-serif;
  position: relative;
`;

// 🔹 Section avec asymétrie
const Section = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 6vw;
  overflow: hidden;
  text-align: left;
  color: ${({ textColor }) => textColor};

  background: linear-gradient(
    170deg,
    #777777 0%,
    #ffffff 50%,
    #00000000 100%
  );
  background-size: 100% 200%;
  animation: ${breathing} 12s ease-in-out infinite;

  box-shadow: 0 10px 25px rgba(0,0,0,0.08);

  @media (max-width: 768px) {
    padding: 4vw;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

// 🔹 Lignes verticales décoratives "verre d'eau" lourdes
const Deco = styled.div`
  position: absolute;
  top: ${({ top }) => top || "20%"};
  left: ${({ left }) => left || "auto"};
  right: ${({ right }) => right || "auto"};
  width: 0.4rem;
  height: 40vh;
  background: linear-gradient(
    to bottom,
    ${({ topColor }) => topColor || "#000000"},
    ${({ midColor }) => midColor || "#bafff7"},
    ${({ bottomColor }) => bottomColor || "#000000"}
  );
  transform: ${({ scrollOffset, waveX, waveY }) =>
    `translateX(${waveX}px) translateY(${waveY + scrollOffset}px) skewX(-8deg)`};
  transition: all 0.25s ease;
  z-index: 1;
  opacity: 0.15;

  @media (max-width: 768px) {
    width: 0.2rem;
    height: 30vh;
    top: ${({ top }) => top || "15%"};
  }
`;

// 🔹 Titre
const Title = styled.h1`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  margin: 0 0 0 3vw;
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: 0.04em;
  position: relative;
  z-index: 2;

  span {
    display: inline-block;
    ${({ firstPanel }) =>
      firstPanel &&
      css`
        animation: ${flashColors} 1.8s ease-in-out forwards;
      `}
    transition: transform 0.3s ease, color 0.4s ease;
  }

  span:hover {
    transform: translateY(-1px);
    color: #afafaf;
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 5rem);
    margin-left: 1.5vw;
  }
`;

const Subtitle = styled.h2`
  margin-top: 1rem;
  font-weight: 400;
  font-size: 1.3rem;
  opacity: 0.85;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Body = styled.p`
  margin: 1.5rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

// 🔹 CTA des sections
const CTA = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 1px;
  text-decoration: none;
  color: #FFFFFF;
  background: #000000;
  transition: all 0.6s ease;
  cursor: pointer;
  margin-top: 2rem;
  position: relative;
  z-index: 2;

  &:hover {
    background: #b0d2ff;
    color: #464646;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 1.2rem;
    font-size: 0.9rem;
    margin-top: 1rem;
  }
`;

// 🔹 Navigation rapide
const NavContainer = styled.nav`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 999;
`;

const NavDot = styled.button`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? "#00ffff" : "#666")};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #ffffff;
    transform: scale(1.2);
  }

  @media (max-width: 768px) {
    width: 0.8rem;
    height: 0.8rem;
  }
`;

// 🔹 Composant principal
export default function SectionsContainer({ sections }) {
  const scrollY = useScrollY();

  const handleScrollTo = (id) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // mouvement organique plus lent et plus franc
  const waveX = (i, t) => {
    const amplitude = 30 + (i % 3) * 20;
    const freq = 0.003;
    return Math.sin(t * freq + i) * amplitude;
  };

  const waveY = (i, t) => {
    const amplitude = 20 + (i % 2) * 15;
    const freq = 0.004;
    return Math.sin(t * freq + i * 1.3) * amplitude;
  };

  return (
    <>
      <Container>
        {sections.map((s, i) => {
          const textColor = getContrastColor("#bfbfbf");
          const scrollOffset = scrollY * 0.15;

          return (
            <Section key={i} id={`section-${i}`} textColor={textColor}>
              <Deco
                {...s.deco}
                scrollOffset={scrollOffset}
                waveX={waveX(i, scrollY)}
                waveY={waveY(i, scrollY)}
                topColor={s.deco?.topColor}
                midColor={s.deco?.midColor}
                bottomColor={s.deco?.bottomColor}
                left={i % 2 !== 0 ? "6vw" : "auto"}
                right={i % 2 === 0 ? "6vw" : "auto"}
              />
              <Title firstPanel={i === 0}>
                {s.title.split("").map((letter, idx) => (
                  <span key={idx} style={{ animationDelay: `${idx * 0.05}s` }}>
                    {letter}
                  </span>
                ))}
              </Title>
              <Subtitle>{s.subtitle}</Subtitle>
              <Body dangerouslySetInnerHTML={{ __html: s.body }} />
              {s.ctaHref && (
                <CTA href={s.ctaHref} onClick={(e) => e.stopPropagation()}>
                  {s.ctaText}
                </CTA>
              )}
            </Section>
          );
        })}
      </Container>

      {/* Navigation instantanée */}
      <NavContainer>
        {sections.map((_, i) => (
          <NavDot key={i} onClick={() => handleScrollTo(i)} />
        ))}
      </NavContainer>
    </>
  );
}
