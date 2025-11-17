import React, { useState } from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChefPreview.mp4";

const clipPaths  = [
  "polygon(10% 0%, 90% 10%, 85% 60%, 60% 100%, 15% 85%, 0% 50%)",
  "polygon(0% 10%, 70% 0%, 100% 30%, 90% 80%, 40% 100%, 10% 60%)",
  "polygon(5% 5%, 80% 0%, 95% 25%, 90% 75%, 50% 100%, 10% 85%)",
  "polygon(0% 0%, 80% 10%, 100% 40%, 70% 90%, 20% 100%, 0% 60%)",
  "polygon(10% 10%, 90% 5%, 95% 50%, 60% 95%, 15% 85%, 0% 40%)"
];

export default function ProjectsSection() {
  const majorProjects = [
    {
      id: 1,
      title: "Livano – Application immobilière",
      description: "Plateforme web complète ...",
      video: livanoPreview,
      tagPositions: {
        demo: { top: "-20px", left: "-15px" },
        tech: { top: "10%", right: "-30px" },
        case: { bottom: "-25px", left: "35%" },
      },
    },
    {
      id: 2,
      title: "YouChef – Application de recettes",
      description: "Gestion de recettes CRUD ...",
      video: youChefPreview,
      tagPositions: {
        demo: { top: "-25px", right: "-20px" },
        tech: { top: "15%", left: "-25px" },
        case: { bottom: "-20px", right: "30%" },
      },
    },
  ];

  const [tagShapes, setTagShapes] = useState({});

const handleHover = (projectId, tagType) => {
  const randomShape = irregularClipPaths[Math.floor(Math.random() * irregularClipPaths.length)];
  setTagShapes(prev => ({
    ...prev,
    [projectId]: { ...prev[projectId], [tagType]: randomShape }
  }));
};

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>

      <S.MajorProjects>
        {majorProjects.map((p) => (
          <S.MajorCard key={p.id}>
            {["demo","tech","case"].map(type => (
              <div
                key={type}
                className={`tag tag-${type}`}
                style={{
                  ...p.tagPositions[type],
                  clipPath: tagShapes[p.id]?.[type] || clipPaths[0]
                }}
                onMouseEnter={() => handleHover(p.id, type)}
              >
                {type==="demo"?"DEMO":type==="tech"?"TECH STACK":"CASE STUDY"}
              </div>
            ))}

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
    </S.SectionContainer>
  );
}
