import React, { useState, useRef, useEffect } from "react";
import * as S from "./SectionsContainer.styles";
import Section from "./Section";
import RipplesLayer from "./RipplesLayer";
import NavDots from "./NavDots";
import { BACKGROUND_COLORS, getContrastColor } from "../constants/colors";
import textureVideo from "../../assets/texture_grainy_green.mp4";

const VIDEO_DELAY = 1200; // 1.2s avant le fondu
const FADE_DURATION = 4500; // 4.5s de fondu

export default function SectionsContainer({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const videoRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [navDotsVisible, setNavDotsVisible] = useState(false);

  const currentBgColor = BACKGROUND_COLORS[activeIndex % BACKGROUND_COLORS.length];

  useEffect(() => {
    if (!videoRef.current) return;

    // Lecture de la vidéo
    videoRef.current.playbackRate = 0.6;
    videoRef.current.play();

    // Déclenche le fondu et l'affichage des NavDots
    const fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setNavDotsVisible(true);
    }, VIDEO_DELAY);

    return () => clearTimeout(fadeTimeout);
  }, []);

  return (
    <S.Container bgColor={currentBgColor}>
      {/* Vidéo de fond */}
      <S.BackgroundVideo
        autoPlay
        muted
        playsInline
        ref={videoRef}
        isFadingOut={isFadingOut}
      >
        <source src={textureVideo} type="video/mp4" />
      </S.BackgroundVideo>

      {/* Sections */}
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
          <S.Title isFirstSection={i === 0}>
            {s.title.split("").map((char, idx) => (
              <span key={idx} style={{ "--idx": idx }}>
                {char}
              </span>
            ))}
          </S.Title>
        </Section>
      ))}

      {/* Ripples */}
      <RipplesLayer ripples={ripples} setRipples={setRipples} />

      {/* Navigation */}
      <NavDots
        sections={sections}
        activeIndex={activeIndex}
        onDotClick={setActiveIndex}
        navDotsVisible={navDotsVisible}
      />
    </S.Container>
  );
}
