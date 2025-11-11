import React, { useState } from "react";
import * as S from "./SectionsContainer.styles";
import Section from "./Section";
import RipplesLayer from "./RipplesLayer";
import NavDots from "./NavDots";
import { BACKGROUND_COLORS } from "../constants/colors";

export default function SectionsContainer({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripples, setRipples] = useState([]);

  const currentBgColor = BACKGROUND_COLORS[activeIndex % BACKGROUND_COLORS.length];

  return (
    <S.Container bgColor={currentBgColor}>
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
