import React, { useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import QuadToggle from "./QuadToggle";

const Color = {
  PrimaryAccent: "#39FF14",
  CaseGreen: "#39FF14",
  GlowTitle: "#6458FF",
  TitleFontColor: "#878484",
  CardBackground: "#000000ff",
  TextSubtleOnBlack: "#B0B0B0",
   TextSubtleOnBlack2: "#ffffff",
};

const CONTENT_PADDING = "4vw";
const MAX_CONTENT_WIDTH = "1400px";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  z-index: 990;
  font-family: "Space Grotesk", sans-serif;
  background: ${({ $scrolled }) =>
    $scrolled ? "rgba(0, 0, 0, 0.95)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(12px)" : "none")};
  -webkit-backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? "blur(12px)" : "none"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled
      ? `0 2px 20px rgba(57, 255, 20, 0.1), 0 1px 0 rgba(57, 255, 20, 0.15)`
      : "none"};
  transition: background 0.1s ease, backdrop-filter 0.1s ease,
    box-shadow 0.3s ease;
`;

const InnerNav = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  max-width: ${MAX_CONTENT_WIDTH};
  width: 100%;
  margin: 0 auto;
  padding: 0 ${CONTENT_PADDING};
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 1.1rem;
  color:#009fff;
  text-decoration: none;
  letter-spacing: 5px;
  text-transform: uppercase;
  cursor: default;
  text-shadow: none;
`;

const ButtonGroupWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

const TagButtonBase = css`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0.6rem 1.4rem;
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  border: none;
  background: ${Color.CardBackground};
  color: ${Color.TextSubtleOnBlack2};
  clip-path: polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%);
  text-shadow: 0 0 6px ${Color.PrimaryAccent}, 0 0 17px ${Color.PrimaryAccent}90;
  transition: transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    transform: scale(1.05) translateY(-2px);
  }
`;

const ContactButton = styled.a`
  ${TagButtonBase}
`;

const PreferencesWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const PreferencesButton = styled.button`
  ${TagButtonBase}
  width: 130px;

  ${({ $isActive }) =>
    $isActive &&
    `
    transform: scale(1.02);
    box-shadow: 0 0 15px ${Color.PrimaryAccent}80;
  `}
`;

export default function Navbar() {
  const [prefOpen, setPrefOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled}>
      <InnerNav>
        <Brand href="#home">JEAN FABRICE ZARA</Brand>
        <ButtonGroupWrapper>
          <ContactButton href="#contact">Contact</ContactButton>
          <PreferencesWrapper>
            <PreferencesButton
              ref={buttonRef}
              $isActive={prefOpen}
              onClick={() => setPrefOpen((p) => !p)}
            >
              Préférences
            </PreferencesButton>
            <QuadToggle
              isOpen={prefOpen}
              onClose={() => setPrefOpen(false)}
              parentRef={buttonRef}
            />
          </PreferencesWrapper>
        </ButtonGroupWrapper>
      </InnerNav>
    </Nav>
  );
}