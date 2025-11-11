import React, { useState, useRef, useEffect } from "react";
import * as S from "./SectionsContainer.styles";
import Section from "./Section";
import RipplesLayer from "./RipplesLayer";
import NavDots from "./NavDots";
import { BACKGROUND_COLORS } from "../constants/colors";
import textureVideo from "../../assets/texture_papier.mp4";

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
          active={i === activeIndex}
          textColor="#bfbfbf"
          decoSide={i % 2 === 0 ? "right" : "left"}
        />
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
