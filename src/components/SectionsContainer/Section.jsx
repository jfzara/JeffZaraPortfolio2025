import React from "react";
import * as S from "./SectionsContainer.styles";

export default function Section({ data, active, textColor, decoSide, index }) {
  const { title, subtitle, body, cta } = data;

  return (
    <S.Section active={active} textColor={textColor}>
      <S.TitleGroup>
      {/* === TITRE === */}
      <S.Title firstPanel={active && index === 0}>
        {title.split("").map((letter, idx) => (
          <span key={idx} style={{ "--idx": idx }}>{letter}</span>
        ))}
      </S.Title>

      {/* === SOUS-TITRE === */}
      <S.Subtitle firstPanel={active && index === 0} textColor={textColor}>
        {subtitle.split("").map((letter, idx) => (
          <span key={idx} style={{ "--idx": idx }}>{letter}</span>
        ))}
      </S.Subtitle>
</S.TitleGroup>
      {/* === TEXTE === */}
      <S.Body dangerouslySetInnerHTML={{ __html: body }} />

      {/* === BOUTON CTA === */}
      {cta && (
        <S.CTA href={cta.link}>
          <span>{cta.label}</span>
        </S.CTA>
      )}
    </S.Section>
  );
}

