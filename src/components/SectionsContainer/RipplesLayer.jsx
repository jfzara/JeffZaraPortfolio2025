// src/components/SectionsContainer/RipplesLayer.jsx
import React, { useEffect } from "react";
import * as S from "./SectionsContainer.styles";

export default function RipplesLayer({ ripples, setRipples }) {
  useEffect(() => {
    const createRipple = (x, y) => {
      const id = Date.now() + Math.random().toString(36).slice(2, 5);
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    };

    const handleClick = (e) => {
      createRipple(e.clientX, e.clientY);
    };

    const handleTouchStart = (e) => {
      if (e.touches?.length) {
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
  }, [setRipples]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 9999, // toujours au-dessus
      }}
    >
      {ripples.map((r) => (
        <S.Ripple key={r.id} style={{ left: r.x + "px", top: r.y + "px" }} />
      ))}
    </div>
  );
}
