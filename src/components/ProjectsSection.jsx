import React, { useState, useRef, useEffect } from "react";
import * as S from "./ProjectsSection.styles";
import livanoPreview from "../assets/projects/major/livano/livanoPreview.mp4";
import youChefPreview from "../assets/projects/major/youchef/YouChef_Preview.mp4";
import textureVideo from "../assets/texture_papier.mp4";

/*
  NOTES:
  - TagWrapper contains an inline <svg> with <polygon> so stroke matches shape exactly.
  - The polygon "shape" strings are numeric coordinate lists matching the viewBox (0 0 100 40).
  - We keep tag width/height fixed in TagWrapper and use viewBox="0 0 100 40" inside SVG.
  - We change the polygon 'points' by state to get the morph (jump-style).
*/

const baseShapes = [
  "25 0 75 4 95 18 70 34 30 36 5 20",    // soft variant A
  "20 6 80 2 95 20 65 34 25 32 0 18",    // soft variant B
  "15 3 85 8 90 24 70 34 25 30 5 20",    // soft variant C
  "10 0 85 10 90 22 70 34 20 30 0 18"    // soft variant D
];

const tagPositionsFirstCard = {
  demo: { top: "-1.4rem", left: "50%", transform: "translateX(-50%)" },
  tech: { top: "42%", right: "-1.2rem", transform: "translateY(-50%)" },
  case: { bottom: "-1.4rem", left: "50%", transform: "translateX(-50%)" }
};

const tagPositionsSecondCard = {
  demo: { top: "0%", left: "-1rem", transform: "translateY(-50%)" },
  tech: { top: "-1rem", right: "18%", transform: "translateX(0)" },
  case: { bottom: "10%", right: "-1rem", transform: "translateY(0)" }
};

export default function ProjectsSection() {
  const majorProjects = [
    {
      id: 1,
      title: "Livano – Application immobilière",
      description: "Plateforme web complète",
      video: livanoPreview,
      tagColors: { demo: "video", tech: "video", case: "video" }, // Tous les tags utilisent maintenant la vidéo
      techStack: ["React", "Node.js", "Styled-Components", "GraphQL", "TypeScript"],
      caseStudy: ["Conception UX/UI", "Gestion CRUD immobilière", "Recherche avancée", "Filtrage des annonces"]
    },
    {
      id: 2,
      title: "YouChef – Application de recettes",
      description: "Gestion de recettes CRUD",
      video: youChefPreview,
      tagColors: { demo: "video", tech: "video", case: "video" }, // Tous les tags utilisent maintenant la vidéo
      techStack: ["React", "Express", "MongoDB", "TailwindCSS"],
      caseStudy: ["Création et modification de recettes", "Filtrage et recherche par catégorie", "Gestion des utilisateurs"]
    }
  ];

  const [tagShapes, setTagShapes] = useState({});
  const [tagsVisible, setTagsVisible] = useState({});
  const [activeTag, setActiveTag] = useState(null); // null or "id" for demo or "id-tech" / "id-case"
  const [videoPlaying, setVideoPlaying] = useState({}); // { [id]: true }
  const videoRefs = useRef({});

  useEffect(() => {
    // ensure texture background videos inside tag do not try to play controls (they are muted autoplay)
    // Also ensure overlay videos get paused when needed: handled in handlers below
  }, []);

  const handleCardHover = (projectId) => {
    if (!tagsVisible[projectId]) {
      setTagsVisible(prev => ({ ...prev, [projectId]: true }));
      // choose initial shapes
      const newShapes = {};
      ["demo", "tech", "case"].forEach(type => {
        newShapes[type] = tagShapes[projectId]?.[type] || baseShapes[Math.floor(Math.random() * baseShapes.length)];
      });
      setTagShapes(prev => ({ ...prev, [projectId]: { ...prev[projectId], ...newShapes } }));
    }
  };

  const morphTag = (projectId, type) => {
    // assign a different base shape (jump morph)
    const next = baseShapes[Math.floor(Math.random() * baseShapes.length)];
    setTagShapes(prev => ({ ...prev, [projectId]: { ...prev[projectId], [type]: next } }));
  };

  const stopAllOverlayVideos = (exceptId = null) => {
    Object.keys(videoRefs.current).forEach(key => {
      const idNum = Number(key);
      if (videoRefs.current[key] && idNum !== exceptId) {
        try { videoRefs.current[key].pause(); } catch(e) {}
      }
    });
    setVideoPlaying(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(k => {
        if (Number(k) !== exceptId) delete copy[k];
      });
      return copy;
    });
  };

  const handleDemoClick = (projectId) => {
    // toggle demo overlay + playback
    const overlayKey = projectId; // using projectId as overlay demo key
    const isPlaying = !!videoPlaying[projectId];

    if (isPlaying) {
      // stop
      if (videoRefs.current[projectId]) {
        videoRefs.current[projectId].pause();
      }
      setVideoPlaying({});
      setActiveTag(null);
      return;
    }

    // start: stop other videos & set overlay
    stopAllOverlayVideos(projectId);
    setActiveTag(projectId); // show overlay for demo
    setTimeout(() => {
      const el = videoRefs.current[projectId];
      if (el) {
        el.play().catch(()=>{/* autoplay may be blocked by browser if not allowed */});
        setVideoPlaying({ [projectId]: true });
      } else {
        setVideoPlaying({ [projectId]: true });
      }
    }, 40);
  };

  const handleTagClick = (projectId, type) => {
    if (type === "demo") {
      handleDemoClick(projectId);
      return;
    }
    const key = `${projectId}-${type}`;
    if (activeTag === key) {
      setActiveTag(null);
    } else {
      stopAllOverlayVideos(null);
      setActiveTag(key);
    }
  };

  return (
    <S.SectionContainer>
      <S.Title>MES PROJETS</S.Title>

      <S.MajorProjects>
        {majorProjects.map((p, idx) => {
          const positions = idx === 0 ? tagPositionsFirstCard : tagPositionsSecondCard;
          const demoPlaying = !!videoPlaying[p.id];
          const overlayDemo = activeTag === p.id;
          const overlayTech = activeTag === `${p.id}-tech`;
          const overlayCase = activeTag === `${p.id}-case`;

          return (
            <S.MajorCard key={p.id} onMouseEnter={() => handleCardHover(p.id)}>
              {/* TAGS */}
              {["demo", "tech", "case"].map(type => {
                const label = type === "demo" ? (demoPlaying ? "■ Stop Demo" : "▶ Demo") : (type === "tech" ? "TECH STACK" : "CASE STUDY");
                const shape = (tagShapes[p.id] && tagShapes[p.id][type]) ? tagShapes[p.id][type] : baseShapes[0];
                
                // Tous les tags utilisent la vidéo si la couleur est "video"
                const isVideoTag = p.tagColors[type] === "video";
                const clipPathId = `clip-${p.id}-${type}`; // ID unique pour chaque clipPath

                return (
                  <S.TagWrapper
  key={type}
  className={tagsVisible[p.id] ? "pop-up" : ""}
  style={{
    ...positions[type],
    transform: positions[type].transform || undefined,
    cursor: "pointer",
    position: "absolute",
  }}
  onMouseEnter={() => morphTag(p.id, type)}
  onClick={() => handleTagClick(p.id, type)}
>
  {isVideoTag && (
    <S.TagVideo
      src={textureVideo}
      autoPlay
      loop
      muted
      playsInline
      style={{ 
        clipPath: `url(#${clipPathId})`,
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  )}

  <S.TagSVG
    viewBox="0 0 100 40"
    preserveAspectRatio="xMidYMid meet"
    style={{ 
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: 1 
    }}
  >
    {/* Définition du clipPath à l'intérieur du SVG */}
    <defs>
      <clipPath id={clipPathId}>
        <polygon points={shape} />
      </clipPath>
    </defs>

    <polygon
      points={shape}
      fill={
        type === "demo"
          ? "rgb(44, 44, 44)" 
          : type === "tech"
          ? "#FFD700" 
          : "#39FF14"
      }
      stroke={
        type === "demo"
          ? "#ffffff" 
          : type === "tech"
          ? "#d4b800" // Nuance plus foncée de jaune
          : "#2eaf0e" // Nuance plus foncée de vert
      }
      strokeWidth={4} // Tous les strokes sont maintenant à 4
      style={{ transition: "all 0.36s cubic-bezier(0.22,1,0.36,1)" }}
    />
  </S.TagSVG>

  <S.TagLabel 
    style={{ 
      position: "absolute", 
      top: 0,
      left: 0,
      width: '100%', 
      height: '100%',
      
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center', 
      textAlign: 'center', 
      whiteSpace: 'normal',
      
      zIndex: 2,
      // Ajustement de la taille de la police et des couleurs de texte
      fontSize: type === "demo" ? "0.9em" : "0.75em", // Légèrement plus petit pour le padding visuel
      color: type === "demo" ? "#ffffff" : "#000000" // Blanc pour demo, noir pour tech/case
    }}
  >
    {label}
  </S.TagLabel>
</S.TagWrapper>
                );
              })}

              {/* Overlay content:
                  - demo overlay shows a large video and we keep tags visible on top (z-index)
                  - tech/case overlays are simple panels with white background (no grey)
              */}
              {(overlayDemo || overlayTech || overlayCase) && (
                <S.ClickOverlay>
                  {overlayDemo && (
                    <video
                      ref={(el) => { if (el) videoRefs.current[p.id] = el; }}
                      src={p.video}
                      autoPlay
                      loop
                      muted={false}
                      playsInline
                    />
                  )}

                  {overlayTech && (
                    <div className="panel">
                      <h3>Tech Stack</h3>
                      <ul>
                        {p.techStack.map((t,i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                  )}

                  {overlayCase && (
                    <div className="panel">
                      <h3>Case Study</h3>
                      <ul>
                        {p.caseStudy.map((c,i) => <li key={i}>{c}</li>)}
                      </ul>
                    </div>
                  )}
                </S.ClickOverlay>
              )}

              {/* Card content only shown when no overlay is active for this card */}
              {!overlayDemo && !overlayTech && !overlayCase && (
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