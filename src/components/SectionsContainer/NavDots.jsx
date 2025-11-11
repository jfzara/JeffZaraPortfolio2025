import React from "react";
import * as S from "./SectionsContainer.styles";

export default function NavDots({ sections, activeIndex, onDotClick }) {
  return (
    <S.NavWrapper>
      {sections.map((s, i) => (
        <S.NavDotWrapper key={i}>
          <S.NavDot active={i === activeIndex} onClick={() => onDotClick(i)} />
          <S.Label visible={i === activeIndex}>{s.title}</S.Label>
        </S.NavDotWrapper>
      ))}
    </S.NavWrapper>
  );
}
