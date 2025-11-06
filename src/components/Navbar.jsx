// src/components/Navbar.jsx
import React from "react";
import styled from "styled-components";
import Logo from "../assets/LOGO JFZ.png";

// 🔹 Nav globale
const Nav = styled.nav`
  display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    position: sticky;
    top: 0;
    background: rgb(199 199 199 / 88%);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 100;
    font-family: "Space Grotesk", sans-serif;

  @media(max-width:768px){
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

// 🔹 Brand
const Brand = styled.a`
display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 1rem;
    color: #000000;
    text-decoration: none;
    letter-spacing: 6.5px;
    text-transform: uppercase; /* toutes lettres capitalisées */

  @media(max-width:768px){
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
`;

// 🔹 City (Montréal)
const City = styled.span`
  font-weight: 400;
  font-size: 1rem;
  color: #ffffff;
  margin-left: 0.5rem;

  @media(max-width:768px){
    margin-left: 0;
  }
`;


// 🔹 Bouton Contact
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
    background: #b0d2ff;
    color: #000000;
  }
`;

// 🔹 Composant Navbar minimaliste
export default function Navbar() {
  return (
    <Nav>
     
      <Brand href="#home">
        JEAN FABRICE ZARA
        <City>Montréal</City>
       
      </Brand>
      <ContactButton href="#contact">Contact</ContactButton>
    </Nav>
  );
}
