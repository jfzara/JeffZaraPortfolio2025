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

const floatLabel = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
  100% { transform: translateY(0); }
`;

// 🔹 Calcul contraste
const getContrastColor = (hexColor) => {
  if (!hexColor) return "#000";
  const c = hexColor.replace("#", "");
  const r = parseInt(c.substr(0, 2), 16);
  const g = parseInt(c.substr(2, 2), 16);
  const b = parseInt(c.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150 ? "#000" : "#fff";
};

// 🔹 Hook scroll
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

// 🔹 Section
const Section = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 6vw;
  text-align: left;
  color: ${({ textColor }) => textColor};
  background: linear-gradient(170deg, #777 0%, #fff 50%, #00000000 100%);
  background-size: 100% 200%;
  animation: ${breathing} 12s ease-in-out infinite;
  box-shadow: 0 10px 25px rgba(10, 10, 10, 0.08);

  @media (max-width: 768px) {
    padding: 4vw;
  }
`;

// 🔹 Décor
const Deco = styled.div`
  position: absolute;
  top: ${({ top }) => top || "20%"};
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
  transform: ${({ scrollOffset, waveX, waveY }) =>
    `translateX(${waveX}px) translateY(${waveY + scrollOffset}px) skewX(-8deg)`};
  transition: all 0.25s ease;
  opacity: 0.15;
`;

// 🔹 Titres
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
    transition: transform 0.25s ease, color 0.4s ease;
  }

  span:hover {
    transform: translateY(-6px);
    color: #00eaff;
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 5rem);
    margin-left: 1.5vw;
  }
`;

const Subtitle = styled.h2`
  margin-top: 1.5rem;
  font-weight: 500;
  font-size: 1.5rem;
  opacity: 0.9;
`;

const Body = styled.p`
  margin: 1.5rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;
`;

const CTA = styled.a`
  display: inline-block;
  padding: 1rem 2rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 1px;
  text-decoration: none;
  color: #fff;
  background: #000;
  transition: all 0.6s ease;
  cursor: pointer;
  margin-top: 2rem;
  position: relative;
  z-index: 2;

  &:hover {
    background: #b0d2ff;
    color: #000;
  }
`;

/* ✅ NAVIGATION ADAPTÉE */
const NavWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 32%;
  padding: 2rem 1rem;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  background: rgb(16 105 75 / 44%);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 45px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
  justify-content: center;
  z-index: 999;
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    bottom: 0;
    top: auto;
    right: 0;
    transform: none;
    flex-direction: row;
    justify-content: space-around;
    padding: 0.6rem 0.4rem;
    border-radius: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    background: rgb(16 105 75 / 44%);
    backdrop-filter: blur(15px);
    box-shadow: 0 -6px 20px rgba(0, 0, 0, 0.4);
  }
`;

const NavDotWrapper = styled.div`
  position: relative;
  filter: ${({ dimmed }) =>
    dimmed ? "brightness(0.8) blur(0.5px)" : "brightness(1)"};
  transition: filter 0.25s ease;
`;

const Label = styled.div`
  position: absolute;
  right: 100%;
  margin-right: 3rem;
  background: rgba(255, 255, 255, 0.9);
  color: #000;
  font-weight: 700;
  font-size: 1.1rem;
  padding: 0.5rem 0.9rem;
  border-radius: 1px;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateX(0)" : "translateX(10px)"};
  transition: all 0.25s ease-out;
  animation: ${floatLabel} 4s ease-in-out infinite alternate;

  @media (max-width: 768px) {
    display: none;
  }
`;

/* ✅ Boutons circulaires */
const NavDot = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  border: none;
  background: ${({ active }) =>
    active ? "linear-gradient(145deg, #fbff00, #f3f3f3)" : "rgb(0 0 0 / 80%)"};
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3);

  &:hover {
    background: linear-gradient(145deg, #777900, #8d8d8d);
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    width: 2.2rem;
    height: 2.2rem;
  }
`;

// 🔹 Composant principal
export default function SectionsContainer({ sections }) {
  const scrollY = useScrollY();
  const [hoveredDot, setHoveredDot] = useState(null);

  const handleScrollTo = (id) =>
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });

  const waveX = (i, t) => Math.sin(t * 0.003 + i) * (30 + i * 10);
  const waveY = (i, t) => Math.sin(t * 0.004 + i * 1.3) * (20 + i * 10);

  const currentSection = Math.round(scrollY / window.innerHeight);

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
                right={i % 2 === 0 ? "6vw" : "6vw"}
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
              {s.ctaHref && <CTA href={s.ctaHref}>{s.ctaText}</CTA>}
            </Section>
          );
        })}
      </Container>

      <NavWrapper>
        {sections.map((s, i) => (
          <NavDotWrapper key={i} dimmed={hoveredDot !== null && hoveredDot !== i}>
            <Label visible={hoveredDot === i}>{s.title}</Label>
            <NavDot
              active={currentSection === i}
              onClick={() => handleScrollTo(i)}
              onMouseEnter={() => setHoveredDot(i)}
              onMouseLeave={() => setHoveredDot(null)}
            />
          </NavDotWrapper>
        ))}
      </NavWrapper>
    </>
  );
}
