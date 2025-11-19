import React, { useState, useRef } from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChef_Preview.mp4";

const softBlobs = [
  "polygon(25% 0%, 75% 5%, 95% 45%, 70% 85%, 30% 95%, 5% 50%)",
  "polygon(20% 10%, 80% 0%, 95% 50%, 65% 85%, 25% 80%, 0% 45%)",
  "polygon(15% 5%, 85% 10%, 90% 55%, 70% 85%, 25% 80%, 5% 50%)",
  "polygon(10% 0%, 85% 15%, 90% 50%, 70% 85%, 20% 80%, 0% 40%)",
];

const tagPositionsFirstCard = {
  demo: { top: "-1rem", left: "50%", transform: "translateX(-50%)" },
  tech: { top: "40%", right: "-1rem", transform: "translateY(-50%)" },
  case: { bottom: "-1rem", left: "50%", transform: "translateX(-50%)" }
};

const tagPositionsSecondCard = {
  demo: { top: "0%", left: "-1rem", transform: "translateY(-50%)" },
  tech: { top: "-1rem", right: "20%", transform: "translateX(0)" },
  case: { bottom: "10%", right: "-1rem", transform: "translateY(0)" }
};

export default function ProjectsSection() {
  const majorProjects = [
    { id: 1, title: "Livano – Application immobilière", description: "Plateforme web complète", video: livanoPreview },
    { id: 2, title: "YouChef – Application de recettes", description: "Gestion de recettes CRUD", video: youChefPreview },
  ];

  const [tagShapes, setTagShapes] = useState({});
  const [tagsVisible, setTagsVisible] = useState({});
  const [activeTag, setActiveTag] = useState({});
  const [videoPlaying, setVideoPlaying] = useState({});
  const videoRefs = useRef({});

  const handleCardHover = (projectId) => {
    if (!tagsVisible[projectId]) {
      setTagsVisible(prev => ({ ...prev, [projectId]: true }));
      const newShapes = {};
      ["demo","tech","case"].forEach(type => {
        newShapes[type] = tagShapes[projectId]?.[type] || softBlobs[Math.floor(Math.random() * softBlobs.length)];
      });
      setTagShapes(prev => ({ ...prev, [projectId]: { ...prev[projectId], ...newShapes } }));
    }
  };

  const handleTagClick = (projectId, type) => {
    if(type === "demo"){
      const videoEl = videoRefs.current[projectId];
      if(videoEl){
        if(videoPlaying[projectId]){
          videoEl.pause();
        } else {
          videoEl.play();
        }
        setVideoPlaying(prev => ({ ...prev, [projectId]: !prev[projectId] }));
      }
    }
    setActiveTag(prev => ({
      ...prev,
      [projectId]: prev[projectId] === type ? null : type
    }));
  };

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>
      <S.MajorProjects>
        {majorProjects.map((p, index) => {
          const tags = ["demo", "tech", "case"];
          const positions = index === 0 ? tagPositionsFirstCard : tagPositionsSecondCard;
          const bgColor = index === 0 ? "rgb(255 222 97)" : "rgb(73 255 0)";
          const demoPlaying = videoPlaying[p.id];
          const overlayActive = activeTag[p.id] != null || demoPlaying;

          return (
            <S.MajorCard key={p.id} onMouseEnter={() => handleCardHover(p.id)}>
              {tags.map(type => {
                let label;
                if(type === "demo") label = demoPlaying ? "⏸ Stop Demo" : "▶ Demo";
                else if(type === "tech") label = "TECH STACK";
                else label = "CASE STUDY";

                let tagBg = type === "demo" ? "#ffcc00" : bgColor;

                // Tags autour de la modale si demo en cours
                const tagPosition = overlayActive ? S.tagPositionsAroundModal[type] : positions[type];

                return (
                  <div
                    key={type}
                    className={`tag tag-${type} ${tagsVisible[p.id] ? "pop-up" : ""}`}
                    style={{
                      ...tagPosition,
                      clipPath: tagShapes[p.id]?.[type] || softBlobs[0],
                      background: tagBg,
                      color: "#020079",
                      transition: "all 0.03s ease-in",
                    }}
                    onClick={() => handleTagClick(p.id, type)}
                    onMouseEnter={() => {
                      const newShape = softBlobs[Math.floor(Math.random() * softBlobs.length)];
                      setTagShapes(prev => ({
                        ...prev,
                        [p.id]: {
                          ...prev[p.id],
                          [type]: newShape
                        }
                      }));
                    }}
                  >
                    {label}
                  </div>
                )
              })}

              {/* Overlays */}
              {activeTag[p.id] === "demo" && (
                <S.ClickOverlay>
                  <video
                    ref={el => videoRefs.current[p.id] = el}
                    src={p.video}
                    loop
                    muted
                    autoPlay
                    playsInline
                  />
                </S.ClickOverlay>
              )}

              {activeTag[p.id] === "tech" && (
                <S.ClickOverlay>
                  <S.TechStack>
                    <span>React</span>
                    <span>Node.js</span>
                    <span>Styled-Components</span>
                    <span>GraphQL</span>
                    <span>TypeScript</span>
                  </S.TechStack>
                </S.ClickOverlay>
              )}

              {activeTag[p.id] === "case" && (
                <S.ClickOverlay>
                  <S.CaseStudyText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </S.CaseStudyText>
                </S.ClickOverlay>
              )}

              {/* Masquer titre si overlay actif */}
              {!overlayActive && (
                <S.CardContent>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </S.CardContent>
              )}
            </S.MajorCard>
          );
        })}
      </S.MajorProjects>
    </S.SectionContainer>
  );
}
