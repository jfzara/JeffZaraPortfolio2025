import styled, { keyframes } from "styled-components";

/* =========================
   ANIMATIONS
========================= */
export const flashColors = keyframes`
  0% { color: #FF0077; filter: brightness(1.8); }
  20% { color: #00FFF0; }
  50% { color: #FFB800; }
  80% { color: #00C2FF; }
  100% { color: inherit; filter: brightness(1); }
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
  height: 100vh;
  background: ${(props) => props.bgColor};
  overflow: hidden;
`;

export const Section = styled.div`
  display: ${(props) => (props.active ? "block" : "none")};
  color: ${(props) => props.textColor};
  padding: 3rem;
  position: relative;
  transition: opacity 0.5s ease, transform 0.5s ease;
`;

/* =========================
   TITLE & TEXT
========================= */
export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  span {
    display: inline-block;
    animation: ${flashColors} 1.5s infinite;
  }
`;

export const Subtitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
`;

export const Body = styled.div`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

/* =========================
   DECORATIONS
========================= */
export const Deco = styled.div`
  position: absolute;
  top: 10%;
  left: ${(props) => props.left || "auto"};
  right: ${(props) => props.right || "auto"};
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(
    ${(props) => props.topColor || "#ff0077"},
    ${(props) => props.midColor || "#00fff0"},
    ${(props) => props.bottomColor || "#ffb800"}
  );
  animation: ${parallaxFloat} 3s ease-in-out infinite;
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
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
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
`;

export const NavDotWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.active ? "#ff0077" : "#ccc")};
  cursor: pointer;
  transition: background 0.3s;
`;

export const Label = styled.span`
  font-size: 0.9rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;
`;

/* =========================
   RIPPLE EFFECT
========================= */
export const Ripple = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  animation: rippleAnim 0.6s forwards;

  @keyframes rippleAnim {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0.8;
    }
    100% {
      transform: translate(-50%, -50%) scale(3);
      opacity: 0;
    }
  }
`;
