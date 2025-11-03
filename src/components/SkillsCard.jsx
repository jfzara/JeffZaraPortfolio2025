import React from "react";
import styled from "styled-components";
import { CardBase } from "./CardBase";

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const Badge = styled.span`
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  background: #00A6FB;
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.04);
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

export default function SkillsCard() {
  const tags = [
    "React",
    "TypeScript",
    "Styled-Components",
    "UX/UI",
    "SEO",
    "Performance",
    "Accessibilité",
    "Support & Suivis",
  ];

  return (
    <CardBase role="region" aria-label="Compétences principales">
      <Row>
        {tags.map((t, i) => (
          <Badge key={i} tabIndex="0">
            {t}
          </Badge>
        ))}
      </Row>
    </CardBase>
  );
}