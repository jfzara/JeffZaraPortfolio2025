import React from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChefPreview.mp4";

export default function ProjectsSection() {
  const majorProjects = [
    {
      id: 1,
      title: "Livano – Application immobilière",
      description:
        "Plateforme web complète avec réservation, formulaires dynamiques et dashboard.",
      video: livanoPreview,
    },
    {
      id: 2,
      title: "YouChef – Application de recettes",
      description:
        "Gestion de recettes CRUD, dashboard utilisateur et animations interactives.",
      video: youChefPreview,
    },
  ];

  const minorProjects = [
    { id: 3, title: "Mini App JS", color: "#FFB700" },
    { id: 4, title: "Calculatrice React", color: "#00AEFF" },
    { id: 5, title: "API Fetch Demo", color: "#7B68EE" },
    { id: 6, title: "Projet SQL", color: "#00FF99" },
  ];

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>

      <S.MajorProjects>
        {majorProjects.map((p) => (
          <S.MajorCard key={p.id}>

            {/*  TAGS autour de la carte */}
            <div className="tag tag-demo">DEMO</div>
            <div className="tag tag-tech">TECH STACK</div>
            <div className="tag tag-case">CASE STUDY</div>

            {/* Vidéo masquée par défaut */}
            <video
              className="project-video"
              src={p.video}
              loop
              muted
              playsInline
            />

            <S.CardContent>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </S.CardContent>
          </S.MajorCard>
        ))}
      </S.MajorProjects>

      <S.MinorGrid>
        {minorProjects.map((p) => (
          <S.MinorCard key={p.id} color={p.color}>
            <span>{p.title}</span>
          </S.MinorCard>
        ))}
      </S.MinorGrid>
    </S.SectionContainer>
  );
}
