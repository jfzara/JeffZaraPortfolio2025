import React from "react";
import * as S from "./ProjectsSection.styles";

export default function ProjectsSection({ active, textColor }) {
  return (
    <S.Wrapper active={active} textColor={textColor}>
      <S.Title>Mes Projets</S.Title>

      <S.ProjectGrid>
        <S.ProjectCard>
          <S.ProjectTitle>Portfolio React</S.ProjectTitle>
          <S.ProjectDesc>
            Un portfolio moderne avec transitions animées et sections dynamiques.
          </S.ProjectDesc>
        </S.ProjectCard>

        <S.ProjectCard>
          <S.ProjectTitle>App de Recettes</S.ProjectTitle>
          <S.ProjectDesc>
            Gestion de recettes, authentification JWT, interface rapide et fluide.
          </S.ProjectDesc>
        </S.ProjectCard>

        <S.ProjectCard>
          <S.ProjectTitle>Dashboard Analytics</S.ProjectTitle>
          <S.ProjectDesc>
            Dashboard interactif avec React + Recharts + API Node.
          </S.ProjectDesc>
        </S.ProjectCard>
      </S.ProjectGrid>
    </S.Wrapper>
  );
}
