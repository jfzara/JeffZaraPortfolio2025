import React from "react";
import styled, { keyframes } from "styled-components";

// Gradient breathing
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Scramble animation (subtile)
const scrambleAnimation = keyframes`
  0%, 100% { filter: blur(0px); }
  50% { filter: blur(0.5px); }
`;

const SectionWrapper = styled.section`
  padding: 3rem 2rem;
  margin-bottom: 3rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #f9f9f9, #eaeaea);
  background-size: 200% 200%;
  animation: ${gradientAnimation} 12s ease infinite, ${scrambleAnimation} 8s ease-in-out infinite;
`;

const Section = ({ children }) => {
  return <SectionWrapper>{children}</SectionWrapper>;
};

export default Section;