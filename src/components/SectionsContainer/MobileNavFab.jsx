import React, { useState } from "react";
import styled from "styled-components";
import { Color } from "../ProjectsSection.styles.js";
import textureVideo from "../../assets/texture_papier.mp4"; // (non utilisé mais laissé si tu veux l'intégrer plus tard)

/* -------------------------------------------------------
   Constantes & helpers
-------------------------------------------------------- */

const BASE_SHAPES = [
  "25 0 75 4 95 18 70 34 30 36 5 20",
  "20 6 80 2 95 20 65 34 25 32 0 18",
  "15 3 85 8 90 24 70 34 25 30 5 20",
  "10 0 85 10 90 22 70 34 20 30 0 18",
];

const TAG_COLORS = ["TechGold", "CaseGreen", "GlowTitle"];
const MOBILE_BREAKPOINT = "768px";

const getAccentColor = (key) => Color[key] || Color.TechGold;

/* Une version “fallback” si les versions sombres n’existent pas */
const getDarkAccentColor = (key) => {
  const darkMap = {
    TechGold: Color.DarkTechGold || Color.TechGold,
    CaseGreen: Color.DarkCaseGreen || Color.CaseGreen,
    GlowTitle: Color.DarkGlowTitle || Color.GlowTitle,
  };
  return darkMap[key] || getAccentColor(key);
};

/* -------------------------------------------------------
   FAB Wrapper
-------------------------------------------------------- */

const FabWrapper = styled.div`
  position: fixed;
  bottom: 25px;
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

  color: ${({ $menuOpen }) =>
    $menuOpen ? Color.PrimaryAccent : Color.BackgroundWhite};

  transition: 0.3s;
  transform: rotate(${({ $menuOpen }) => ($menuOpen ? "90deg" : "0deg")});
`;

/* -------------------------------------------------------
   Drawer / menu latéral
-------------------------------------------------------- */

const DrawerOverlay = styled.div`
  display: ${({ $menuOpen }) => ($menuOpen ? "block" : "none")};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
  z-index: 1040;
  transition: opacity 0.3s;
`;

// Mise à jour pour MobileNavFab.jsx
const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;

  width: 250px;
  height: 100%;

  /* Padding droit augmenté pour éviter la troncature */
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
  margin-top: 2rem;
  padding: 0;
  list-style: none;

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
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  text-decoration: none;

  display: flex;
  align-items: center;

  color: ${Color.TextDark || "#333"};
  transition: color 0.2s;

  &:hover {
    color: ${Color.PrimaryAccent};
  }
`;

const DrawerDotWrapper = styled.div`
  width: 35px;
  height: 35px;
  margin-left: 15px;
  transform: scale(1.2);
  transition: transform 0.3s;

  ${DrawerItem}:hover & {
    transform: scale(1.3) rotate(5deg);
  }
`;

/* -------------------------------------------------------
   Composant MobileNavFab
-------------------------------------------------------- */

export default function MobileNavFab({ sections, onDotClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (index) => {
    onDotClick(index);
    setMenuOpen(false);
  };

  const fabShape = BASE_SHAPES[3];
  const closedFill = Color.PrimaryAccent;
  const openFill = Color.BackgroundWhite;
  const stroke = Color.PrimaryAccent;

  return (
    <FabWrapper>
      {/* Overlay */}
      <DrawerOverlay $menuOpen={menuOpen} onClick={() => setMenuOpen(false)} />

      {/* Menu latéral */}
      <Drawer $menuOpen={menuOpen}>
        <DrawerList>
          {sections.map((s, i) => {
            const accentColor = getAccentColor(TAG_COLORS[i % TAG_COLORS.length]);

            return (
              <DrawerItem key={i}>
                <DrawerLink href={`#${s.id}`} onClick={() => handleClick(i)}>
                  {s.title}
                </DrawerLink>

                <DrawerDotWrapper>
                  <FabSVG viewBox="0 0 100 40">
                    <polygon
                      points={fabShape}
                      fill={accentColor}
                      stroke={stroke}
                      strokeWidth={4}
                    />
                  </FabSVG>
                </DrawerDotWrapper>
              </DrawerItem>
            );
          })}
        </DrawerList>
      </Drawer>

      {/* FAB principal */}
      <FabButton onClick={() => setMenuOpen((p) => !p)}>
        <FabSVG viewBox="0 0 100 40">
          <polygon
            points={fabShape}
            fill={menuOpen ? openFill : closedFill}
            stroke={stroke}
            strokeWidth={4}
            style={{ transition: "all 0.3s" }}
          />
        </FabSVG>

        <FabIcon $menuOpen={menuOpen}>
          {menuOpen ? "✕" : "☰"}
        </FabIcon>
      </FabButton>
    </FabWrapper>
  );
}
