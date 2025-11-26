import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Color } from "../ProjectsSection.styles.js";

const BASE_SHAPES = [
  "25 0 75 4 95 18 70 34 30 36 5 20",
  "20 6 80 2 95 20 65 34 25 32 0 18",
  "15 3 85 8 90 24 70 34 25 30 5 20",
  "10 0 85 10 90 22 70 34 20 30 0 18"
];
const TAG_COLORS = ["TechGold", "CaseGreen", "GlowTitle"];
const MOBILE_BREAKPOINT = "768px";

const getAccentColor = (key) => Color[key] || Color.TechGold;

const FabWrapper = styled.div`
  position: fixed;
  top: 75vh;
  right: 25px;
  z-index: 1050;
  display: none;

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    display: block;
  }
`;

const FabButton = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const FabSVG = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
`;

const FabIcon = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 900;
  color: ${({ $menuOpen }) => ($menuOpen ? Color.PrimaryAccent : Color.BackgroundWhite)};
  transition: transform 0.3s, color 0.3s;
  transform: rotate(${({ $menuOpen }) => ($menuOpen ? "90deg" : "0deg")});
`;

const DrawerOverlay = styled.div`
  display: ${({ $menuOpen }) => ($menuOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
  backdrop-filter: blur(2px);
`;

const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  padding: 6rem 30px 1rem 1rem;
  background: ${Color.SectionBackground || Color.BackgroundWhite};
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
  transform: translateX(${({ $menuOpen }) => ($menuOpen ? "0" : "100%")});
  transition: transform 0.3s ease-out;
  z-index: 1045;
  overflow-y: auto;

  @media (max-width: 480px) {
    width: 70%;
  }
`;

const DrawerList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const DrawerItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DrawerLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${Color.TextDark || "#333"};
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  transition: color 0.2s;

  &:hover {
    color: ${Color.PrimaryAccent};
  }
`;

const DrawerDotWrapper = styled.div`
  width: 35px;
  height: 35px;
  margin-left: 15px;
  position: relative;
  transform: scale(1.2);
  transition: transform 0.3s;

  ${DrawerItem}:hover & {
    transform: scale(1.3) rotate(5deg);
  }
`;

export default function MobileNavFab({ sections, onDotClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const fabShape = BASE_SHAPES[3];
  const closedFillColor = Color.PrimaryAccent || "#333";
  const openFillColor = Color.BackgroundWhite || "#fff";
  const strokeColor = Color.PrimaryAccent || "#333";

  const handleLinkClick = (index) => {
    onDotClick(index);
    setMenuOpen(false);
  };

  return (
    <FabWrapper>
      <DrawerOverlay $menuOpen={menuOpen} onClick={() => setMenuOpen(false)} />
      <Drawer $menuOpen={menuOpen}>
        <DrawerList>
          {sections.map((s, i) => {
            const fillColor = getAccentColor(TAG_COLORS[i % TAG_COLORS.length]);
            const sectionId = s.id || s.title.toLowerCase().replace(/\s/g, "");

            return (
              <DrawerItem key={i}>
                <DrawerLink href={`#${sectionId}`} onClick={() => handleLinkClick(i)}>
                  {s.title}
                </DrawerLink>
                <DrawerDotWrapper>
                  <FabSVG viewBox="0 0 100 40">
                    <defs>
                      <clipPath id={`fab-clip-${i}`}>
                        <polygon points={fabShape} />
                      </clipPath>
                    </defs>
                    <polygon points={fabShape} fill={fillColor} stroke={strokeColor} strokeWidth={4} />
                  </FabSVG>
                </DrawerDotWrapper>
              </DrawerItem>
            );
          })}
        </DrawerList>
      </Drawer>

      <FabButton onClick={() => setMenuOpen((p) => !p)}>
        <FabSVG viewBox="0 0 100 40">
          <polygon
            points={fabShape}
            fill={menuOpen ? openFillColor : closedFillColor}
            stroke={strokeColor}
            strokeWidth={4}
            style={{ transition: "all 0.3s" }}
          />
        </FabSVG>
        <FabIcon $menuOpen={menuOpen}>{menuOpen ? "✕" : "☰"}</FabIcon>
      </FabButton>
    </FabWrapper>
  );
}
