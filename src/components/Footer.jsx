import React from "react";
import styled from "styled-components";

const Wrap = styled.footer`
  padding: 1rem;
  text-align:center;
  color:${p => p.theme.colors.muted};
  font-size:0.9rem;
  border-top:1px solid rgba(0,0,0,0.05);
`;

export default function Footer() {
  return (
    <Wrap aria-label="Pied de page">
      © 2025 Jean Fabrice ZARA — Montréal — Disponible pour projets — 
      <a href="https://github.com/zarajeanfabrice" target="_blank" rel="noreferrer"> GitHub</a>
    </Wrap>
  );
}