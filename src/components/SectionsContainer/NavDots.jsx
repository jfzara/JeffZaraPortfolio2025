import React, { useState } from "react";
import * as S from "./SectionsContainer.styles";

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
        let labelOpacity = 0;

        if (wrapperHover) {
          if (hoveredDot === null) {
            // hover sur le wrapper mais pas sur un dot précis
            labelOpacity = 0.5; // gris léger pour tous
          } else if (hoveredDot === i) {
            labelOpacity = 1; // dot survolé → full opacity
          } else {
            labelOpacity = 0.2; // les autres → plus clair encore
          }
        }

        return (
          <S.NavDotWrapper key={i}>
            <S.NavDot
              active={i === activeIndex}
              onClick={() => {
                onDotClick(i);
                setWrapperHover(false); // labels disparaissent après click
              }}
              onMouseEnter={() => setHoveredDot(i)}
              onMouseLeave={() => setHoveredDot(null)}
            />
            <S.Label
              className="label"
              style={{
                opacity: labelOpacity,
                color: hoveredDot === i ? "#000" : "#555", // dot hover → noir, sinon gris
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
