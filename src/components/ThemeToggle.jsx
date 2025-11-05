// src/components/ThemeToggle.jsx
import React from "react";
import styled from "styled-components";

const ToggleWrap = styled.button`
  --sz: 44px;
  width: calc(var(--sz) * 1.9);
  height: var(--sz);
  border-radius: calc(var(--sz)/2);
  padding: 4px;
  display: inline-flex;
  align-items: center;
  background: ${({ theme }) => (theme.mode === "light" ? "linear-gradient(90deg,#fff,#f7f7f7)" : "linear-gradient(90deg,#0e0f1a,#12121b)")};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 18px rgba(0,0,0,0.08);
  cursor: pointer;
  position: relative;
  transition: background 0.3s ease, transform 0.2s ease;
  &:focus { outline: 2px solid ${({ theme }) => theme.colors.accent}; outline-offset: 3px; }
`;

const Knob = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => (theme.mode === "light" ? theme.colors.primary : theme.colors.accent)};
  transform: translateX(${({ isDark }) => (isDark ? "calc(100% - 36px - 8px)" : "0")});
  transition: transform 360ms cubic-bezier(.22,.9,.2,1), background 300ms ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
`;

// small icon layer for subtle morph (SVG optional)
export default function ThemeToggle({ themeMode, onToggle }) {
  const isDark = themeMode === "dark";
  return (
    <ToggleWrap aria-pressed={isDark} onClick={onToggle} aria-label="Basculer thème">
      <Knob isDark={isDark}>{isDark ? "🌙" : "☀️"}</Knob>
    </ToggleWrap>
  );
}