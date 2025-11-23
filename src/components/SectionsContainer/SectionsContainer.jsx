import React, { useState, useRef, useEffect } from "react";
import * as S from "./SectionsContainer.styles";
import Section from "./Section";
import RipplesLayer from "./RipplesLayer";
import NavDots from "./NavDots";
import { BACKGROUND_COLORS, getContrastColor } from "../constants/colors";
import textureVideo from "../../assets/white_bg.mp4";

export default function SectionsContainer({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const videoRef = useRef(null);

  const currentBgColor = BACKGROUND_COLORS[activeIndex % BACKGROUND_COLORS.length];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.1; // 0.3 = 30% de la vitesse normale
    }
  }, []);

  return (
    <S.Container bgColor={currentBgColor}>
      {/* === Vidéo de fond === */}
      <S.BackgroundVideo
        autoPlay
        loop
        muted
        playsInline
        ref={videoRef} // <- on attache la ref
      >
        <source src={textureVideo} type="video/mp4" />
      </S.BackgroundVideo>

{sections.map((s, i) => (
  <Section
    key={i}
    data={s}
    index={i} 
    active={i === activeIndex}
    textColor={getContrastColor(BACKGROUND_COLORS[i % BACKGROUND_COLORS.length])}
    bgColor={BACKGROUND_COLORS[i % BACKGROUND_COLORS.length] + "80"}
    decoSide={i % 2 === 0 ? "right" : "left"}
  >
    <S.Title firstPanel={i === 0}>
      {s.title.split("").map((char, idx) => (
        <span key={idx} style={{ "--idx": idx }}>
          {char}
        </span>
      ))}
    </S.Title>
  </Section>
))}

      <RipplesLayer ripples={ripples} setRipples={setRipples} />

      <NavDots
        sections={sections}
        activeIndex={activeIndex}
        onDotClick={setActiveIndex}
      />
    </S.Container>
  );
}
