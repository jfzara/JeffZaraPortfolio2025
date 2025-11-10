import React, { useEffect, useState } from "react";
import { BACKGROUND_COLORS, getContrastColor } from "../../constants/colors";
import * as S from "./SectionsContainer.styles";

export default function SectionsContainer({ sections }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [ripples, setRipples] = useState([]);

  const handleScrollTo = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const createRipple = (x, y) => {
      const id = Date.now() + Math.random().toString(36).slice(2, 5);
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    const handleClick = (e) => createRipple(e.clientX, e.clientY);
    const handleTouchStart = (e) => {
      if (e.touches && e.touches.length > 0) {
        const t = e.touches[0];
        createRipple(t.clientX, t.clientY);
      }
    };

    window.addEventListener("click", handleClick, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  const currentBgColor = BACKGROUND_COLORS[activeIndex % BACKGROUND_COLORS.length];

  return (
    <S.Container bgColor={currentBgColor}>
      {sections.map((s, i) => {
        const textColor = getContrastColor("#bfbfbf");
        return (
          <S.Section key={i} active={i === activeIndex} textColor={textColor}>
            <S.Deco
              {...s.deco}
              left={i % 2 !== 0 ? "6vw" : "auto"}
              right={i % 2 === 0 ? "6vw" : "6vw"}
              topColor={s.deco?.topColor}
              midColor={s.deco?.midColor}
              bottomColor={s.deco?.bottomColor}
            />
            <S.Title firstPanel={i === 0}>
              {s.title.split("").map((letter, idx) => (
                <span key={idx} style={{ animationDelay: `${idx * 0.05}s` }}>
                  {letter}
                </span>
              ))}
            </S.Title>
            <S.Subtitle>{s.subtitle}</S.Subtitle>
            <S.Body dangerouslySetInnerHTML={{ __html: s.body }} />
            {s.cta && (
              <S.CTA href={s.cta.link}>
                <span>{s.cta.label}</span>
              </S.CTA>
            )}
          </S.Section>
        );
      })}

      {ripples.map((r) => (
        <S.Ripple key={r.id} style={{ left: r.x, top: r.y }} />
      ))}

      <S.NavWrapper>
        {sections.map((_, i) => (
          <S.NavDotWrapper key={i}>
            <S.NavDot active={i === activeIndex} onClick={() => handleScrollTo(i)} />
            <S.Label visible={i === activeIndex}>{sections[i].title}</S.Label>
          </S.NavDotWrapper>
        ))}
      </S.NavWrapper>
    </S.Container>
  );
}