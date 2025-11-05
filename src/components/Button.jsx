// src/components/Button.jsx
import styled, { keyframes } from "styled-components";

const slideReveal = keyframes`
  0% { transform: translateX(0) skewX(-20deg); }
  100% { transform: translateX(100%) skewX(180deg); }
`;

export const ShinyRevealButton = styled.a`
  position: relative;
  display: inline-block;
  padding: 0.8rem 1.8rem;
  border-radius: 1px;  /* comme ton design souhaite */
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.cta};
  transition: transform 0.3s ease, filter 0.3s ease;

  & > span {
    position: relative;
    z-index: 2;
    display: inline-block;
    transition: color 0.4s ease;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 1;
  }

  &:hover::before {
    animation: ${slideReveal} 0.5s forwards;
  }

  &:hover > span {
    color: ${({ theme }) => theme.colors.section1};
  }
`;