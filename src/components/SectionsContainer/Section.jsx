import React from "react";
import * as S from "./SectionsContainer.styles";
import ScrambledText from "./ScrambledText";

export default function Section({ data, active, textColor, index, isLoaded }) {
  const { title, subtitle, body, cta } = data;
  const isFirstSection = index === 0;

  return (
    <S.Section active={active} textColor={textColor}>
      <S.TitleGroup>

        {/* TITRE */}
        <S.Title firstPanel={isFirstSection}>
          {title.split("").map((letter, idx) => (
            <span key={idx} style={{ "--idx": idx }}>
              {letter}
            </span>
          ))}
        </S.Title>

        {/* SOUS-TITRE */}
        <S.Subtitle textColor={textColor}>
          <ScrambledText
            targetText={subtitle}
            isLoaded={isLoaded && isFirstSection}
          />
        </S.Subtitle>

      </S.TitleGroup>

      {/* TEXTE */}
      <S.Body dangerouslySetInnerHTML={{ __html: body }} />

      {/* CTA */}
      {cta && (
        <S.CTA href={cta.link}>
          <span>{cta.label}</span>
        </S.CTA>
      )}
    </S.Section>
  );
}
