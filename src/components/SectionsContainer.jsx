// src/components/SectionsContainer.jsx
import React, { useEffect, useState, useRef } from "react";
import styled, { keyframes, css } from "styled-components";

// 🔹 Animations premium
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

// ✨ NOUVEAU : Grain subtil pour texture organique
const grainAnimation = keyframes`
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

// ✨ NOUVEAU : Parallax subtil pour la profondeur
const parallaxFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
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

// 🔹 ✨ Container premium avec grain et vignette
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  font-family: "Inter", "SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif;
  background-color: ${({ bgColor }) => bgColor || "transparent"};
  transition: background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* ✨ Grain texture pour effet film analogique */
  &::before {
    content: "";
    position: fixed;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    width: 200%;
    height: 200%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    animation: ${grainAnimation} 8s steps(10) infinite;
    opacity: 0.4;
    z-index: 10;
  }
  
  /* ✨ Vignette subtile pour focus central */
  &::after {
    content: "";
    position: fixed;
    inset: 0;
    background: radial-gradient(
      circle at 50% 40%, 
      transparent 0%, 
      rgba(0, 0, 0, 0.15) 100%
    );
    pointer-events: none;
    z-index: 11;
  }
`;

// 🔹 ✨ Section premium avec glassmorphism et ombres douces
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
  
  /* ✨ Fond avec glassmorphism subtil */
  background: linear-gradient(
    165deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.6) 100%
  );
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  
  background-size: 100% 200%;
  animation: ${breathing} 12s ease-in-out infinite;
  
  /* ✨ Ombres douces et élégantes */
  box-shadow: 
    0 1px 3px rgba(0, 0, 0, 0.02),
    0 8px 32px rgba(0, 0, 0, 0.04),
    0 32px 64px rgba(0, 0, 0, 0.03);
  
  /* Crossfade fluide avec légère translation et flou */
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: ${({ active }) => 
    active ? "translateY(0) scale(1)" : "translateY(20px) scale(0.98)"
  };
  filter: ${({ active }) => (active ? "blur(0px)" : "blur(3px)")};
  
  /* Transition douce avec courbe d'accélération premium */
  transition: 
    opacity 1s cubic-bezier(0.25, 0.1, 0.25, 1),
    transform 1s cubic-bezier(0.25, 0.1, 0.25, 1),
    filter 1s cubic-bezier(0.25, 0.1, 0.25, 1),
    background 0.5s ease;
  
  z-index: ${({ active }) => (active ? 2 : 1)};
  pointer-events: ${({ active }) => (active ? "all" : "none")};

  @media (max-width: 768px) {
    padding: 4vw;
  }
`;

// ✨ Déco premium avec dégradé lumineux et animation
const Deco = styled.div`
  position: absolute;
  top: ${({ top }) => top || "20%"};
  left: ${({ left }) => left || "auto"};
  right: ${({ right }) => right || "auto"};
  width: 2px;
  height: 40vh;
  background: linear-gradient(
    to bottom,
    ${({ topColor }) => topColor || "#000"},
    ${({ midColor }) => midColor || "#bafff7"},
    ${({ bottomColor }) => bottomColor || "#000"}
  );
  transition: all 0.5s ease;
  opacity: 0.25;
  animation: ${parallaxFloat} 6s ease-in-out infinite;
  
  /* ✨ Glow effect */
  filter: drop-shadow(0 0 8px ${({ midColor }) => midColor || "#bafff7"});
  
  /* ✨ Reflet lumineux */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(255, 255, 255, 0.6) 50%,
      transparent
    );
  }
`;

// ✨ Titre premium avec texte dégradé et ombres subtiles
const Title = styled.h1`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  margin: 0 0 0 3vw;
  text-transform: uppercase;
  line-height: 0.85;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 2;
  
  /* ✨ Dégradé de texte premium */
  background: linear-gradient(
    135deg,
    #1a1a1a 0%,
    #4a4a4a 50%,
    #1a1a1a 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  
  /* ✨ Ombre portée subtile pour profondeur */
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08));

  span {
    display: inline-block;
    ${({ firstPanel }) =>
      firstPanel &&
      css`
        animation: ${flashColors} 1.8s ease-in-out forwards;
      `}
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), 
                color 0.4s ease;
  }

  span:hover {
    transform: translateY(-8px) scale(1.05);
    filter: drop-shadow(0 8px 16px rgba(0, 234, 255, 0.3));
    background: linear-gradient(135deg, #00eaff, #0095ff);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    font-size: clamp(2rem, 8vw, 5rem);
    margin-left: 1.5vw;
  }
`;

// ✨ Subtitle premium avec espacement optimal
const Subtitle = styled.h2`
  margin-top: 2rem;
  font-weight: 500;
  font-size: 1.5rem;
  opacity: 0.7;
  letter-spacing: 0.01em;
  line-height: 1.4;
  color: #2a2a2a;
`;

// ✨ Body premium avec typographie optimale
const Body = styled.p`
  margin: 2rem 0;
  font-size: 1.1rem;
  line-height: 1.8;
  opacity: 0.8;
  max-width: 650px;
  color: #3a3a3a;
  font-weight: 400;
  letter-spacing: 0.005em;
`;

// ✨ CTA premium avec effet néomorphique
const CTA = styled.a`
  display: inline-block;
  padding: 1.2rem 2.5rem;
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-radius: 60px;
  text-decoration: none;
  color: #fff;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  cursor: pointer;
  margin-top: 2.5rem;
  position: relative;
  z-index: 2;
  
  /* ✨ Ombres multiples pour effet néomorphique */
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 12px 24px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* ✨ Pseudo-élément pour effet de survol */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 60px;
    background: linear-gradient(135deg, #00eaff 0%, #0095ff 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &::after {
    content: "→";
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translateY(-50%) translateX(0);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &:hover {
    transform: translateY(-2px);
    padding-right: 3.5rem;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.12),
      0 8px 16px rgba(0, 0, 0, 0.1),
      0 20px 40px rgba(0, 234, 255, 0.2);
    
    &::before {
      opacity: 1;
    }
    
    &::after {
      opacity: 1;
      transform: translateY(-50%) translateX(0.5rem);
    }
  }
  
  &:active {
    transform: translateY(0);
  }
  
  span {
    position: relative;
    z-index: 1;
  }
`;

// ✨ Navigation wrapper avec fond glassmorphique
const NavWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 70px;
  padding: 2.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  /* ✨ Glassmorphism subtil */
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-left: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 
    -2px 0 8px rgba(0, 0, 0, 0.02),
    -8px 0 24px rgba(0, 0, 0, 0.04);
`;

const NavDotWrapper = styled.div`
  position: relative;
`;

// ✨ Label premium avec glassmorphism
const Label = styled.div`
  position: absolute;
  right: 100%;
  margin-right: 3.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  color: #1a1a1a;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.7rem 1.2rem;
  border-radius: 12px;
  white-space: nowrap;
  letter-spacing: 0.02em;
  
  /* ✨ Ombres élégantes */
  box-shadow: 
    0 2px 4px rgba(0, 0, 0, 0.05),
    0 8px 20px rgba(0, 0, 0, 0.08);
  
  /* ✨ Bordure subtile */
  border: 1px solid rgba(255, 255, 255, 0.6);
  
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transform: ${({ visible }) =>
    visible ? "translateX(0)" : "translateX(10px)"};
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  animation: ${floatLabel} 4s ease-in-out infinite alternate;
  
  /* ✨ Petit triangle pointer */
  &::after {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid rgba(255, 255, 255, 0.95);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

// ✨ NavDot premium avec effet néomorphique
const NavDot = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  background: ${({ active }) =>
    active
      ? "linear-gradient(145deg, #ffffff, #e6e6e6)"
      : "linear-gradient(145deg, #f5f5f5, #e0e0e0)"};
  cursor: pointer;
  position: relative;
  
  /* ✨ Ombres néomorphiques */
  box-shadow: ${({ active }) =>
    active
      ? `
        inset 2px 2px 5px rgba(0, 0, 0, 0.1),
        inset -2px -2px 5px rgba(255, 255, 255, 0.7),
        0 2px 8px rgba(0, 149, 255, 0.3)
      `
      : `
        3px 3px 8px rgba(0, 0, 0, 0.1),
        -3px -3px 8px rgba(255, 255, 255, 0.7)
      `};
  
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* ✨ Point central actif */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({ active }) => (active ? "12px" : "6px")};
    height: ${({ active }) => (active ? "12px" : "6px")};
    border-radius: 50%;
    background: ${({ active }) =>
      active
        ? "linear-gradient(135deg, #0095ff, #00eaff)"
        : "rgba(0, 0, 0, 0.15)"};
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.15);
    box-shadow: 
      3px 3px 12px rgba(0, 0, 0, 0.15),
      -3px -3px 12px rgba(255, 255, 255, 0.8),
      0 0 20px rgba(0, 149, 255, 0.2);
    
    &::before {
      width: 10px;
      height: 10px;
      background: linear-gradient(135deg, #0095ff, #00eaff);
    }
  }
  
  &:active {
    transform: scale(1);
  }

  @media (max-width: 768px) {
    width: 2.5rem;
    height: 2.5rem;
  }
`;

// ✨ Ripple premium avec dégradé
const Ripple = styled.div`
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0.4;
  background: radial-gradient(
    circle,
    rgba(0, 234, 255, 0.6) 0%,
    rgba(0, 149, 255, 0.3) 50%,
    transparent 100%
  );
  width: 20px;
  height: 20px;
  z-index: 9999;
  animation: rippleAnim 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;

  @keyframes rippleAnim {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(10);
      opacity: 0;
    }
  }
`;

// 🔹 ✨ Palette premium avec tons neutres sophistiqués
const BACKGROUND_COLORS = [
  "#fafafa", // Blanc cassé élégant
  "#f5f5f7", // Gris Apple
  "#f9f9fb", // Blanc-bleu subtil
  "#faf8f6", // Beige crème
  "#f7f9fa", // Blanc-vert menthe
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

  // 🔹 ✨ AMÉLIORATION : Couleur de fond basée sur la section active
  const currentBgColor = BACKGROUND_COLORS[activeIndex % BACKGROUND_COLORS.length];

  return (
    <Container bgColor={currentBgColor}>
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
            <Body dangerouslySetInnerHTML={{ __html: s.body }} />
            {s.cta && <CTA href={s.cta.link}><span>{s.cta.label}</span></CTA>}
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