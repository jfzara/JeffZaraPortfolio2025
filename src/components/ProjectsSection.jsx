import React, { useState, useRef } from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChef_Preview.mp4";
import textureVideo from "../assets/texture_papier.mp4";

const softBlobs = [
  "25,0 75,5 95,45 70,85 30,95 5,50",
  "20,10 80,0 95,50 65,85 25,80 0,45",
  "15,5 85,10 90,55 70,85 25,80 5,50",
  "10,0 85,15 90,50 70,85 20,80 0,40"
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
    { 
      id: 1, 
      title: "Livano – Application immobilière", 
      description: "Plateforme web complète",
      video: livanoPreview,
      tagColors: { demo: "video", tech: "#FFD700", case: "#FFD700" },
      techStack: ["React", "Node.js", "Styled-Components", "GraphQL", "TypeScript"],
      caseStudy: ["Conception UX/UI", "Gestion CRUD immobilière", "Recherche avancée", "Filtrage des annonces"]
    },
    { 
      id: 2, 
      title: "YouChef – Application de recettes", 
      description: "Gestion de recettes CRUD",
      video: youChefPreview,
      tagColors: { demo: "video", tech: "#39FF14", case: "#39FF14" },
      techStack: ["React", "Express", "MongoDB", "TailwindCSS"],
      caseStudy: ["Création et modification de recettes", "Filtrage et recherche par catégorie", "Gestion des utilisateurs"]
    },
  ];

  const [tagShapes, setTagShapes] = useState({});
  const [tagsVisible, setTagsVisible] = useState({});
  const [activeTag, setActiveTag] = useState(null);
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

  const morphTag = (projectId,type) => {
    const newShape = softBlobs[Math.floor(Math.random() * softBlobs.length)];
    setTagShapes(prev => ({ ...prev, [projectId]: { ...prev[projectId], [type]: newShape } }));
  };

  const handleDemoClick = (projectId) => {
    const videoEl = videoRefs.current[projectId];
    if(!videoEl) return;

    Object.keys(videoRefs.current).forEach(id => {
      if(Number(id) !== projectId && videoRefs.current[id]){
        videoRefs.current[id].pause();
      }
    });

    const isPlaying = videoPlaying[projectId];
    if(isPlaying){
      videoEl.pause();
      setVideoPlaying({});
      setActiveTag(null);
    } else {
      videoEl.play();
      setVideoPlaying({ [projectId]: true });
      setActiveTag(projectId);
    }
  };

  const handleTagClick = (projectId, type) => {
    if(type === "demo") return handleDemoClick(projectId);
    setActiveTag(prev => prev === projectId + "-" + type ? null : projectId + "-" + type);
  };

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>
      <S.MajorProjects>
        {majorProjects.map((p, index) => {
          const positions = index === 0 ? tagPositionsFirstCard : tagPositionsSecondCard;
          const demoPlaying = videoPlaying[p.id];
          const overlayDemo = activeTag === p.id;
          const overlayTech = activeTag === p.id + "-tech";
          const overlayCase = activeTag === p.id + "-case";

          return (
            <S.MajorCard key={p.id} onMouseEnter={() => handleCardHover(p.id)}>
              {["demo","tech","case"].map(type => {
                const label = type === "demo" ? (demoPlaying ? "■ Stop Demo" : "▶ Demo") : (type === "tech" ? "TECH STACK" : "CASE STUDY");
                const shape = tagShapes[p.id]?.[type] || softBlobs[0];
                const isVideo = p.tagColors[type]==="video";

                return (
                  <S.TagSVG
                    key={type}
                    className={tagsVisible[p.id] ? "pop-up" : ""}
                    style={{ ...positions[type] }}
                    onClick={() => handleTagClick(p.id,type)}
                    onMouseEnter={() => morphTag(p.id,type)}
                    bg={isVideo ? "#fff" : p.tagColors[type]}
                    color={isVideo ? "#020079" : "#111"}
                  >
                    {isVideo && <video src={textureVideo} autoPlay loop muted />}
                    <polygon points={shape} />
                    <foreignObject x="0" y="0" width="100%" height="100%">
                      <div>{label}</div>
                    </foreignObject>
                  </S.TagSVG>
                )
              })}

              {/* overlay content */}
              {(overlayDemo || overlayTech || overlayCase) && (
                <S.ClickOverlay>
                  {overlayDemo && (
                    <video
                      src={p.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      ref={el => videoRefs.current[p.id]=el}
                    />
                  )}
                  {overlayTech && (
                    <div style={{ animation: "fadeIn 0.3s" }}>
                      <h3>Tech Stack</h3>
                      <ul>{p.techStack.map((t,i)=><li key={i}>{t}</li>)}</ul>
                    </div>
                  )}
                  {overlayCase && (
                    <div style={{ animation: "fadeIn 0.3s" }}>
                      <h3>Case Study</h3>
                      <ul>{p.caseStudy.map((c,i)=><li key={i}>{c}</li>)}</ul>
                    </div>
                  )}
                </S.ClickOverlay>
              )}

              {/* Card content fade-out */}
              {!overlayDemo && !overlayTech && !overlayCase && (
                <S.CardContent className={activeTag ? "fade-out" : "fade-in"}>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </S.CardContent>
              )}

            </S.MajorCard>
          )
        })}
      </S.MajorProjects>
    </S.SectionContainer>
  );
}
