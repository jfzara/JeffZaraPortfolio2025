import React from "react";
import styled from "styled-components";

const Card = styled.div`
  background: linear-gradient(145deg, #f8f8f8, #eaeaea);
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08),
              inset 0 1px 2px rgba(255, 255, 255, 0.08);
  padding: 2rem;
  margin: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12),
                inset 0 1px 2px rgba(255, 255, 255, 0.08);
  }
`;

const CardBase = ({ children }) => <Card>{children}</Card>;

export default CardBase;