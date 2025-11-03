// src/components/CardBase.jsx
import styled from "styled-components";

export const CardBase = styled.article`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2.5rem;
  border-radius: ${({ theme }) => theme.radius};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  align-items: center;
  justify-content: center;
  border: 0.5px solid
    ${({ theme }) =>
      theme.mode === "light" ? "#cbabf552" : "#0f16275e"};
  transition: ${({ theme }) => theme.transition};
  flex-direction: column;
`;