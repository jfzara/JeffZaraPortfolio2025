// src/components/SectionsContainer.jsx
import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

// 🔹 Animations existantes
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

// 🔹 Conteneurs et styles existants
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: "Space Grotesk", sans-serif;
`;

const Section = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 6vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  color: ${({ textColor }) => textColor};
  background: linear-gradient(170deg, #777 0%, #fff 50%, #00000000 100%);
  background-size: 100% 200%;
  animation: ${breathing} 12s ease-in-out infinite;
  box-shadow: 0 10px 25px rgba(10, 10, 10, 0.08);
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) => (active ? "scale(1)" : "scale(0.9)")};
  transition: all 0.8s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: ${({ active }) => (active ? 2 : 1)};

  @media (max-width: 768px) {
    padding: 4vw;
  }
`;

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
  transition: all 0.25s ease;
  opacity: 0.15;
`;

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

const NavWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  background: transparent;
`;

const NavDotWrapper = styled.div`
  position: relative;
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

const NavDot = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  border: none;
  background: ${({ active }) =>
    active
      ? "linear-gradient(145deg, #0095ff, #f3f3f3)"
      : "rgb(163 160 160 / 80%)"};
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

// 🔹 Bulles / effets au clic
const Ripple = styled.div`
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0.3;
  background: rgb(167, 218, 248);
  width: 15px;
  height: 15px;
  z-index: 9999;
  animation: rippleAnim 0.7s ease-out forwards;

  @keyframes rippleAnim {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.35;
    }
    100% {
      transform: translate(-50%, -50%) scale(8);
      opacity: 0;
    }
  }
`;

// 🔹 Palette légère
const COLORS = [
  "rgba(184, 214, 255, 0.4)",
  "rgba(255, 225, 185, 0.4)",
  "rgba(255, 203, 203, 0.4)",
  "rgba(246, 217, 255, 0.4)",
  "rgba(240, 255, 205, 0.4)",
];

// 🔹 Composant principal
export default function SectionsContainer({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripples, setRipples] = useState([]);

  const handleScrollTo = (index) => {
    setActiveIndex(index);
  };

  // 🔹 Gestion clic + tactile pour ripple
  useEffect(() => {
    const createRipple = (x, y) => {
      const id = Date.now() + Math.random().toString(36).slice(2, 5);
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    const handleClick = (e) => createRipple(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        const t = e.touches[0];
        createRipple(t.clientX, t.clientY);
      }
    };

    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <Container>
      {sections.map((s, i) => {
        const textColor = getContrastColor("#bfbfbf");
        return (
          <Section key={i} active={i === activeIndex} textColor={textColor}>
            <Deco
              {...s.deco}
              left={i % 2 !== 0 ? "6vw" : "auto"}
              right={i % 2 === 0 ? "6vw" : "6vw"}
              topColor={s.deco?.topColor}
              midColor={s.deco?.midColor}
              bottomColor={s.deco?.bottomColor}
            />
            <Title firstPanel={i === 0}>
              {s.title.split("").map((letter, idx) => (
                <span key={idx} style={{ animationDelay: `${idx * 0.05}s` }}>
                  {letter}
                </span>
              ))}
            </Title>
            <Subtitle>{s.subtitle}</Subtitle>
            <Body>{s.body}</Body>
            {s.cta && <CTA href={s.cta.link}>{s.cta.label}</CTA>}
          </Section>
        );
      })}

      {/* 🔹 Ripples */}
      {ripples.map((r) => (
        <Ripple key={r.id} style={{ left: r.x, top: r.y }} />
      ))}

      {/* 🔹 Navigation */}
      <NavWrapper>
        {sections.map((_, i) => (
          <NavDotWrapper key={i}>
            <NavDot active={i === activeIndex} onClick={() => handleScrollTo(i)} />
            <Label visible={i === activeIndex}>{sections[i].title}</Label>
          </NavDotWrapper>
        ))}
      </NavWrapper>
    </Container>
  );
}
