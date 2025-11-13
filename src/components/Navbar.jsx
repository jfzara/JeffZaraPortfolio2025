// src/components/Navbar.jsx
import React, { useState } from "react";
import styled from "styled-components";
import QuadToggle from "./QuadToggle";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background: rgb(255 255 255);
    height: 5vh;
    font-family: "Space Grotesk", sans-serif;
    position: relative;
`;

const Brand = styled.a`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1rem;
  color: rgba(0, 255, 240, 1);
  text-decoration: none;
  letter-spacing: 6.5px;
  text-transform: uppercase;
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 0.8rem 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 2px;
  text-decoration: none;
  color: #ffffff;
  background: #000000;
  transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
  cursor: pointer;

  &:hover {
    background: rgba(0, 255, 240, 1);
    color: #000000;
  }
`;

const PreferencesWrapper = styled.div`
  position: relative;
`;

const PreferencesButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 1px;
  border: 0.2px solid rgba(0, 255, 238, 0.123);
  background: #111;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(0, 255, 240, 0.1);
  }
`;

export default function Navbar() {
  const [prefOpen, setPrefOpen] = useState(false);

  return (
    <Nav>
      <Brand href="#home">JEAN FABRICE ZARA</Brand>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
         <ContactButton href="#contact">Contact</ContactButton>
        <PreferencesWrapper>
          <PreferencesButton onClick={() => setPrefOpen((p) => !p)}>
            Préférences
          </PreferencesButton>
          <QuadToggle isOpen={prefOpen} onClose={() => setPrefOpen(false)} />
        </PreferencesWrapper>

        
      </div>
    </Nav>
  );
}

