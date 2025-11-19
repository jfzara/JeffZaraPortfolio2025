import React, { useState, useRef } from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChef_Preview.mp4";
import textureVideo from "../assets/texture_papier.mp4";

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
    { 
      id: 1, 
      title: "Livano – Application immobilière", 
      description: "Plateforme web complète",
      video: livanoPreview,
      techStack: ["React", "Node.js", "Styled-Components", "GraphQL", "TypeScript"],
      caseStudy: ["Conception UX/UI", "Gestion CRUD immobilière", "Recherche avancée", "Filtrage des annonces"]
    },
    { 
      id: 2, 
      title: "YouChef – Application de recettes", 
      description: "Gestion de recettes CRUD",
      video: youChefPreview,
      techStack: ["React", "Express", "MongoDB", "TailwindCSS"],
      caseStudy: ["Création et modification de recettes", "Filtrage et recherche par catégorie", "Gestion des utilisateurs"]
    },
  ];

  const [tagShapes, setTagShapes] = useState({});
  const [tagsVisible, setTagsVisible] = useState({});
  const [activeTag, setActiveTag] = useState(null); // id du projet actif
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

  const handleDemoClick = (projectId) => {
    const videoEl = videoRefs.current[projectId];
    if(!videoEl) return;

    // Stop autres vidéos
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
    if(type === "demo") {
      handleDemoClick(projectId);
      return;
    }
    setActiveTag(prev => prev === projectId + "-" + type ? null : projectId + "-" + type);
  };

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>
      <S.MajorProjects>
        {majorProjects.map((p, index) => {
          const tags = ["demo", "tech", "case"];
          const positions = index === 0 ? tagPositionsFirstCard : tagPositionsSecondCard;
          const demoPlaying = videoPlaying[p.id];
          const overlayDemo = activeTag === p.id;
          const overlayTech = activeTag === p.id + "-tech";
          const overlayCase = activeTag === p.id + "-case";

          return (
            <S.MajorCard key={p.id} onMouseEnter={() => handleCardHover(p.id)}>
              {tags.map(type => {
                let label = type === "demo" ? (demoPlaying ? "■ Stop Demo" : "▶ Demo") : (type === "tech" ? "TECH STACK" : "CASE STUDY");
                return (
                 <S.Tag
  key={type}
  className={`tag tag-${type} ${tagsVisible[p.id] ? "pop-up" : ""}`}
  style={{
    ...positions[type],
    clipPath: tagShapes[p.id]?.[type] || softBlobs[0],
    background: type === "demo" ? "#f5f5f5" : "#fff",
    color: "#020079",
    border: "4px solid #000",  // bordure qui suit la forme
    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)"
  }}
  onClick={() => handleTagClick(p.id, type)}
  onMouseEnter={() => {
    const newShape = softBlobs[Math.floor(Math.random() * softBlobs.length)];
    setTagShapes(prev => ({ ...prev, [p.id]: { ...prev[p.id], [type]: newShape } }));
  }}
>
  {type === "demo" && (
    <video
      autoPlay
      loop
      muted
      playsInline
      ref={el => { if(el){ el.playbackRate=0.5; videoRefs.current[p.id]=el } }}
      style={{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        objectFit:"cover",
        opacity:0.2,
        zIndex:0,
        borderRadius:0  // plus de border-radius, clip-path définit la forme
      }}
    >
      <source src={textureVideo} type="video/mp4" />
    </video>
  )}
  <span style={{ position:"relative", zIndex:1 }}>{label}</span>
</S.Tag>

                )
              })}

              {overlayDemo && (
                <S.ClickOverlay style={{ background:"rgba(0,0,0,0.05)", height:"600px" }}>
                  <video
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    ref={el => videoRefs.current[p.id]=el}
                    style={{ width:"95%", height:"85%", objectFit:"cover", borderRadius:"4px" }}
                  />
                </S.ClickOverlay>
              )}

              {overlayTech && (
                <S.ClickOverlay style={{ background:"#fff", flexDirection:"column", alignItems:"flex-start", padding:"2rem" }}>
                  <h3>Tech Stack</h3>
                  <ul>
                    {p.techStack.map((tech,i) => <li key={i}>{tech}</li>)}
                  </ul>
                </S.ClickOverlay>
              )}

              {overlayCase && (
                <S.ClickOverlay style={{ background:"#fff", flexDirection:"column", alignItems:"flex-start", padding:"2rem" }}>
                  <h3>Case Study</h3>
                  <ul>
                    {p.caseStudy.map((item,i) => <li key={i}>{item}</li>)}
                  </ul>
                </S.ClickOverlay>
              )}

              {!overlayDemo && !overlayTech && !overlayCase && (
                <S.CardContent>
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

