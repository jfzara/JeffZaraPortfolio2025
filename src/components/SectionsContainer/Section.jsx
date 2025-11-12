import React from "react";
import * as S from "./SectionsContainer.styles";

export default function Section({ data, active, textColor, decoSide, index }) {
  const { title, subtitle, body, cta, deco } = data;

  return (
    <S.Section active={active} textColor={textColor}>
      {/* Animation "Title from space" uniquement pour le premier panneau actif */}
      <S.Title firstPanel={active && index === 0}>
        {title.split("").map((letter, idx) => (
          <span key={idx} style={{ "--idx": idx, animationDelay: `${idx * 0.05}s` }}>
            {letter}
          </span>
        ))}
      </S.Title>

      <S.Subtitle>{subtitle}</S.Subtitle>
      <S.Body dangerouslySetInnerHTML={{ __html: body }} />

      {cta && (
        <S.CTA href={cta.link}>
          <span>{cta.label}</span>
        </S.CTA>
      )}
    </S.Section>
  );
}
