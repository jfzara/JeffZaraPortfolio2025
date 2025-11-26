import React, { useState, useRef, useEffect } from "react";
import * as S from "./SectionsContainer.styles";
import Section from "./Section";
import RipplesLayer from "./RipplesLayer";
import NavDots from "./NavDots";
import MobileNavFab from "./MobileNavFab";

import { BACKGROUND_COLORS, getContrastColor } from "../constants/colors";
import textureVideo from "../../assets/texture_color_drops.mp4";

const VIDEO_DELAY = 2500;
const FADE_DURATION = 2000;
const TOTAL_VISIBILITY_DELAY = VIDEO_DELAY + FADE_DURATION;

export default function SectionsContainer({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [navDotsVisible, setNavDotsVisible] = useState(false);

  const videoRef = useRef(null);
  const currentBgColor = BACKGROUND_COLORS[activeIndex % BACKGROUND_COLORS.length];

  // Gestion du fade + apparition de la navigation
  useEffect(() => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = 0.9;
    videoRef.current.play();

    const fadeTimeout = setTimeout(() => setIsFadingOut(true), VIDEO_DELAY);
    const visibilityTimeout = setTimeout(() => setNavDotsVisible(true), TOTAL_VISIBILITY_DELAY);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(visibilityTimeout);
    };
  }, []);

  return (
    <S.Container bgColor={currentBgColor}>
      {/* --- Vidéo de fond --- */}
      <S.BackgroundVideo autoPlay muted playsInline ref={videoRef} $isFadingOut={isFadingOut}>
        <source src={textureVideo} type="video/mp4" />
      </S.BackgroundVideo>

      {/* --- Sections --- */}
      {sections.map((s, i) => {
        const bg = BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
        const textColor = getContrastColor(bg);
        const sectionId = s.id || s.title.toLowerCase().replace(/\s/g, "");

        return (
          <Section
            key={i}
            data={s}
            index={i}
            active={i === activeIndex}
            id={sectionId}
            isHeroActive={i === 0}
            isLoaded={navDotsVisible}
            textColor={textColor}
            bgColor={bg + "80"}
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
        );
      })}

      {/* --- Effet Ripples --- */}
      <RipplesLayer ripples={ripples} setRipples={setRipples} />

      {/* --- Navigation desktop --- */}
      <NavDots
        sections={sections}
        activeIndex={activeIndex}
        onDotClick={setActiveIndex}
        navDotsVisible={navDotsVisible}
      />

      {/* --- Navigation mobile (FAB) --- */}
      <MobileNavFab
        sections={sections}
        activeIndex={activeIndex}
        onDotClick={setActiveIndex}
        navDotsVisible={navDotsVisible}
      />
    </S.Container>
  );
}
