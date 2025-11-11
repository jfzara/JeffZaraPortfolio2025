import React, { useEffect } from "react";
import * as S from "./SectionsContainer.styles";

export default function RipplesLayer({ ripples, setRipples }) {
  useEffect(() => {
    const createRipple = (x, y) => {
      const id = Date.now() + Math.random().toString(36).slice(2, 5);
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600);
    };

    const handleClick = (e) => createRipple(e.clientX, e.clientY);
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

  return ripples.map((r) => <S.Ripple key={r.id} style={{ left: r.x, top: r.y }} />);
}
