import React, { useState, useRef, useEffect } from "react";
import * as S from "./SectionsContainer.styles";
import Section from "./Section";
import RipplesLayer from "./RipplesLayer";
import NavDots from "./NavDots";
import { BACKGROUND_COLORS, getContrastColor } from "../constants/colors";
import textureVideo from "../../assets/texture_grainy_green.mp4";

// --- NOUVELLES CONSTANTES : Total Max 3 secondes ---
const VIDEO_DELAY = 1000; // Délai avant de commencer le fade-out (1s)
const FADE_DURATION = 2000; // Durée du fondu (2s)
const TOTAL_VISIBILITY_DELAY = VIDEO_DELAY + FADE_DURATION; // 1000 + 2000 = 3000ms
// ----------------------------------------------------

export default function SectionsContainer({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const videoRef = useRef(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [navDotsVisible, setNavDotsVisible] = useState(false);

  const currentBgColor = BACKGROUND_COLORS[activeIndex % BACKGROUND_COLORS.length];

  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = 0.6;
    videoRef.current.play();

    let fadeTimeout;
    let visibilityTimeout;

    // 1. Déclenche le début du fondu après 1.2s (isFadingOut = true)
    fadeTimeout = setTimeout(() => {
      setIsFadingOut(true);
    }, VIDEO_DELAY);

    // 2. Déclenche l'apparition du contenu APRÈS la fin du fondu (total: 5.7s)
    visibilityTimeout = setTimeout(() => {
      setNavDotsVisible(true);
    }, TOTAL_VISIBILITY_DELAY);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(visibilityTimeout);
    };
  }, []);

  return (
    <S.Container bgColor={currentBgColor}>
      {/* Vidéo de fond */}
      <S.BackgroundVideo
        autoPlay
        muted
        playsInline
        ref={videoRef}
        $isFadingOut={isFadingOut}
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
          isLoaded={navDotsVisible}
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
