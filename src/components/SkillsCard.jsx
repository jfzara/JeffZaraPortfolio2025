import React from "react";
import styled from "styled-components";
import { theme } from "../theme";

const Card = styled.article`
  width: 100%;
  padding: 2.5rem;
  border-radius: ${theme.radius};
  background: ${theme.colors.skills};
  box-shadow: 0 8px 25px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Badge = styled.span`
  padding: 0.7rem 1.2rem;
  border-radius: 999px;
  background: ${theme.colors.accent};
  font-weight: 700;
  box-shadow: 0 6px 14px rgba(0,0,0,0.04);
`;

export default function SkillsCard() {
  const tags = ["Interfaces simples", "Sites rapides", "Expérience utilisateur", "SEO friendly", "Support & suivis"];

  return (
    <Card role="region" aria-label="Compétences">
      <Row>
        {tags.map((t, i) => (
          <Badge key={i} tabIndex="0">{t}</Badge>
        ))}
      </Row>
    </Card>
  );
}