// src/components/Section.jsx
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

/* Area: full-screen panel */
const Area = styled.section`
  width: 100vw;
  height: 100vh;
  background: ${({ bg, theme }) => bg || theme.colors.main_bg};
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
`;

/* Left / Right columns - asymmetric layout */
const Side = styled.div`
  flex: ${({ w }) => w || "1"};
  padding: 6vh 6vw;
  display: flex;
  flex-direction: column;
  justify-content: ${({ v }) => v || "flex-start"};
  align-items: ${({ h }) => h || "flex-start"};
`;

/* Title big and uppercase */
const Title = styled.h1`
  font-size: clamp(2.6rem, 8vw, 8.5rem);
  line-height: 0.9;
  margin: 0;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.02em;
  display:flex;
  flex-wrap:wrap;
  gap: 0.25rem;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: ${({ theme }) => theme.mode === "dark" ? "0 2px 10px rgba(0,0,0,0.4)" : "0 2px 12px rgba(0,0,0,0.06)"};
`;

/* subtitle / paragraph */
const Body = styled.div`
  margin-top: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 48ch;
  font-size: 1.02rem;
  line-height: 1.6;
`;

/* big CTA */
const CTA = styled.a`
  margin-top: 2.2rem;
  display: inline-block;
  padding: 1rem 1.8rem;
  background: ${({ theme }) => theme.colors.cta};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 900;
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radius};
  border: ${({ theme }) => theme.thinBorder} solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 14px 36px rgba(0,0,0,0.12);
  transition: transform 280ms ease, filter 240ms ease;
  &:hover { transform: translateY(-6px); filter: brightness(1.02); }
`;

/* decorative vertical bar - receives parallax transform */
const DecoVertical = styled.div`
  position: absolute;
  right: ${({ right }) => (right ? right : "8vw")};
  left: ${({ left }) => left || "auto"};
  top: -10vh;
  bottom: -10vh;
  width: ${({ w }) => w || "6vw"};
  max-width: ${({ max }) => max || "220px"};
  background: ${({ color }) => color || "rgba(0,0,0,0.04)"};
  opacity: ${({ o }) => o ?? 0.08};
  transform-origin: center;
  pointer-events: none;
`;

/* function to split into spans */
function splitLetters(text = "") {
  return text.split("").map((c, i) => {
    // preserve spaces
    if (c === " ") return <span key={i} style={{ width: "0.45ch", display: "inline-block" }}>&nbsp;</span>;
    return <span key={i} style={{ display: "inline-block" }}>{c}</span>;
  });
}

/* scramble animation: mutate letters randomly then settle */
function useScramble(containerRef, { duration = 1200, delay = 200 } = {}) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const letters = Array.from(el.querySelectorAll("span"));
    if (!letters.length) return;

    const start = performance.now();
    const total = duration;
    const original = letters.map(l => l.textContent || "");
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÄÉÈÊËÎÏÔÖÛÙÜŸÇ0123456789";

    // Pre-style: set opacity 0 & random translate for initial 'chaos'
    letters.forEach((s) => {
      s.style.opacity = "0";
      s.style.transform = `translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px) rotate(${(Math.random()-0.5)*45}deg) scale(${0.9 + Math.random()*0.6})`;
      s.style.color = "rgba(0,0,0,0.0)";
      s.style.transition = "none";
    });

    let raf;
    function tick(now) {
      const t = Math.min(1, (now - start) / total);
      // for each letter compute if settled
      letters.forEach((s, idx) => {
        const settleAt = ((idx + 1) / letters.length) * (0.6 + Math.random() * 0.25);
        if (t >= settleAt) {
          // settle to original
          s.style.opacity = "1";
          s.style.transform = "translate(0,0) rotate(0deg) scale(1)";
          s.style.transition = `transform 420ms cubic-bezier(.22,.9,.2,1), opacity 360ms ease, color 360ms ease`;
          s.style.color = ""; // use theme color
          s.textContent = original[idx];
        } else {
          // random character flash
          s.style.opacity = `${0.7 * t}`;
          s.textContent = chars[Math.floor(Math.random() * chars.length)];
          // small jitter transform
          const jitterX = (1 - t) * (Math.random() - 0.5) * 60;
          const jitterY = (1 - t) * (Math.random() - 0.5) * 60;
          s.style.transform = `translate(${jitterX}px, ${jitterY}px) rotate(${(Math.random()-0.5)*30}deg) scale(${0.9 + Math.random()*0.4})`;
          s.style.transition = "none";
        }
      });

      if (t < 1) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    }

    const startDelay = setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(startDelay);
      cancelAnimationFrame(raf);
    };
  }, [containerRef, duration, delay]);
}

export default function Section({ title = "TITLE", subtitle = "", body = "", bg, ctaText = "", ctaHref = "#" , deco = {} }) {
  const titleRef = useRef(null);
  // run scramble on mount for title
  useScramble(titleRef, { duration: 1200, delay: 200 });

  // parallax effect for deco shapes: adjust transform on scroll
  useEffect(() => {
    const decoEl = document.getElementById(`deco-${title}`);
    if (!decoEl) return;
    function onScroll() {
      const sc = window.scrollY || window.pageYOffset;
      // compute slight translate based on element position
      const t = sc * 0.06;
      decoEl.style.transform = `translateY(${t}px)`;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [title]);

  return (
    <Area bg={bg}>
      {/* decorative vertical bar on the right (asymmetric) */}
      <DecoVertical
        id={`deco-${title}`}
        right={deco.right}
        left={deco.left}
        w={deco.w || "5vw"}
        max={deco.max}
        color={deco.color}
        o={deco.o}
        style={{ transform: "translateY(0)" }}
      />

      {/* left side: title and body (asymmetric) */}
      <Side w="0.62" v="flex-start" h="flex-start">
        <Title className="section-title" aria-hidden ref={titleRef}>
          {splitLetters(title)}
        </Title>

        {subtitle && <Body style={{ marginTop: "1.4rem", fontWeight: 700 }}>{subtitle}</Body>}

        {body && <Body dangerouslySetInnerHTML={{ __html: body }} />}

        {ctaText && (
          <CTA href={ctaHref} aria-label={ctaText}>
            {ctaText}
          </CTA>
        )}
      </Side>

      {/* right side: empty area or small box for contrast, gives asymmetry */}
      <Side w="0.38" v="flex-end" h="flex-end" style={{ paddingBottom: "8vh", paddingRight: "6vw" }}>
        {/* example decorative box — replace with real content later */}
        <div style={{
          width: "80%",
          alignSelf: "flex-end",
          background: "transparent",
          border: `${1/4}px solid rgba(255,255,255,0.02)`,
          padding: "2rem",
          color: "inherit"
        }}>
          {/* small textual highlight */}
          <div style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.85)" }}>
            {/** left intentionally for designer to fill */}
          </div>
        </div>
      </Side>
    </Area>
  );
}