import React, { useState } from "react";
import * as S from "./SectionsContainer.styles";
import { Color } from "../ProjectsSection.styles.js";

const TAG_COLORS = ["TechGold", "CaseGreen", "GlowTitle"];


export default function NavDots({ sections, activeIndex, onDotClick }) {
  const [hoveredDot, setHoveredDot] = useState(null);
  const [wrapperHover, setWrapperHover] = useState(false);

  return (
    <S.NavWrapper
      onMouseEnter={() => setWrapperHover(true)}
      onMouseLeave={() => {
        setWrapperHover(false);
        setHoveredDot(null);
      }}
    >
      {sections.map((s, i) => {
        const accentColorKey = TAG_COLORS[i % TAG_COLORS.length];

        let labelOpacity = 0;
        if (wrapperHover) {
          if (hoveredDot === null) labelOpacity = 0.5;
          else if (hoveredDot === i) labelOpacity = 1;
          else labelOpacity = 0.2;
        }

        return (
          <S.NavDotWrapper key={i}>
            <S.NavDot
              colorKey={accentColorKey}
              active={i === activeIndex}
              onClick={() => {
                onDotClick(i);
                setWrapperHover(false);
              }}
              onMouseEnter={() => setHoveredDot(i)}
              onMouseLeave={() => setHoveredDot(null)}
            />
            <S.Label
              style={{
                opacity: labelOpacity,
                color: Color.TextOnBlack,
              }}
            >
              {s.title}
            </S.Label>
          </S.NavDotWrapper>
        );
      })}
    </S.NavWrapper>
  );
}
