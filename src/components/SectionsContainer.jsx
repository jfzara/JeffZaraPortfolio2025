import React from "react";
import styled, { keyframes } from "styled-components";

// 🔹 Animations
const flashToFinal = keyframes`
  0% { color: #FF0077; filter: brightness(1.8); }
  25% { color: #00FFF0; }
  50% { color: #FFB800; }
  75% { color: #00C2FF; }
  100% { color: inherit; filter: brightness(1); }
`;

const floatVertical = keyframes`
  0% { transform: translateY(0); opacity: 0.7; }
  50% { transform: translateY(-30px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.7; }
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
  align-items: center;
  justify-content: center;
  padding: 6vw;
  overflow: hidden;
  flex-direction: column;
  text-align: center;
  color: ${({ textColor }) => textColor};

  /* Gradient de fond avec breathing */
  background: linear-gradient(
    170deg,
    #777777 0%,
    #ffffff 50%,
    #00000000 100%
  );
  background-size: 100% 200%;
  animation: ${breathing} 12s ease-in-out infinite;

  /* Border-radius sections supprimé */
  border-radius: 0;
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
`;

// 🔹 Lignes verticales décoratives
const Deco = styled.div`
  position: absolute;
  top: 38%;
  left: ${({ left }) => left || "auto"};
  right: ${({ right }) => right || "auto"};
  width: 0.4rem;
  height: 34vh;
  background: linear-gradient(
    to bottom,
    ${({ topColor }) => topColor || "#000000"},
    ${({ midColor }) => midColor || "#bafff7"},
    ${({ bottomColor }) => bottomColor || "#000000"}
  );
  opacity: ${({ o }) => o || 0.15};
  transform: skewX(-8deg);
  animation: ${floatVertical} ${({ dur }) => dur || "16s"} ease-in-out infinite;
  z-index: 1;
`;

// 🔹 Titre
const Title = styled.h1`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 800;
  margin: 0;
  text-transform: uppercase;
  line-height: 0.9;
  letter-spacing: 0.04em;
  position: relative;
  z-index: 2;

  span {
    display: inline-block;
    animation: ${flashToFinal} 1.6s ease forwards;
    transition: transform 0.3s ease, color 0.4s ease;
  }

  span:hover {
    transform: translateY(-8px);
    color: #ffffff; /* hover blanc */
  }
`;

const Subtitle = styled.h2`
  margin-top: 1.2rem;
  font-weight: 400;
  font-size: 1.3rem;
  opacity: 0.85;
`;

const Body = styled.p`
  margin: 1.8rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 700px;
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
`;

// 🔹 Composant principal
export default function SectionsContainer({ sections }) {
  const handleScrollTo = (id) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Container>
        {sections.map((s, i) => {
          const textColor = getContrastColor("#bfbfbf");
          return (
            <Section key={i} id={`section-${i}`} textColor={textColor}>
              <Deco
                {...s.deco}
                dur={`${12 + i * 3}s`}
                topColor={s.deco?.topColor}
                midColor={s.deco?.midColor}
                bottomColor={s.deco?.bottomColor}
              />
              <Title>
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