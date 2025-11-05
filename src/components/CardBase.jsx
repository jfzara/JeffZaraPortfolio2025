// src/components/CardBase.jsx
import styled from "styled-components";

export const CardBase = styled.article`
  position: relative;
   border: 2px dashed red;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.radius};
  background: 
    ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(145deg, #dcdcdc, #f5f5f5)"
        : "linear-gradient(145deg, #2b2b2b, #3c3c3c)"};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2),
              inset 0 -1px 1px rgba(0, 0, 0, 0.1),
              0 10px 30px rgba(0, 0, 0, 0.08);
  align-items: center;
  justify-content: center;
  border: 0.5px solid
    ${({ theme }) => (theme.mode === "light" ? "#e5e5e5" : "#1f1f1f")};
  transition: ${({ theme }) => theme.transition};
  flex-direction: column;
  overflow: hidden;

  /* Effet de matière (grain léger) */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABAwEAjkp2hQAAAABJRU5ErkJggg==");
    opacity: 0.25;
    pointer-events: none;
    mix-blend-mode: overlay;
  }

  /* Lignes verticales décoratives fines avec gradient */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 2rem;
    height: 100%;
    transform: translateX(-50%);
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.15)
    );
    opacity: 0.3;
    pointer-events: none;
  }
`;